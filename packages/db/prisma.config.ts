import { defineConfig } from "prisma/config";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../../apps/web/.env") });

const databaseUrl =
  process.env.DIRECT_URL ||
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.DATABASE_URL ||
  process.env.POSTGRES_PRISMA_URL ||
  process.env.POSTGRES_URL;

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: databaseUrl!,
  },
});
