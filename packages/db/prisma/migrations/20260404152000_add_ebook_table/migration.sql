-- Create Ebook table to store uploaded/admin-managed e-books
CREATE TABLE IF NOT EXISTS "Ebook" (
  "id" TEXT PRIMARY KEY,
  "title" TEXT NOT NULL,
  "description" TEXT,
  "category" TEXT NOT NULL DEFAULT 'Financials',
  "pages" INTEGER NOT NULL DEFAULT 0,
  "format" TEXT NOT NULL DEFAULT 'PDF',
  "href" TEXT,
  "status" TEXT NOT NULL DEFAULT 'Published',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Keep updatedAt current on update
CREATE OR REPLACE FUNCTION set_ebook_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_ebook_updated_at ON "Ebook";
CREATE TRIGGER set_ebook_updated_at
BEFORE UPDATE ON "Ebook"
FOR EACH ROW EXECUTE PROCEDURE set_ebook_updated_at();
