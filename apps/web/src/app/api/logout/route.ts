import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = NextResponse.json({ ok: true });
  const cookieHeader = request.headers.get("cookie") || "";
  const cookieNames = cookieHeader
    .split(";")
    .map((c) => c.trim().split("=")[0])
    .filter((name) => name && name.startsWith("better-auth"));

  for (const name of cookieNames) {
    response.cookies.set({
      name,
      value: "",
      path: "/",
      maxAge: 0,
    });
  }

  return response;
}
