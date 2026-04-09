import { NextResponse } from "next/server";
import path from "node:path";
import { promises as fs } from "node:fs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function mimeFromName(name: string) {
  const lower = name.toLowerCase();
  if (lower.endsWith(".pdf")) return "application/pdf";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".svg")) return "image/svg+xml";
  return "application/octet-stream";
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ filename: string }> },
) {
  // Next.js 15 dynamic params can be a promise
  const { filename } = await context.params;

  // Guard against directory traversal
  const safeName = filename.replace(/[/\\]+/g, "").replace(/\.\./g, "");

  const roots = [
    path.join(process.cwd(), "apps", "web", "public", "ebooks"),
    path.join(process.cwd(), "public", "ebooks"),
    path.join(process.cwd(), "apps", "web", "public", "e-book"),
    path.join(process.cwd(), "public", "e-book"),
  ];

  for (const root of roots) {
    const filePath = path.join(root, safeName);
    try {
      const stat = await fs.stat(filePath);
      if (!stat.isFile()) continue;

      const buffer = await fs.readFile(filePath);
      const mime = mimeFromName(safeName);

      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": mime,
          "Content-Disposition": `inline; filename="${encodeURIComponent(safeName)}"`,
          "Cache-Control": "public, max-age=86400, must-revalidate",
        },
      });
    } catch {
      // try next root
    }
  }

  return NextResponse.json({ error: "File not found" }, { status: 404 });
}
