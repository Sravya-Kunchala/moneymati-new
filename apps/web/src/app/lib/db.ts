process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // 👈 must be first line

import { PrismaClient } from "@repo/db";
import { PrismaPg } from "@prisma/adapter-pg";
import { getDatabaseUrl } from "@/app/lib/db-url";

const connectionString = getDatabaseUrl();

const ssl = {
  rejectUnauthorized: false, // 👈 always false, let the line above handle it
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