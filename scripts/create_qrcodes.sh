#!/bin/bash
set -e

# Load HOST_IP from .env (resolve relative to this script's repo root)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ENV_FILE="$SCRIPT_DIR/../.env"

if [[ -f "$ENV_FILE" ]]; then
  HOST_IP=$(grep '^HOST_IP=' "$ENV_FILE" | cut -d= -f2)
fi
HOST_IP="${HOST_IP:-localhost}"

QRCODE_SERVICE="http://localhost:5001"
CLIENT_URL="http://${HOST_IP}:5173"

SLUGS=(
  "albius"
  "mafate"
  "Desbassayns"
  "volcan"
  "grand-raid"
  "cite-du-volcan"
  "musee-de-villele"
)

echo "Generating QR codes pointing to $CLIENT_URL ..."
echo ""

for slug in "${SLUGS[@]}"; do
  response=$(curl -s -w "\n%{http_code}" -X POST "$QRCODE_SERVICE/generate" \
    -H "Content-Type: application/json" \
    -d "{\"content\": \"${CLIENT_URL}/histoires/${slug}\", \"filename\": \"${slug}\"}")

  http_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | head -n-1)

  if [[ "$http_code" == "201" ]]; then
    echo "  ✓ $slug"
  else
    echo "  ✗ $slug (HTTP $http_code: $body)"
  fi
done

echo ""
echo "Done."

