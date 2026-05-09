# 🎓 CollegeZen

CollegeZen is a production-grade college discovery and decision platform inspired by Careers360 and Collegedunia.

The platform helps students:
- Discover colleges
- Compare institutions
- Predict admission chances
- Save colleges and comparisons
- Explore placements, courses, and reviews

Built with a modern full-stack architecture using Next.js, TypeScript, Prisma, PostgreSQL, and Tailwind CSS.

---

# 🚀 Live Demo

## 🌐 Frontend
https://collegezen.vercel.app/colleges

## 🔗 Backend API
https://collegezen.vercel.app/api/colleges

---

# ✨ Features

## 🔍 College Listing + Search
- Search colleges by name
- Filter by location, fees, and course type
- Responsive card-based UI
- Dynamic API-powered listing
- Pagination support

## 🏫 College Detail Page
- Overview section
- Courses offered
- Placement statistics
- Student reviews
- Dynamic routing with Next.js App Router

## ⚖️ Compare Colleges
- Compare 2–3 colleges side-by-side
- Compare:
  - Fees
  - Ratings
  - Placement percentage
  - Location

## 🧠 Predictor Tool
- Input exam and rank
- Get predicted colleges
- Rule-based prediction engine

## 🔐 Authentication & Saved Items
- User login/register
- Save colleges
- Save comparisons
- User profile page

---

# 🛠️ Tech Stack

## Frontend
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS

## Backend
- Next.js API Routes
- REST APIs

## Database
- PostgreSQL (Supabase)

## ORM
- Prisma ORM

## Authentication
- NextAuth

## Deployment
- Vercel

---

# 🧱 System Architecture

```txt
Frontend (Next.js + Tailwind)
        ↓
API Routes (Next.js Backend)
        ↓
Prisma ORM
        ↓
PostgreSQL (Supabase)
````

---

# 📂 Project Structure

```txt
src/
├── app/
│   ├── api/                 # Backend API routes
│   ├── colleges/            # College pages
│   ├── compare/             # Compare module
│   ├── predictor/           # Predictor tool
│   ├── profile/             # User profile
│   ├── login/               # Authentication
│   └── register/
│
├── components/
│   ├── college/
│   ├── predictor/
│   ├── compare/
│   ├── layout/
│   └── ui/
│
├── hooks/
├── lib/
│   ├── prisma.ts
│   └── auth.ts
│
├── services/
├── types/
│
prisma/
├── schema.prisma
└── seed.ts
```

---

# ⚙️ Local Setup

## Prerequisites

* Node.js 18+
* PostgreSQL database

---

## Installation

```bash
npm install
```

---

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_database_url
DIRECT_URL=your_direct_database_url

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret

AUTH_SECRET=your_secret
AUTH_URL=http://localhost:3000
```

---

## Prisma Setup

```bash
npx prisma generate
npx prisma db push
npx prisma db seed
```

---

## Run Development Server

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

# 📡 API Endpoints

| Endpoint               | Description        |
| ---------------------- | ------------------ |
| `/api/colleges`        | Fetch all colleges |
| `/api/colleges/[slug]` | College details    |
| `/api/compare`         | Compare colleges   |
| `/api/predictor`       | Predictor API      |
| `/api/auth/register`   | Register user      |
| `/api/saved`           | Saved colleges     |

---

# 📸 Screenshots

<img width="1892" height="910" alt="image" src="https://github.com/user-attachments/assets/7428e8be-414a-4027-ad19-cb9c4a111a4e" />

---

# 👨‍💻 Author

## Sajal Goyal

B.Tech Student • Full Stack Developer

---

# 📄 License

This project is built for educational and evaluation purposes.

```
```
