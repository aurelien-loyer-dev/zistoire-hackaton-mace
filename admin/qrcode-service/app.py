import os
from flask import Flask, request, jsonify
import qrcode

app = Flask(__name__)

QR_OUTPUT_DIR = os.environ.get("QR_OUTPUT_DIR", "/data/qrcodes")
os.makedirs(QR_OUTPUT_DIR, exist_ok=True)


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/generate", methods=["POST"])
def generate():
    data = request.json
    if not data or "content" not in data:
        return jsonify({"error": "Missing 'content' field"}), 400

    content = data["content"]
    filename = data.get("filename", "qrcode") + ".png"
    filepath = os.path.join(QR_OUTPUT_DIR, filename)

    img = qrcode.make(content)
    img.save(filepath)

    return jsonify({"message": "QR code created", "path": filepath}), 201


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
