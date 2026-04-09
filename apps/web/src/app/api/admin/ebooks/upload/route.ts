import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!file.type.includes("pdf")) {
      return NextResponse.json({ error: "Only PDF uploads are allowed" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const safeName = `${Date.now()}-${randomBytes(4).toString("hex")}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "")}`;

    const cwd = process.cwd();
    const candidateDirs = [
      path.join(cwd, "public", "ebooks"),
      path.join(cwd, "apps", "web", "public", "ebooks"),
    ];
    let uploadDir = candidateDirs[0];
    for (const dir of candidateDirs) {
      try {
        const stat = await fs.stat(dir.replace(/ebooks$/, "")); // parent exists?
        if (stat.isDirectory()) {
          uploadDir = dir;
          break;
        }
      } catch {
        // continue to next
      }
    }

    await fs.mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, safeName);
    await fs.writeFile(filePath, buffer);

    const href = `/ebooks/${safeName}`;
    return NextResponse.json({ href, filename: safeName, storedAt: uploadDir });
  } catch (error: any) {
    console.error("ebook upload error", error);
    return NextResponse.json({ error: "Upload failed", detail: String(error?.message ?? error) }, { status: 500 });
  }
}
