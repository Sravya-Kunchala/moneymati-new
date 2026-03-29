import { PrismaClient } from "@repo/db";
import { PrismaPg } from "@prisma/adapter-pg";
import { NextResponse } from "next/server";
import { getDatabaseUrl } from "@/app/lib/db-url";

const connectionString = getDatabaseUrl();
const ssl = {
  rejectUnauthorized: process.env.NODE_ENV === "production",
};

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString,
    ssl,
  }),
});

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json(
      {
        ok: false,
        error: error?.message ?? "Unknown error",
        code: error?.code ?? null,
      },
      { status: 500 }
    );
  }
}
