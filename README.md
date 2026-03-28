# 🤝 Help Hub

Volunteer Opportunity and Resource Exchange Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

_Connecting volunteers with opportunities and facilitating resource exchange in communities_

[Report Bug](../../issues) · [Request Feature](../../issues)

---

## 📋 Table of Contents

- [About](#-about)
- [Live Links](#-live-links)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Quick Start (Local)](#-quick-start-local)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Migration Notes (Supabase → MongoDB)](#-migration-notes-supabase--mongodb)
- [Deployment (Vercel)](#-deployment-vercel)
- [Troubleshooting](#-troubleshooting)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 About

Help Hub bridges volunteers and organizations, enabling opportunity discovery and community resource exchange. The platform now runs on a custom Express + MongoDB backend with JWT auth.

### Highlights

- 🎯 Smart matching of volunteers to opportunities
- 🔄 Community resource exchange (offer/request)
- 🔐 JWT authentication with hashed passwords
- 📱 Responsive, modern UI
- 🚀 Vercel-ready frontend + API backend

---

## 🔗 Live Links

- Frontend: https://minor-project-2-rho.vercel.app/
- Backend: https://minor-project-2-volunteer-opportunity.onrender.com/api

---

## ✨ Features

- 🔍 Browse and search opportunities
- 👤 Rich user profiles (skills, interests, location)
- 📝 Create and manage opportunities
- 💬 Offer/request resources
- 📊 Dashboard for signups and resources
- 🔐 Protected routes with JWT

---

## 🧭 Architecture

- Frontend: React + TypeScript + Vite, calling REST APIs via Axios
- Backend: Express (Node.js) with JWT auth, Mongoose ODM
- Database: MongoDB / MongoDB Atlas
- Hosting: Vercel (static frontend + serverless API routes)

---

## 🛠 Tech Stack

| Technology            | Purpose                             |
| --------------------- | ----------------------------------- |
| React 18 + TypeScript | Frontend UI                         |
| Vite                  | Fast dev/build tooling              |
| Tailwind CSS          | Styling                             |
| React Router          | Client-side routing                 |
| React Hot Toast       | Notifications                       |
| Axios                 | API client                          |
| Node.js + Express     | Backend API                         |
| MongoDB + Mongoose    | Database and ODM                    |
| JWT + bcrypt          | Authentication & password hashing   |
| Vercel                | Hosting (frontend & serverless API) |

---

## 📁 Project Structure

```
Minor-Project-2-Volunteer-Opportunity-and-Resource-Exchange-/
├── src/
│   ├── components/       # Reusable React components
│   ├── context/          # Auth context (JWT)
│   ├── lib/              # API client (axios)
│   ├── pages/            # Page components
│   ├── types/            # TypeScript types
│   └── main.tsx          # App entry
├── server/
│   ├── config/           # Database connection
│   ├── middleware/       # Auth middleware (JWT)
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   └── index.js          # Express entry
├── vercel.json           # Vercel config (frontend + API)
└── package.json          # Root dependencies/scripts
```

---

## ⚡ Quick Start (Local)

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB (local) or MongoDB Atlas account

### 1) Clone

```bash
git clone https://github.com/anuragchoudhary2313/Minor-Project-2-Volunteer-Opportunity-and-Resource-Exchange-.git
cd Minor-Project-2-Volunteer-Opportunity-and-Resource-Exchange-
```

### 2) Backend setup

```bash
cd server
npm install
copy .env.example .env   # or create manually
# Edit .env
# MONGODB_URI=your_connection_string
# JWT_SECRET=your_secret_key
# PORT=5000
npm run dev
# Backend runs on http://localhost:5000
```

### 3) Frontend setup (new terminal)

```bash
cd ..

copy .env.example .env   # contains VITE_API_URL
npm run dev
# Frontend runs on http://localhost:5173
```

### 4) Smoke test

- Sign up / log in
- Create an opportunity
- Sign up for an opportunity
- Create a resource listing
- Update profile

---

## 🔑 Environment Variables

| Scope    | Variable       | Example / Notes                                  |
| -------- | -------------- | ------------------------------------------------ |
| Frontend | `VITE_API_URL` | `http://localhost:5000/api` or your deployed URL |
| Backend  | `MONGODB_URI`  | Atlas/local connection string                    |
| Backend  | `JWT_SECRET`   | Long random string                               |
| Backend  | `PORT`         | `5000` (or custom)                               |

---

## 📡 API Endpoints (summary)

- **Auth**: `POST /api/auth/signup`, `POST /api/auth/signin`
- **Users**: `GET /api/users`, `PUT /api/users` (protected)
- **Opportunities**: `GET /api/opportunities`, `POST /api/opportunities` (protected)
- **Signups**: `GET /api/opportunities/signups`, `POST /api/opportunities/signup`, `DELETE /api/opportunities/signup/:id`
- **Resources**: `GET /api/resources`, `GET /api/resources/my-resources`, `POST /api/resources`, `DELETE /api/resources/:id`
- **Community Tips**: `GET /api/community-tips`, `POST /api/community-tips`, `PUT /api/community-tips/:id/like`

---

## 🔄 Migration Notes (Supabase → MongoDB)

- Removed: Supabase migrations, `@supabase/supabase-js`, `src/lib/supabase.ts`, `src/types/supabase.ts`.
- Added: Express backend (`/server`), MongoDB models, JWT auth, axios client.
- Pages updated to call REST API instead of Supabase client.
- Dependency highlights: `axios`, `mongoose`, `express`, `jsonwebtoken`, `bcryptjs`, `cors`, `dotenv`, `nodemon`.

### Differences

| Area      | Supabase  | MongoDB + Express               |
| --------- | --------- | ------------------------------- |
| Auth      | Built-in  | Custom JWT                      |
| DB        | Postgres  | MongoDB                         |
| API       | SDK calls | REST (Axios)                    |
| Real-time | Built-in  | Not implemented (add Socket.io) |
| Storage   | Built-in  | Add S3/Cloudinary separately    |

---

## ☁️ Deployment (Vercel)

### Dashboard deploy

1. Import repo on [vercel.com](https://vercel.com) → Add New Project.
2. Settings:
   - Framework: Vite
   - Root: `./`
   - Build: `npm run build`
   - Output: `dist`
3. Env vars (Project Settings → Environment Variables):
   - `MONGODB_URI` = your Atlas URI
   - `JWT_SECRET` = strong secret
   - `VITE_API_URL` = `https://<your-app>.vercel.app/api` (update after first deploy)
4. Deploy.
5. After first deploy, set `VITE_API_URL` to the deployed URL and redeploy.

### CLI deploy

```powershell
npm install -g vercel
vercel login
vercel          # first deploy
vercel --prod   # production
```

### Production checklist

- MongoDB Atlas network access allows your deploy (0.0.0.0/0 or specific CIDR).
- Strong `JWT_SECRET` configured.
- `VITE_API_URL` points to production.
- CORS (optional tighten): in `server/index.js`, set allowed origins to your domain.

---

## 🧰 Troubleshooting

- **Cannot connect to MongoDB**: verify `MONGODB_URI`, check Atlas IP whitelist, ensure cluster running.
- **Port in use**: change `PORT` (backend) and adjust `VITE_API_URL`.
- **Frontend cannot reach API**: ensure backend running, check `VITE_API_URL`, restart Vite after env changes.
- **Module not found**: reinstall deps in root and `/server`; delete `node_modules` + lockfiles if needed.
- **CORS errors**: adjust `cors` config to include your frontend origin.

---

## 🚧 Future Enhancements

- Email service (Nodemailer/SendGrid)
- Real-time updates (Socket.io)
- File uploads (Multer + S3/Cloudinary)
- Rate limiting and validation middleware
- Logging (Winston/Morgan) and monitoring
- Docker + docker-compose for local/CI

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for details.

---

## 📧 Contact

**Anurag Choudhary** - [@anuragchoudhary2313](https://github.com/anuragchoudhary2313)

**Project Link**: [https://github.com/anuragchoudhary2313/Minor-Project-2-Volunteer-Opportunity-and-Resource-Exchange-](https://github.com/anuragchoudhary2313/Minor-Project-2-Volunteer-Opportunity-and-Resource-Exchange-)

<div align="center">

### ⭐ Star this repository if you find it helpful!

Made with ❤️ by [Anurag Choudhary](https://github.com/anuragchoudhary2313)

</div>
