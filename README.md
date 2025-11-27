# 🚀 Inspection Information Management System — PRO README

<p align="center">
  <img src="https://img.shields.io/badge/Stack-Angular%20%7C%20Express%20%7C%20PostgreSQL-orange"/>
  <img src="https://img.shields.io/badge/Backend-Express%20API-blue"/>
  <img src="https://img.shields.io/badge/ORM-Sequelize-yellow"/>
  <img src="https://img.shields.io/badge/Storage-BLOB%20(POSTGRES)-green"/>
  <img src="https://img.shields.io/badge/CI/CD-Render%20Deploy-purple"/>
</p>

---  
## 🏁 Overview

Enterprise-grade system for:  
✔ Client tracking — Locations, Contacts  
✔ Inspection order lifecycle  
✔ Inquiry → Order → Follow-up chain  
✔ Attachments stored as **byte-array BLOB**  
✔ API documented & testable via Swagger  

Built for teams who require **audit-ready inspection workflows with file traceability**.

---  
## 🧩 System Architecture

```text
            ╔════════════════════╗
            ║  Angular Frontend  ║
            ╚═══════▲═════╦══════╝
                    │     │
                    │ REST API Calls
                    │
     ╔══════════════╩══════════════╗
     ║        EXPRESS BACKEND      ║
     ╚═══════▲═════════╦═══════════╝
             │         │ Sequelize ORM
             │
     ╔═══════╩══════════════════════╗
     ║       POSTGRES DATABASE      ║
     ╚══════════════════════════════╝
```

---  
## 📁 Project Structure

```text
inspection-info-app/
├─ inspection-client-app/      → Angular UI
│   └─ src/...
│
├─ inspection-api/             → Express REST API
│   ├─ src/
│   │   ├─ config/             → DB + Swagger
│   │   ├── controllers/       → Route handlers
│   │   ├─ middleware/         → CORS, errors, validation
│   │   ├─ models/             → Sequelize Models
│   │   ├─ routes/             → CRUD Routing
│   │   ├─ services/           → Business Logic
│   │   ├─ utils/              → Logger + Helper
│   │   └─ app.js
│   ├─ swagger.js
│   ├─ server.js
│   └─ package.json
│
└─ db-resources/
    └─ inspection_schema.sql
```

---  
## 🗄 Database Schema

| Table | Use |
|------|-----|
| rep | Inspectors |
| location | Client sites |
| inquiry | Pre-inspection contact |
| inspection_order | Confirmed booking |
| inspection_followup | Reminder & completion status |
| attachment | **BLOB documents bound to ANY entity** |

---  
## 🛠 Backend Execution (LOCAL)

```bash
cd inspection-api
npm install
```

Create `.env`:

```env
DB_HOST=<render_host>
DB_PORT=5432
DB_NAME=inspection_69ck
DB_USER=dbadmin
DB_PASSWORD=<password>
DB_SSL=true
PORT=3000
ALLOWED_ORIGINS=http://localhost:4200
```

Run:

```bash
npm run dev
```

---  
## 📘 Swagger API Documentation

| Environment | URL |
|------------|-----|
| Local | http://localhost:3000/api-docs |
| Render Hosted | https://inspection-info-api-app.onrender.com/api-docs |

### Example Routes

```bash
GET  /api/reps
POST /api/locations
PUT  /api/inquiries/:id
GET  /api/inspection-orders
POST /api/attachments (BLOB)
```

---  
## 🌍 Deployment (Render)

```bash
Service Name: inspection-info-api-app
Service ID: srv-d4jp3ne3jp1c738c16e0
Root Directory: inspection-api
Build Command: npm install
Start Command: npm start
```

---  
## 🔥 GitHub Actions CI/CD Deploy

```yaml
name: Deploy Backend to Render
on:
  push:
    branches: [ main ]
    paths: [ "inspection-api/**" ]

jobs:
  deploy-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Trigger Deployment
        env:
          RENDER_API_KEY: ${{ secrets.RENDER_API_KEY }}
          RENDER_API_SERVICE_ID: srv-d4jp3ne3jp1c738c16e0
        run: |
          curl -X POST "https://api.render.com/v1/services/${RENDER_API_SERVICE_ID}/deploys" \
          -H "Authorization: Bearer $RENDER_API_KEY" \
          -H "Content-Type: application/json" \
          -d '{"clearCache":false}'
```

---  
## 🔭 Roadmap Progression

| Enhancement | Status |
|------------|--------|
| JWT/Role-Auth | Planned |
| CI build gate before deploy | Next upgrade |
| Email alerts for followups | Soon |
| Analytics dashboard + Charts | Future |
| Offline mobile support | Future |
