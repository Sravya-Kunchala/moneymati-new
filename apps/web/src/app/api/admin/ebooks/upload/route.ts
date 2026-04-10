import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    // Convert file to base64 data URI for Cloudinary
    const bytes = await file.arrayBuffer();
    const base64 = Buffer.from(bytes).toString("base64");
    const dataUri = `data:application/pdf;base64,${base64}`;

    // Upload to Cloudinary as raw resource (required for PDFs)
    const result = await cloudinary.uploader.upload(dataUri, {
      resource_type: "raw",
      folder: "moneymati/ebooks",
      use_filename: true,
      unique_filename: true,
      public_id: `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "")}`,
    });

    return NextResponse.json({
      href: result.secure_url,
      filename: result.public_id,
      storedAt: "cloudinary",
    });
  } catch (error: any) {
    console.error("ebook upload error", error);
    return NextResponse.json(
      { error: "Upload failed", detail: String(error?.message ?? error) },
      { status: 500 }
    );
  }
}