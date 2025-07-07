Here's a complete **`README.md`** file you can use for your scalable job import system project:

---

# 🚀 Job Import System

A scalable system to fetch jobs from multiple external XML-based APIs, queue them using Redis + BullMQ, import them into MongoDB, and track each import's history. Includes a clean admin UI built with Next.js to visualize import logs and job entries.

---

## 📦 Project Structure

```
job-import-system/
├── client/                  # Next.js frontend (Admin Panel)
├── server/                  # Node.js backend (Express + BullMQ)
│   └── src/
│       ├── config/          # Mongo & Redis configs
│       ├── jobs/            # XML fetch & parsing logic
│       ├── queues/          # BullMQ queue & worker
│       ├── models/          # Mongoose schemas
│       ├── routes/          # Express REST APIs
│       └── index.js         # Express app entry
├── docker-compose.yml       # (Optional) Redis, Mongo, API
├── README.md                # This file
└── docs/architecture.md     # System design explanation
```

---

## ✅ Features

* 🔄 **Fetch Jobs** from multiple RSS/XML job feeds
* 📥 **Queue with BullMQ** (Redis-backed)
* 🛠️ **Background workers** process jobs
* 🧾 **Track Import Logs**: Total, New, Updated, Failed
* 🧑‍💻 **Admin Dashboard** (Next.js) to view history and job entries
* ⚙️ Built with scalability and modularity in mind

---

## 🛠️ Tech Stack

| Layer      | Tech                  |
| ---------- | --------------------- |
| Frontend   | Next.js, Tailwind CSS |
| Backend    | Express.js, Node.js   |
| Queue      | BullMQ                |
| Store      | Redis                 |
| Database   | MongoDB (Mongoose)    |
| Parser     | xml2js                |
| Deployment | Docker (optional)     |

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/job-import-system.git
cd job-import-system
```

---

### 2. Install Dependencies

#### Backend:

```bash
cd server
pnpm install
```

#### Frontend:

```bash
cd ../client
pnpm install
```

---

### 3. Create `.env` Files

#### Backend (`server/.env`)

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/job-import
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

#### Frontend (`client/.env.local`)

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

### 4. Start MongoDB and Redis

If not using Docker:

```bash
# MongoDB
mongod

# Redis (Windows via WSL or Redis Stack)
redis-server
```

---

### 5. Start Backend (API + Worker)

```bash
cd server
pnpm dev         # runs Express server
pnpm run worker  # runs BullMQ job processor
```

---

### 6. Start Frontend (Admin Panel)

```bash
cd ../client
pnpm dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🧪 API Endpoints

| Route             | Description                       |
| ----------------- | --------------------------------- |
| `GET /api/logs`   | List import logs                  |
| `GET /api/jobs`   | Get imported jobs                 |
| `POST /api/fetch` | Manually trigger job import (opt) |

---

## 🔍 Sample Job Feed URLs Used

* `https://jobicy.com/?feed=job_feed`
* `https://jobicy.com/?feed=job_feed&job_categories=design-multimedia`
* `https://www.higheredjobs.com/rss/articleFeed.cfm`

---

## 🖼️ UI Pages

| Path    | Description             |
| ------- | ----------------------- |
| `/`     | Import logs dashboard   |
| `/jobs` | View imported jobs list |

---

## 🧱 Architecture Highlights

* **Separation of concerns**: fetcher, queue, DB layer are decoupled
* **Scalable**: BullMQ + Redis with concurrency support
* **Fail-safe**: Logs failed jobs with reasons
* **Cloud-ready**: Works with MongoDB Atlas & Redis Cloud

More in [`docs/architecture.md`](./docs/architecture.md)

---

## 🐳 Optional: Run with Docker

```bash
docker-compose up --build
```

This will run:

* MongoDB
* Redis
* Express backend
* Frontend (Next.js)

---

## 📈 Future Enhancements

* 🧠 Add Bull Board / Arena UI
* 🔁 Auto retry with backoff
* 🔔 Real-time logs with WebSockets
* 📩 Email/slack alerts on import failures
* 🗂️ Filter jobs by company/category/location


