// Central Prisma client shared across app routes.
// Allows opting into self-signed certs for local/dev via ALLOW_SELF_SIGNED=1.
const allowSelfSigned =
  process.env.ALLOW_SELF_SIGNED === "1" || process.env.NODE_ENV !== "production";

// Must run before importing pg/prisma so Node TLS honors it.
if (allowSelfSigned) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

import { PrismaClient } from "@repo/db";
import { PrismaPg } from "@prisma/adapter-pg";
import { getDatabaseUrl } from "@/app/lib/db-url";

const connectionString = getDatabaseUrl();

const ssl = {
  rejectUnauthorized: !allowSelfSigned,
};

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Reuse across hot reloads, but recreate if the generated client schema changed (e.g., new models)
const hasWebinarDelegate = (client: PrismaClient | undefined) =>
  client && typeof (client as any).webinar?.findMany === "function";

// Ensure prisma is always a PrismaClient instance (no undefined in the type)
export const prisma: PrismaClient =
  hasWebinarDelegate(globalForPrisma.prisma) ? globalForPrisma.prisma! :
  new PrismaClient({
    adapter: new PrismaPg({
      connectionString,
      ssl,
    }),
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
