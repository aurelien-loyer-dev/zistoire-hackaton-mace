import os
import psycopg2
from urllib.parse import urlparse
from psycopg2.extras import RealDictCursor
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

DATABASE_URL = os.environ.get("DATABASE_URL")
CLIENT_URL = os.environ.get("CLIENT_URL", "http://localhost:5173")
ADMIN_BACKEND_URL = os.environ.get("ADMIN_BACKEND_URL", "http://localhost:3001")

STORIES_QUERY = """
    SELECT
        a.slug, a.title, a.subtitle, a.image_path, a.category,
        a.link, a.description, a.history, a.intro,
        a.partner, a.partner_name, a.is_current_event,
        COALESCE(
            json_agg(
                json_build_object('content', lm.content)
                ORDER BY lm.position
            ) FILTER (WHERE lm.id IS NOT NULL),
            '[]'::json
        ) AS learn_more
    FROM activities a
    LEFT JOIN learn_more lm ON lm.activity_id = a.id
    {where}
    GROUP BY a.id
    ORDER BY a.created_at DESC
"""


def get_db():
    return psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)


def normalize_image_url(image_url):
    if not image_url:
        return ""

    if image_url.startswith("/uploads/"):
        return f"{ADMIN_BACKEND_URL}{image_url}"

    parsed = urlparse(image_url)
    if parsed.path.startswith("/uploads/"):
        return f"{ADMIN_BACKEND_URL}{parsed.path}"

    return image_url


def row_to_story(row):
    learn_more = row.get("learn_more") or []
    return {
        "slug": row["slug"],
        "title": row["title"],
        "subtitle": row["subtitle"] or "",
        "image": normalize_image_url(row["image_path"]),
        "category": row["category"] or "",
        "isCurrentEvent": bool(row["is_current_event"]),
        "isSponsored": bool(row["partner"]),
        "partnerName": row["partner_name"] or None,
        "partnerUrl": row["link"] or None,
        "internalLink": f"{CLIENT_URL}/histoires/{row['slug']}",
        "shortDescription": row["description"] or "",
        "storySlides": [item["content"] for item in learn_more],
        "fullText": row["history"] or "",
        "intro": row["intro"] or "",
    }


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/api/stories", methods=["GET"])
def list_stories():
    conn = get_db()
    cur = conn.cursor()
    cur.execute(STORIES_QUERY.format(where=""))
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify([row_to_story(row) for row in rows])


@app.route("/api/stories/<slug>", methods=["GET"])
def get_story(slug):
    conn = get_db()
    cur = conn.cursor()
    cur.execute(STORIES_QUERY.format(where="WHERE a.slug = %s"), (slug,))
    row = cur.fetchone()
    cur.close()
    conn.close()
    if not row:
        return jsonify({"error": "Not found"}), 404
    return jsonify(row_to_story(row))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=3002)
