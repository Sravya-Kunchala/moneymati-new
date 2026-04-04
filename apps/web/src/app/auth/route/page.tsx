// @ts-expect-error next/navigation exports redirect at runtime; suppress stale type error
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";

export const dynamic = "force-dynamic";

export default async function AuthRoutePage() {
  // Ask Better Auth for the current session (reads cookies on the server)
  const hdrs = await headers();
  const session = await auth.api.getSession({
    headers: Object.fromEntries(hdrs.entries()),
  });

  const role =
    (session as any)?.user?.role ??
    (session as any)?.user?.additionalFields?.role ??
    "USER";

  redirect(role === "ADMIN" ? "/dashboard" : "/");
}
