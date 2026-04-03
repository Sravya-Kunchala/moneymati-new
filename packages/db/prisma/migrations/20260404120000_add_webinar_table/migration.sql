-- Create webinar enum and table (missing from initial migration)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'WebinarStatus') THEN
    CREATE TYPE "WebinarStatus" AS ENUM ('UPCOMING', 'LIVE', 'COMPLETED');
  END IF;
END$$;

CREATE TABLE IF NOT EXISTS "Webinar" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "host" TEXT NOT NULL,
  "scheduledAt" TIMESTAMP(3) NOT NULL,
  "status" "WebinarStatus" NOT NULL DEFAULT 'UPCOMING',
  "thumbType" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
