import { ReactNode } from "react";
// @ts-expect-error next/navigation exports redirect at runtime; suppress stale type error
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { authAdmin } from "@/app/lib/auth-admin";

// Protect all routes inside the (admin) group.
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const hdrs = await headers();
  const session = await authAdmin.api.getSession({
    headers: Object.fromEntries(hdrs.entries()),
  });

  const adminEmails =
    process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim().toLowerCase()) ??
    [];
  const email = (session as any)?.user?.email?.toLowerCase();
  const role =
    (session as any)?.user?.role ??
    (session as any)?.user?.additionalFields?.role ??
    (session as any)?.role;

  // Require both ADMIN role and allow‑list email so regular user sessions
  // on the public site don't automatically grant admin access.
  const isAllowedEmail = adminEmails.length === 0 ? true : adminEmails.includes(email || "");
  const isAdminRole = role === "ADMIN";

  if (!session || !email || !isAdminRole || !isAllowedEmail) {
    redirect("/admin/signin");
  }

  return <>{children}</>;
}
