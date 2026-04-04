-- Add Role enum and role column for separating admin vs user accounts
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'Role') THEN
    CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');
  END IF;
END$$;

ALTER TABLE "User"
ADD COLUMN IF NOT EXISTS "role" "Role" NOT NULL DEFAULT 'USER';
