# CollegeZen

A modern college discovery and comparison platform built with Next.js 15, TypeScript, Tailwind CSS, and Prisma.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS v4
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Linting:** ESLint

## Getting Started

### Prerequisites

- Node.js 18.18+
- PostgreSQL database

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages & layouts
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Homepage
│   └── globals.css   # Global styles & Tailwind
├── components/       # Reusable UI components
│   ├── layout/       # Layout components (Navbar, Footer)
│   └── ui/           # UI primitives
├── lib/              # Utility functions & shared logic
│   └── prisma.ts     # Prisma client singleton
└── types/            # TypeScript type definitions
prisma/
└── schema.prisma     # Prisma schema (PostgreSQL)
```

## License

Private
