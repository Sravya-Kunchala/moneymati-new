import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@repo/db";

const connectionString = process.env.DATABASE_URL!;
if (process.env.NODE_ENV !== "production") {
  // Local dev only: allow self-signed certs for Supabase pooler.
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

const ssl = {
  rejectUnauthorized: process.env.NODE_ENV === "production",
};

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString,
    ssl,
  }),
});

const baseURL =
  process.env.NEXT_PUBLIC_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined) ||
  "http://localhost:3000";

export const auth = betterAuth({
  baseURL,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
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
});
