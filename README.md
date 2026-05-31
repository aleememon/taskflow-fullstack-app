# TaskFlow

TaskFlow is a production-grade task tracking application built to demonstrate advanced rendering strategies and full-stack patterns using the modern Next.js App Router ecosystem.

This application features a custom "Dark Zinc & Orange" UI theme using Tailwind CSS and leverages a robust Postgres database layer powered by Drizzle ORM.

## Tech Stack

- **Framework:** Next.js 15 (App Router, React 19)
- **Database:** Neon Serverless Postgres
- **ORM:** Drizzle ORM
- **Styling:** Tailwind CSS (Custom Dark Zinc & Orange theme)
- **Data Mutations:** Next.js Server Actions & API Routes

## Rendering Strategies Demonstrated

This project serves as a showcase for Next.js hybrid rendering strategies. Different pages use different rendering techniques to optimize for their specific use cases:

### 1. Static Site Generation (SSG)
**Location:** Landing Page (`/src/app/page.tsx`)
- **How it works:** The landing page is completely static and relies on no external data. Next.js generates this page once at build time into pure HTML/CSS.
- **Why:** Delivers the absolute fastest initial page load, perfect for a marketing or hero entry page where data doesn't change.

### 2. Server-Side Rendering (SSR)
**Location:** Dashboard Workspace (`/src/app/dashboard/page.tsx`)
- **How it works:** Uses `export const dynamic = 'force-dynamic';`. The server fetches the latest task data from Postgres *on every single incoming request*.
- **Why:** When users are actively managing tasks, they need to see exactly what is in the database in real-time. Paired with Server Actions (`todo-actions.ts`), modifications instantly trigger `revalidatePath("/dashboard")` to re-fetch the accurate state.

### 3. Incremental Static Regeneration (ISR / ISG)
**Location:** Explore / Global Metrics (`/src/app/explore/page.tsx`)
- **How it works:** Uses `export const revalidate = 60;`. Next.js statically builds this page, but if a request comes in and the cache is older than 60 seconds, it triggers a background reconstruction to fetch the latest global task counts from Postgres.
- **Why:** Heavy aggregation queries (counting thousands of tasks) shouldn't be run on every request. ISR provides the speed of static HTML while ensuring the metrics update periodically without hammering the database.

---

## Installation & Setup

### Prerequisites
- Node.js 18+
- A Postgres database (e.g., [Neon.tech](https://neon.tech/) or local Postgres)

### 1. Clone & Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory. You can use `.env.example` as a template if one exists.

```env
# Example .env
DATABASE_URL="postgresql://user:password@hostname/dbname?sslmode=require"
```

### 3. Initialize the Database

Since this project uses Drizzle ORM, you need to push the schema to your Postgres database. This will create the required `tasks` table.

```bash
# Push the schema directly to the database
npx drizzle-kit push
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app/page.tsx` - Static Landing Page (SSG)
- `src/app/dashboard/` - Real-time Workspace (SSR)
- `src/app/explore/` - Global Metrics (ISR)
- `src/actions/todo-actions.ts` - Next.js Server Actions for mutations
- `src/app/api/tasks/` - REST API alternative for task management
- `src/db/` - Drizzle ORM schema and database connection setup
