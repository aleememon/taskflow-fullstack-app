import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const connectionString = process.env.DATABASE_URL!;

if (!connectionString) {
    throw new Error("DATABASE_URL is not defined");
}

// singleton pattern to avoid hot reloads (again and again)
const globalForDb = globalThis as unknown as { conn: ReturnType<typeof neon> | undefined };

const client = globalForDb.conn ?? neon(connectionString);
if (process.env.NODE_ENV !== "production") globalForDb.conn = client;

export const db = drizzle(client);