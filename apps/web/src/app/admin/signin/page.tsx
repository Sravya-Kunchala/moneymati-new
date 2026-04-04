"use client";

import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";

const inter = Inter({ subsets: ["latin"], weight: ["500", "600", "700"] });

export default function AdminSigninPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const clearSession = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
    } catch {
      // ignore best-effort logout
    }
  };

  const handleSignin = async () => {
    if (!email || !password) {
      setError("Enter both email and password.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
      });

      const role =
        (res as any)?.data?.user?.role ??
        (res as any)?.data?.role ??
        (res as any)?.data?.user?.additionalFields?.role;

      if ((res as any)?.error) {
        setError((res as any).error?.message ?? "Invalid credentials.");
        return;
      }

      if (role !== "ADMIN") {
        await clearSession();
        setError("This account is not an admin. Please use the user portal.");
        return;
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message ?? "Unable to sign in right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={inter.className}
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at 20% 20%, #0b7b3e1a, #f6fffa)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          background: "#0f172a",
          color: "#f8fafc",
          borderRadius: 20,
          boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            padding: "28px 32px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>
              MoneyMati Admin
            </p>
            <h1 style={{ margin: "4px 0 0", fontSize: 22, fontWeight: 700 }}>
              Sign in as Admin
            </h1>
          </div>
          <img
            src="/best new moneymati logo.svg"
            alt="MoneyMati"
            width={80}
            height={48}
            style={{ objectFit: "contain" }}
          />
        </div>

        <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 18 }}>
          {error && (
            <div
              style={{
                background: "#fee2e2",
                color: "#b91c1c",
                borderRadius: 12,
                padding: "12px 14px",
                fontSize: 13,
              }}
            >
              {error}
            </div>
          )}

          <label style={{ fontSize: 12, color: "#cbd5e1", fontWeight: 600 }}>
            Work Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSignin()}
              placeholder="admin@company.com"
              style={{
                marginTop: 8,
                width: "100%",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "#0b1224",
                color: "#e2e8f0",
                padding: "12px 14px",
                fontSize: 14,
                outline: "none",
              }}
            />
          </label>

          <label style={{ fontSize: 12, color: "#cbd5e1", fontWeight: 600 }}>
            Password
            <div
              style={{
                marginTop: 8,
                display: "flex",
                alignItems: "center",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "#0b1224",
                padding: "4px 10px 4px 14px",
              }}
            >
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSignin()}
                placeholder="••••••••"
                style={{
                  flex: 1,
                  border: "none",
                  background: "transparent",
                  color: "#e2e8f0",
                  padding: "10px 0",
                  fontSize: 14,
                  outline: "none",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#94a3b8",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <button
            onClick={handleSignin}
            disabled={loading}
            style={{
              marginTop: 4,
              width: "100%",
              padding: "14px 16px",
              borderRadius: 12,
              border: "none",
              background: loading ? "#16a34a90" : "linear-gradient(135deg,#16a34a,#22c55e)",
              color: "#0b1224",
              fontWeight: 700,
              fontSize: 15,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "transform 0.15s ease",
            }}
          >
            {loading ? "Signing in..." : "Enter Admin"}
          </button>

          <p style={{ margin: "6px 0 0", color: "#94a3b8", fontSize: 13 }}>
            Need an account?{" "}
            <a
              href="/admin/signup"
              style={{ color: "#34d399", fontWeight: 700, textDecoration: "none" }}
            >
              Request admin access
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
