const DATABASE_URL_KEYS = [
  "DATABASE_URL",
  "POSTGRES_PRISMA_URL",
  "POSTGRES_URL",
  "DIRECT_URL",
  "POSTGRES_URL_NON_POOLING",
] as const;

function resolveDatabaseUrl(): string | undefined {
  for (const key of DATABASE_URL_KEYS) {
    const value = process.env[key]?.trim();
    if (value) {
      return value;
    }
  }

  return undefined;
}

export function hasDatabaseUrl(): boolean {
  return Boolean(resolveDatabaseUrl());
}

export function getDatabaseUrl(): string {
  const url = resolveDatabaseUrl();

  if (!url) {
    throw new Error(
      "Missing database URL. Set DATABASE_URL, POSTGRES_PRISMA_URL, POSTGRES_URL, DIRECT_URL, or POSTGRES_URL_NON_POOLING in your environment."
    );
  }

  try {
    new URL(url);
  } catch {
    throw new Error(
      "Invalid database URL. Check DATABASE_URL, POSTGRES_PRISMA_URL, POSTGRES_URL, DIRECT_URL, or POSTGRES_URL_NON_POOLING format."
    );
  }

  return url;
}
