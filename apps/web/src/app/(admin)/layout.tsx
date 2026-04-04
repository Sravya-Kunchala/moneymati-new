import { ReactNode } from "react";
// @ts-expect-error next/navigation exports redirect at runtime; suppress stale type error
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";

// Protect all routes inside the (admin) group.
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const hdrs = await headers();
  const session = await auth.api.getSession({
    headers: Object.fromEntries(hdrs.entries()),
  });

  const adminEmails =
    process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim().toLowerCase()) ??
    [];
  const email = (session as any)?.user?.email?.toLowerCase();

  if (!session || !email || !adminEmails.includes(email)) {
    redirect("/admin/signin");
  }

  return <>{children}</>;
}
