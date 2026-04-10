import { createAuthClient } from "better-auth/react";

function resolveBaseUrl() {
  // Prefer client origin when running in the browser
  if (typeof window !== "undefined") {
    return `${window.location.origin}/api/admin/auth`;
  }

  // Server-side: derive from env
  if (process.env.NEXT_PUBLIC_URL) {
    const cleaned = process.env.NEXT_PUBLIC_URL.replace(/\/+$/g, "");
    return `${cleaned}/api/admin/auth`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}/api/admin/auth`;
  }

  return "http://localhost:3000/api/admin/auth";
}

export const adminAuthClient = createAuthClient({ baseURL: resolveBaseUrl() });
