import { createAuthClient } from "better-auth/react";

function resolveBaseUrl() {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/api/auth`;
  }

  if (process.env.NEXT_PUBLIC_URL) {
    const cleaned = process.env.NEXT_PUBLIC_URL.replace(/\/+$/g, "");
    return `${cleaned}/api/auth`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api/auth`;
  }

  return "http://localhost:3000/api/auth";
}

export const authClient = createAuthClient({ baseURL: resolveBaseUrl() });
