# 🎬 Movie & Series Rating Portal

A modern full-stack Movie & Series Rating Platform where users can explore, stream, rate, review, and interact with movies and TV series. The platform includes authentication, admin management, reviews, comments, likes, watchlists, subscriptions, and premium streaming features.

Built with scalability, performance, security, and user experience in mind using modern web technologies.

[Live link](https://cinema-tube-cl.vercel.app/)
---

## 🚀 Features

### 👤 Authentication & Authorization
- Secure authentication using BetterAuth
- Email/password login & registration
- JWT/session-based authentication
- Protected routes & role-based access
- Admin & User roles

---

### 🎥 Media Management
- Browse Movies & TV Series
- Search & filter by genre, rating, type, and year
- Detailed media pages
- Stream movies/series
- Trailer support
- Watchlist system

---

### ⭐ Rating & Reviews
- Rate media from **1–10**
- Write detailed reviews
- Like reviews/comments
- Comment system
- Review moderation by admin

---

### 💳 Subscription & Monetization
- Free & premium content
- Subscription plans
- Buy or rent movies/series
- Purchase history

---

### 🛠️ Admin Dashboard
- Manage movies & series
- Manage users
- Moderate reviews/comments
- Analytics dashboard
- Category & genre management

---

# 🧱 Tech Stack

## Frontend
- ⚡ Next.js
- 🎨 Tailwind CSS
- 🧩 ShadCN UI
- 🟦 TypeScript

## Backend
- 🟢 Node.js
- 🚂 Express.js
- 🟦 TypeScript

## Database & ORM
- 🐘 PostgreSQL
- 🔺 Prisma ORM

## Authentication
- 🔐 BetterAuth

---

# 📂 Project Structure

```bash
movie-rating-portal/
│
├── client/                 # Frontend (Next.js)
│   ├── src/
│   ├── components/
│   ├── app/
│   └── services/
│
├── server/                 # Backend (Node.js + Express)
│   ├── src/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── middlewares/
│   └── prisma/
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/movie-rating-portal.git

cd movie-rating-portal
```

---

## 2️⃣ Setup Frontend

```bash
cd client

npm install
```

### Run Frontend

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:3000
```

---

## 3️⃣ Setup Backend

```bash
cd server

npm install
```

### Setup Environment Variables

Create a `.env` file inside the server folder:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/movie_portal"

PORT=5000

BETTER_AUTH_SECRET=your_secret_key

BETTER_AUTH_URL=http://localhost:5000

 ADMIN_EMAIL=superadmin@gmail.com

 ADMIN_PASSWORD=123456789
```

---

## 4️⃣ Prisma Setup

### Generate Prisma Client

```bash
npx prisma generate
```

### Run Migration

```bash
npx prisma migrate dev
```

---

## 5️⃣ Start Backend Server

```bash
npm run dev
```

Backend will run on:

```bash
http://localhost:5000
```

---

# 🔑 Environment Variables

## Frontend `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Backend `.env`

```env
DATABASE_URL=
PORT=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
```

---

# 🧩 Core Modules

- Authentication
- Media Management
- Ratings & Reviews
- Comments & Likes
- Streaming System
- Subscription System
- Watchlist
- Admin Dashboard
- Analytics

---



# 🔒 Security Features

- Protected API routes
- Secure authentication
- Role-based authorization
- Input validation
- Error handling
- Secure password hashing
- Rate limiting
- Environment variable protection

---

# 📈 Future Improvements

- Real-time chat
- Recommendation system
- AI-based movie suggestions
- Multi-language support
- Mobile app
- Social login
- Notifications system

---

# 🧪 Scripts

## Frontend

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Backend

```bash
npm run dev
npm run build
npm run start
```









