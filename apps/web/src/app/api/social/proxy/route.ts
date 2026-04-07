import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const target = req.nextUrl.searchParams.get("url");
  if (!target) {
    return new Response("missing url", { status: 400 });
  }

  try {
    const upstream = await fetch(target, { cache: "no-store" });
    if (!upstream.ok) {
      return new Response(`upstream ${upstream.status}`, { status: 502 });
    }

    const headers = new Headers(upstream.headers);
    // Remove hop-by-hop headers
    headers.delete("content-security-policy");
    headers.delete("transfer-encoding");
    headers.delete("content-length");

    return new Response(upstream.body, {
      status: upstream.status,
      headers,
    });
  } catch (err) {
    return new Response("proxy error", { status: 502 });
  }
}
