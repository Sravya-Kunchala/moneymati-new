import { headers } from "next/headers";
import Dashboard from "@/components/admin-dashboard";
import { authAdmin } from "@/app/lib/auth-admin";

function AdminSigninRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/admin/signin" />
      <script dangerouslySetInnerHTML={{ __html: 'window.location.replace("/admin/signin");' }} />
    </>
  );
}

export default async function DashboardPage() {
  const hdrs = await headers();
  let session = null;

  try {
    session = await authAdmin.api.getSession({
      headers: Object.fromEntries(hdrs.entries()),
    });
  } catch (error) {
    console.error("Unable to load admin session:", error);
    return <AdminSigninRedirect />;
  }

  const adminEmails =
    process.env.ADMIN_EMAILS?.split(",").map((email) => email.trim().toLowerCase()) ?? [];
  const email = (session as any)?.user?.email?.toLowerCase();
  const role =
    (session as any)?.user?.role ??
    (session as any)?.user?.additionalFields?.role ??
    (session as any)?.role;

  const isAllowedEmail = adminEmails.length === 0 ? true : adminEmails.includes(email || "");
  const isAdminRole = role === "ADMIN";

  if (!session || !email || !isAdminRole || !isAllowedEmail) {
    return <AdminSigninRedirect />;
  }

  return <Dashboard />;
}
