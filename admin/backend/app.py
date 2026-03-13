import os
import re
import unicodedata
import requests
import psycopg2
from urllib.parse import urlparse
from psycopg2.extras import RealDictCursor
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_DIR = os.environ.get("UPLOAD_DIR", "/data/uploads")
QRCODE_DIR = os.environ.get("QRCODE_DIR", "/data/qrcodes")
QRCODE_SERVICE_URL = os.environ.get("QRCODE_SERVICE_URL", "http://qrcode-service:5000")
DATABASE_URL = os.environ.get("DATABASE_URL")
HOST_IP = os.environ.get("HOST_IP", "localhost")
ADMIN_BACKEND_URL = os.environ.get("ADMIN_BACKEND_URL", f"http://{HOST_IP}:3001")
PUBLIC_SITE_URL = os.environ.get("PUBLIC_SITE_URL", f"http://{HOST_IP}:5173")

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(QRCODE_DIR, exist_ok=True)


def get_db():
    conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    conn.autocommit = True
    return conn


def slugify(text):
    text = text.lower().strip()
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    text = re.sub(r"[^\w\s-]", "", text)
    return re.sub(r"[-\s]+", "-", text).strip("-")


def normalize_image_url(image_url):
    if not image_url:
        return ""

    # Keep partner/external URLs unchanged; only rewrite uploaded image links.
    if image_url.startswith("/uploads/"):
        return f"{ADMIN_BACKEND_URL}{image_url}"

    parsed = urlparse(image_url)
    if parsed.path.startswith("/uploads/"):
        return f"{ADMIN_BACKEND_URL}{parsed.path}"

    return image_url


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/api/activities", methods=["GET"])
def list_activities():
    conn = get_db()
    cur = conn.cursor()
    cur.execute("""
        SELECT
            a.id, a.slug, a.title, a.subtitle, a.image_path, a.category,
            a.description, a.link, a.intro, a.history,
            a.partner, a.partner_name, a.is_current_event, a.type, a.created_at,
            COALESCE(
                json_agg(
                    json_build_object('id', lm.id, 'content', lm.content, 'position', lm.position)
                    ORDER BY lm.position
                ) FILTER (WHERE lm.id IS NOT NULL),
                '[]'::json
            ) AS learn_more
        FROM activities a
        LEFT JOIN learn_more lm ON lm.activity_id = a.id
        GROUP BY a.id
        ORDER BY a.created_at DESC
    """)
    rows = cur.fetchall()
    cur.close()
    conn.close()

    activities = []
    for row in rows:
        activity = dict(row)
        activity["image_path"] = normalize_image_url(activity.get("image_path"))
        activity["created_at"] = activity["created_at"].isoformat() if activity["created_at"] else None
        activities.append(activity)

    return jsonify(activities)


@app.route("/api/activities", methods=["POST"])
def create_activity():
    title = request.form.get("title")
    description = request.form.get("description", "")
    link = request.form.get("link", "")
    intro = request.form.get("intro", "")
    history = request.form.get("history", "")
    partner = request.form.get("partner", "false").lower() == "true"
    activity_type = request.form.get("type", "cultural")
    slug = request.form.get("slug", "").strip() or (slugify(title) if title else "")
    subtitle = request.form.get("subtitle", "")
    category = request.form.get("category", "")
    is_current_event = request.form.get("is_current_event", "false").lower() == "true"
    partner_name = request.form.get("partner_name", "")
    learn_more_texts = [
        request.form.get("learn_more_1", ""),
        request.form.get("learn_more_2", ""),
        request.form.get("learn_more_3", ""),
        request.form.get("learn_more_4", ""),
    ]
    image = request.files.get("image")

    if not title:
        return jsonify({"error": "Title is required"}), 400
    if not link:
        return jsonify({"error": "Link is required"}), 400
    if not image:
        return jsonify({"error": "Image is required"}), 400
    VALID_TYPES = (
        "cultural", "favorite", "history", "nature", "gastronomy",
        "craft", "sport", "event", "wellness", "family", "nocturnal", "tech",
    )
    if activity_type not in VALID_TYPES:
        return jsonify({"error": f"Invalid type. Must be one of: {', '.join(VALID_TYPES)}"}), 400
    if not any(t.strip() for t in learn_more_texts):
        return jsonify({"error": "At least one learn_more entry is required"}), 400

    # Save the cover image as {title}.png
    filename = secure_filename(title) + ".png"
    image.save(os.path.join(UPLOAD_DIR, filename))
    image_path = f"{ADMIN_BACKEND_URL}/uploads/{filename}"

    # Save to database (single transaction)
    conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    try:
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO activities "
            "(slug, title, subtitle, image_path, category, description, link, intro, history, "
            " partner, partner_name, is_current_event, type) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id, created_at",
            (slug, title, subtitle, image_path, category, description, link, intro, history,
             partner, partner_name, is_current_event, activity_type),
        )
        result = cur.fetchone()
        activity_id = result["id"]

        inserted_learn_more = []
        for pos, text in enumerate(learn_more_texts, start=1):
            if text.strip():
                cur.execute(
                    "INSERT INTO learn_more (activity_id, content, position) VALUES (%s, %s, %s) RETURNING id",
                    (activity_id, text.strip(), pos),
                )
                lm_id = cur.fetchone()["id"]
                inserted_learn_more.append({"id": lm_id, "content": text.strip(), "position": pos})

        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        cur.close()
        conn.close()

    # Generate QR code pointing to the activity page on the public site
    activity_page_url = f"{PUBLIC_SITE_URL}/histoires/{slug}"
    try:
        resp = requests.post(
            f"{QRCODE_SERVICE_URL}/generate",
            json={"content": activity_page_url, "filename": secure_filename(title)},
            timeout=5,
        )
        resp.raise_for_status()
    except requests.RequestException as e:
        return jsonify({"error": f"QR code generation failed: {e}"}), 502

    return jsonify({
        "id": activity_id,
        "slug": slug,
        "title": title,
        "subtitle": subtitle,
        "image_path": image_path,
        "category": category,
        "description": description,
        "link": link,
        "intro": intro,
        "history": history,
        "partner": partner,
        "partner_name": partner_name,
        "is_current_event": is_current_event,
        "type": activity_type,
        "learn_more": inserted_learn_more,
        "created_at": result["created_at"].isoformat() if result["created_at"] else None,
    }), 201


