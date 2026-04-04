"use client";

import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/app/lib/auth-client";

const inter = Inter({ subsets: ["latin"], weight: ["500", "600", "700"] });

export default function AdminSignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
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

  const handleSignup = async () => {
    if (!fullName || !email || !password) {
      setError("Fill all fields to create an admin account.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await authClient.signUp.email({
        name: fullName,
        email,
        password,
        role: "ADMIN",
        callbackURL: "/dashboard",
      });

      const role =
        (res as any)?.data?.user?.role ??
        (res as any)?.data?.role ??
        (res as any)?.data?.user?.additionalFields?.role;

      if ((res as any)?.error) {
        setError((res as any).error?.message ?? "Unable to sign up.");
        return;
      }

      if (role !== "ADMIN") {
        await clearSession();
        setError("Signup succeeded but the account is not marked admin.");
        return;
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message ?? "Unable to sign up right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={inter.className}
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at 80% 10%, #16a34a1c, #f8fff8)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          background: "#0b1224",
          color: "#f8fafc",
          borderRadius: 22,
          boxShadow: "0 24px 80px rgba(0,0,0,0.28)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "28px 32px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div>
            <p style={{ margin: 0, fontSize: 12, color: "#94a3b8" }}>
              Internal team access
            </p>
            <h1 style={{ margin: "4px 0 0", fontSize: 22, fontWeight: 700 }}>
              Create admin account
            </h1>
          </div>
          <img
            src="/best new moneymati logo.svg"
            alt="MoneyMati"
            width={86}
            height={50}
            style={{ objectFit: "contain" }}
          />
        </div>

        <div style={{ padding: "28px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
          {error && (
            <div
              style={{
                background: "#fef9c3",
                color: "#92400e",
                borderRadius: 12,
                padding: "12px 14px",
                fontSize: 13,
              }}
            >
              {error}
            </div>
          )}

          <label style={{ fontSize: 12, color: "#cbd5e1", fontWeight: 600 }}>
            Full name
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Alex Admin"
              style={{
                marginTop: 8,
                width: "100%",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "#0f172a",
                color: "#e2e8f0",
                padding: "12px 14px",
                fontSize: 14,
                outline: "none",
              }}
            />
          </label>

          <label style={{ fontSize: 12, color: "#cbd5e1", fontWeight: 600 }}>
            Work email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@company.com"
              style={{
                marginTop: 8,
                width: "100%",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "#0f172a",
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
                background: "#0f172a",
                padding: "4px 10px 4px 14px",
              }}
            >
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            onClick={handleSignup}
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
            {loading ? "Creating..." : "Create Admin"}
          </button>

          <p style={{ margin: "8px 0 0", color: "#94a3b8", fontSize: 13 }}>
            Already have access?{" "}
            <a
              href="/admin/signin"
              style={{ color: "#34d399", fontWeight: 700, textDecoration: "none" }}
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
