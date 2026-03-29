import { PrismaClient } from "@repo/db";
import { PrismaPg } from "@prisma/adapter-pg";
import { getDatabaseUrl } from "@/app/lib/db-url";

const connectionString = getDatabaseUrl();

if (process.env.NODE_ENV !== "production") {
  // Local dev only: allow self-signed certs for Supabase pooler.
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const ssl = {
  rejectUnauthorized: process.env.NODE_ENV === "production",
};

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString,
      ssl,
    }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
