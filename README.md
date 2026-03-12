# Zistoir — Application de découverte historique de La Réunion

**Zistoir** is a hackathon project that lets hotel guests discover the history and culture of Réunion Island through an interactive web app. Staff manage content via a back-office admin panel; guests scan QR codes or browse the client app to read illustrated stories.

---

## Table of contents

1. [Quick start](#quick-start)
2. [Project structure](#project-structure)
3. [Architecture](#architecture)
4. [Microservices](#microservices)
5. [Scripts](#scripts)
6. [Environment variables](#environment-variables)

---

## Quick start

### Prerequisites

- Docker & Docker Compose
- A `.env` file at the repo root (see [Environment variables](#environment-variables))

### Start all services

```bash
# First-time or after schema changes (wipes the DB volume)
sudo docker-compose down -v && sudo docker-compose up --build -d

# Normal start (keeps existing data)
sudo docker-compose up -d
```

### Access the apps

| App | URL |
|---|---|
| **Client app** (guest-facing) | `http://<HOST_IP>:5173` |
| **Admin panel** | `http://<HOST_IP>:3000` |
| **Admin backend API** | `http://<HOST_IP>:3001` |
| **Client read API** | `http://<HOST_IP>:3002` |
| **QR code microservice** | `http://localhost:5001` |

Replace `<HOST_IP>` with the value set in your `.env` (default: `localhost`).

### Stop all services

```bash
sudo docker-compose down        # keep data
sudo docker-compose down -v     # also wipe DB
```

---

## Project structure

```
.
├── .env                        # Environment variables (see below)
├── docker-compose.yml          # Orchestrates all services
├── scripts/
│   └── create_qrcodes.sh       # Generates QR codes for all seeded stories
├── admin/
│   ├── backend/                # Flask API — content management (CRUD, file upload)
│   ├── frontend/               # React admin panel (CRA)
│   ├── qrcode-service/         # Flask microservice — QR code generation
│   ├── db/
│   │   ├── init.sql            # DB schema
│   │   └── seed.sql            # Seed data (7 stories)
│   ├── uploads/                # Uploaded activity images (bind-mounted)
│   └── qrcodes/                # Generated QR code PNGs (bind-mounted)
└── client/
    ├── backend/                # Flask API — read-only, serves data to the client app
    └── frontend/               # Vite + React + TypeScript — guest-facing app
```

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Docker network                          │
│                                                                 │
│  ┌──────────────┐     ┌──────────────┐     ┌────────────────┐  │
│  │ admin-       │────▶│   backend    │────▶│      db        │  │
│  │ frontend     │     │  (port 3001) │     │ (PostgreSQL 16)│  │
│  │ (port 3000)  │     └──────┬───────┘     └────────┬───────┘  │
│  └──────────────┘            │                      │          │
│                              │ POST /generate        │          │
│                              ▼                       │          │
│                    ┌──────────────────┐              │          │
│                    │ qrcode-service   │              │          │
│                    │   (port 5001)    │              │          │
│                    └──────────────────┘              │          │
│                                                      │          │
│  ┌──────────────┐     ┌──────────────┐              │          │
│  │   client     │────▶│  client-api  │◀─────────────┘          │
│  │ (port 5173)  │     │  (port 3002) │                         │
│  └──────────────┘     └──────────────┘                         │
└─────────────────────────────────────────────────────────────────┘

Shared bind-mounts (host ↔ containers):
  admin/uploads/  ──▶  /data/uploads   (backend serves images)
  admin/qrcodes/  ──▶  /data/qrcodes   (backend serves QR PNGs)
```

---

## Microservices

### `db` — PostgreSQL 16
Stores all activity data. Initialised on first boot from:
- `admin/db/init.sql` — schema (`activities`, `learn_more` tables, `activity_type` enum)
- `admin/db/seed.sql` — 7 pre-loaded stories

### `backend` — Admin Flask API (port 3001)
Full CRUD for activities. Responsibilities:
- Upload and serve activity images from `/data/uploads`
- Serve QR code PNGs from `/data/qrcodes`
- Trigger `qrcode-service` automatically whenever a new activity is created

### `qrcode-service` — QR Code microservice (port 5001)
Single-purpose Flask service. Accepts `POST /generate` with a URL and filename, generates a QR code PNG using the Python `qrcode` library, and saves it to `/data/qrcodes`.

```
POST http://localhost:5001/generate
{
  "content": "http://<HOST_IP>:5173/histoires/<slug>",
  "filename": "<slug>"
}
```

### `admin-frontend` — Admin panel (port 3000)
React (CRA) back-office. Allows staff to create, edit, and delete activities with image upload, category, type, description, learn-more slides, and partner link.

### `client-api` — Read-only Flask API (port 3002)
Exposes the activity data to the guest app. Endpoints:
- `GET /api/stories` — list all activities
- `GET /api/stories/<slug>` — single activity detail

### `client` — Guest app (port 5173)
Vite + React + TypeScript SPA. Guests can:
- Browse all stories on the home page
- Read the full story detail page at `/histoires/<slug>`
- Access the app by scanning a QR code

---

## Scripts

### `scripts/create_qrcodes.sh`

Generates QR code PNG files for all seeded activities by calling the `qrcode-service` API.

**When to use it:**
- After a fresh `docker-compose down -v && up` (DB is re-seeded, old QR files are gone)
- After changing `HOST_IP` in `.env` (existing QR files embed the old IP)

**How it works:**
1. Reads `HOST_IP` from `.env` at the repo root
2. Iterates over every story slug
3. POSTs to `http://localhost:5001/generate` with content `http://<HOST_IP>:5173/histoires/<slug>`
4. Saves the PNG to `admin/qrcodes/<slug>.png`

**Usage:**

```bash
# Make sure the stack is running first
sudo docker-compose up -d

# Then run the script
bash scripts/create_qrcodes.sh
```

Expected output:
```
Generating QR codes pointing to http://192.168.1.12:5173 ...

  ✓ albius
  ✓ mafate
  ✓ Desbassayns
  ✓ volcan
  ✓ grand-raid
  ✓ cite-du-volcan
  ✓ musee-de-villele

Done.
```

The generated PNGs are immediately served by the backend at `http://<HOST_IP>:3001/qrcodes/<slug>.png`.

---

## Environment variables

Create a `.env` file at the repo root. All variables are read by `docker-compose.yml` and injected into the relevant containers.

```env
# ── Database ──────────────────────────────────────────────
POSTGRES_USER=mace
POSTGRES_PASSWORD=mace_secret
POSTGRES_DB=mace

# ── Network ───────────────────────────────────────────────
# LAN IP of the machine running Docker.
# Used so that phones/tablets on the same network can reach the app.
# Run: ip route get 1.1.1.1 | awk '{print $7; exit}'
HOST_IP=192.168.1.12
```

### Variable reference

| Variable | Used by | Description |
|---|---|---|
| `POSTGRES_USER` | `db`, `backend`, `client-api` | PostgreSQL username |
| `POSTGRES_PASSWORD` | `db`, `backend`, `client-api` | PostgreSQL password |
| `POSTGRES_DB` | `db`, `backend`, `client-api` | PostgreSQL database name |
| `HOST_IP` | `backend`, `admin-frontend`, `client-api`, `client` | LAN IP of the Docker host. Defaults to `localhost` if not set. Must be updated when the host IP changes. |

### Derived URLs (set automatically from `HOST_IP`)

| Variable | Value | Description |
|---|---|---|
| `PUBLIC_SITE_URL` | `http://<HOST_IP>:5173` | Base URL embedded in QR codes |
| `ADMIN_BACKEND_URL` | `http://<HOST_IP>:3001` | Image path prefix stored in the DB |
| `REACT_APP_BACKEND_URL` | `http://<HOST_IP>:3001` | Admin frontend → backend |
| `VITE_API_URL` | `http://<HOST_IP>:3002` | Client app → client API |
| `CLIENT_URL` | `http://<HOST_IP>:5173` | Used in `internalLink` responses from client-api |

### Updating `HOST_IP`

If your machine's IP changes:
1. Update `HOST_IP` in `.env`
2. Rebuild and reseed: `sudo docker-compose down -v && sudo docker-compose up --build -d`
3. Regenerate QR codes: `bash scripts/create_qrcodes.sh`
