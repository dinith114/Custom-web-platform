# Custom Website Builder Platform

A custom SaaS-based website/web application builder platform. Users can register, create websites, build pages via drag-and-drop, manage navigation and media, save drafts, publish, and view published sites.

## Project Structure

```
Custom-web-platform/
├── backend/          → Node.js + Express.js REST API
│   ├── src/
│   │   ├── config/       → Database connection, environment config
│   │   ├── middleware/   → Auth, error handling, validation
│   │   ├── modules/
│   │   │   ├── auth/         → (Dev 1) Registration, login, JWT
│   │   │   ├── users/        → (Dev 1) User model
│   │   │   ├── sites/        → (Dev 1) Website/project CRUD
│   │   │   ├── navigation/   → (Dev 1) Menu management
│   │   │   ├── pages/        → (Dev 2) Page CRUD, content JSON
│   │   │   ├── media/        → (Dev 2) File upload, metadata
│   │   │   ├── public/       → (Dev 2) Public data delivery
│   │   │   └── templates/    → (Dev 2) Starter templates
│   │   ├── utils/        → Response helpers, common utilities
│   │   ├── app.js        → Express app setup
│   │   └── server.js     → Entry point
│   ├── .env.example      → Environment variable template
│   └── package.json
│
├── frontend/         → React / Next.js (Frontend Developer)
│   └── README.md
│
├── unified_implementation_plan.md
└── README.md         → This file
```

## Tech Stack

| Layer | Technology |
|---|---|
| Backend API | Node.js + Express.js |
| Database | MongoDB Atlas + Mongoose |
| Authentication | Custom JWT (bcrypt + jsonwebtoken) |
| File Storage | Cloudinary / AWS S3 |
| Frontend | React / Next.js |

## Getting Started

### Backend
```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, etc.
npm install
npm run dev
```

### Frontend
```bash
cd frontend
# Frontend developer will set up the project here
```

## Team

| Role | Modules |
|---|---|
| Backend Dev 1 | auth, users, sites, navigation |
| Backend Dev 2 | pages, media, public, templates |
| Frontend Dev | Builder UI, dashboard, public renderer |

## API Health Check

Once the backend is running:
```
GET http://localhost:5000/api/health
```
