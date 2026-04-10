export const dynamic = "force-dynamic";
import { betterAuth } from "better-auth";
import { z } from "zod";
import { prismaAdapter } from "@better-auth/prisma-adapter";
import { PrismaClient } from "@repo/db";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { getDatabaseUrl } from "./db-url";

const allowSelfSigned =
  process.env.ALLOW_SELF_SIGNED === "1" || process.env.NODE_ENV !== "production";

// Reuse a single PG pool across hot reloads to avoid exhausting connections
const globalForPrisma = globalThis as unknown as {
  adminPrismaPool?: Pool;
  adminPrismaClient?: PrismaClient;
};

const pool =
  globalForPrisma.adminPrismaPool ??
  new Pool({
    connectionString: getDatabaseUrl(),
    ssl: { rejectUnauthorized: !allowSelfSigned },
  });

const prisma =
  globalForPrisma.adminPrismaClient ??
  new PrismaClient({
    adapter: new PrismaPg(pool),
  });

globalForPrisma.adminPrismaPool = pool;
globalForPrisma.adminPrismaClient = prisma;

const appUrl =
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
  "http://localhost:3000";

const baseURL = (() => {
  const trimmed = appUrl.replace(/\/+$/, "");
  const adminPath = "/api/admin/auth";
  return trimmed.endsWith(adminPath) ? trimmed : `${trimmed}${adminPath}`;
})();

export const authAdmin = betterAuth({
  baseURL,
  basePath: "/api/admin/auth",
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "ADMIN",
        input: true,
        output: true,
        validator: { input: z.enum(["USER", "ADMIN"]) },
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    linkedin: {
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    },
  },
  advanced: {
    cookiePrefix: "admin-auth",
    cookies: {
      // Keep path at root so admin cookies work on /dashboard routes (which live at "/")
      session_token: { attributes: { path: "/" } },
      session_data: { attributes: { path: "/" } },
      account_data: { attributes: { path: "/" } },
    },
  },
});
