export function getDatabaseUrl(): string {
  const url =
    process.env.DATABASE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL;

  if (!url) {
    throw new Error(
      "Missing database URL. Set DATABASE_URL (or POSTGRES_PRISMA_URL/POSTGRES_URL) in your environment."
    );
  }

  try {
    new URL(url);
  } catch {
    throw new Error(
      "Invalid database URL. Check DATABASE_URL (or POSTGRES_PRISMA_URL/POSTGRES_URL) format."
    );
  }

  return url;
}