@app.route("/api/activities/<int:activity_id>", methods=["PUT"])
def update_activity(activity_id):
    conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    try:
        cur = conn.cursor()
        cur.execute("SELECT * FROM activities WHERE id = %s", (activity_id,))
        existing = cur.fetchone()
        if not existing:
            cur.close()
            conn.close()
            return jsonify({"error": "Activity not found"}), 404

        title = request.form.get("title", existing["title"])
        description = request.form.get("description", existing["description"] or "")
        link = request.form.get("link", existing["link"] or "")
        intro = request.form.get("intro", existing["intro"] or "")
        history = request.form.get("history", existing["history"] or "")
        partner = request.form.get("partner", str(existing["partner"]).lower()).lower() == "true"
        activity_type = request.form.get("type", existing["type"])
        slug = request.form.get("slug", existing["slug"] or "").strip() or (slugify(title) if title else "")
        subtitle = request.form.get("subtitle", existing["subtitle"] or "")
        category = request.form.get("category", existing["category"] or "")
        is_current_event = request.form.get("is_current_event", str(existing["is_current_event"]).lower()).lower() == "true"
        partner_name = request.form.get("partner_name", existing["partner_name"] or "")
        learn_more_texts = [
            request.form.get("learn_more_1", ""),
            request.form.get("learn_more_2", ""),
            request.form.get("learn_more_3", ""),
            request.form.get("learn_more_4", ""),
        ]

        if not title:
            return jsonify({"error": "Title is required"}), 400
        if not link:
            return jsonify({"error": "Link is required"}), 400
        VALID_TYPES = (
            "cultural", "favorite", "history", "nature", "gastronomy",
            "craft", "sport", "event", "wellness", "family", "nocturnal", "tech",
        )
        if activity_type not in VALID_TYPES:
            return jsonify({"error": f"Invalid type. Must be one of: {', '.join(VALID_TYPES)}"}), 400

        image = request.files.get("image")
        image_path = existing["image_path"]
        if image:
            filename = secure_filename(title) + ".png"
            image.save(os.path.join(UPLOAD_DIR, filename))
            image_path = f"{ADMIN_BACKEND_URL}/uploads/{filename}"

        cur.execute(
            """UPDATE activities SET
               slug=%s, title=%s, subtitle=%s, image_path=%s, category=%s,
               description=%s, link=%s, intro=%s, history=%s,
               partner=%s, partner_name=%s, is_current_event=%s, type=%s
               WHERE id=%s""",
            (slug, title, subtitle, image_path, category, description, link, intro, history,
             partner, partner_name, is_current_event, activity_type, activity_id),
        )

        cur.execute("DELETE FROM learn_more WHERE activity_id = %s", (activity_id,))
        inserted_learn_more = []
        for pos, text in enumerate(learn_more_texts, start=1):
            if text.strip():
                cur.execute(
                    "INSERT INTO learn_more (activity_id, content, position) VALUES (%s, %s, %s) RETURNING id",
                    (activity_id, text.strip(), pos),
                )
                lm_id = cur.fetchone()["id"]
                inserted_learn_more.append({"id": lm_id, "content": text.strip(), "position": pos})

        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        cur.close()
        conn.close()

    return jsonify({"success": True, "id": activity_id, "learn_more": inserted_learn_more}), 200


@app.route("/api/activities/<int:activity_id>", methods=["DELETE"])
def delete_activity(activity_id):
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT id FROM activities WHERE id = %s", (activity_id,))
    if not cur.fetchone():
        cur.close()
        conn.close()
        return jsonify({"error": "Activity not found"}), 404

    cur.execute("DELETE FROM learn_more WHERE activity_id = %s", (activity_id,))
    cur.execute("DELETE FROM activities WHERE id = %s", (activity_id,))
    cur.close()
    conn.close()
    return jsonify({"success": True}), 200


@app.route("/uploads/<path:filename>", methods=["GET"])
def serve_upload(filename):
    return send_from_directory(UPLOAD_DIR, filename)


@app.route("/qrcodes/<path:filename>", methods=["GET"])
def serve_qrcode(filename):
    return send_from_directory(QRCODE_DIR, filename)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3001)
