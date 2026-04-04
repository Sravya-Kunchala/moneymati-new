"use client";

import { Inter } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await authClient.signIn.email({
        email,
        password,
        // We manually redirect based on role after we inspect the response.
        callbackURL: undefined,
      });
      const role =
        (res as any)?.data?.user?.role ??
        (res as any)?.data?.user?.additionalFields?.role ??
        (res as any)?.data?.role ??
        "USER";

      if ((res as any)?.error) {
        setError((res as any).error.message ?? "Invalid email or password.");
        return;
      }

      router.push(role === "ADMIN" ? "/dashboard" : "/");
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "linkedin") => {
    await authClient.signIn.social({
      provider,
      // Use a neutral callback where we can route based on role from the session cookie.
      callbackURL: "/auth/route",
    });
  };

  return (
    <div
      className={inter.className}
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0faf4",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spinner {
          width: 18px;
          height: 18px;
          border: 2.5px solid rgba(255,255,255,0.4);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
        }
        .social-oauth-btn {
          flex: 1;
          padding: 14px 20px;
          border-radius: 9999px;
          background-color: #ffffff;
          border: 1.5px solid #e2e8f0;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          color: #102218;
          font-family: inherit;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 52px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .social-oauth-btn:hover {
          border-color: #cbd5e1;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }
      `}</style>

      {/* Background green blur */}
      <div
        style={{
          position: "absolute",
          top: "80px",
          right: "0px",
          width: "500px",
          height: "500px",
          borderRadius: "9999px",
          backgroundColor: "rgba(17, 212, 98, 0.12)",
          filter: "blur(100px)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Footer */}
      <div style={{ position: "fixed", bottom: "20px", left: "24px", zIndex: 10 }}>
        <span style={{ fontSize: "11px", color: "#94a3b8", letterSpacing: "0.5px" }}>© 2026 MONEYMATI</span>
      </div>
      <div style={{ position: "fixed", bottom: "20px", right: "24px", display: "flex", gap: "20px", zIndex: 10 }}>
        {["PRIVACY POLICY", "TERMS OF SERVICE", "SECURITY"].map((item) => (
          <a key={item} href="#" style={{ fontSize: "11px", color: "#94a3b8", textDecoration: "none", fontWeight: 500, letterSpacing: "0.5px" }}>{item}</a>
        ))}
      </div>

      {/* Main content */}
      <div style={{ width: "100%", maxWidth: "420px", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", zIndex: 1 }}>

        {/* Logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
          <img src="/best new moneymati logo.svg" alt="MoneyMati" width={120} height={80} style={{ objectFit: "contain" }} />
        </div>

        {/* Card */}
        <div
          style={{
            width: "100%",
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            padding: "36px 32px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <h1 style={{ margin: 0, fontWeight: 700, fontSize: "24px", lineHeight: "32px", color: "#102218" }}>
              Welcome back
            </h1>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b", fontWeight: 400 }}>
              Enter your credentials to access your portal
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div style={{
              background: "#fff0f0",
              border: "1px solid #fca5a5",
              color: "#dc2626",
              borderRadius: "10px",
              padding: "10px 14px",
              fontSize: "13px",
              textAlign: "center",
            }}>
              {error}
            </div>
          )}

          {/* Email */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.8px", color: "#64748b", textTransform: "uppercase" }}>
              Email Address
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "12px 14px", backgroundColor: "#fff" }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="22,6 12,13 2,6" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                style={{ border: "none", outline: "none", flex: 1, fontSize: "16px", fontWeight: 500, color: "#102218", backgroundColor: "transparent", fontFamily: "inherit" }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <label style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.8px", color: "#64748b", textTransform: "uppercase" }}>
                Password
              </label>
              <a href="#" style={{ fontSize: "12px", color: "#11D462", fontWeight: 500, textDecoration: "none" }}>
                Forgot Password?
              </a>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "12px 14px", backgroundColor: "#fff" }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                style={{ border: "none", outline: "none", flex: 1, fontSize: "16px", fontWeight: 500, color: "#102218", backgroundColor: "transparent", fontFamily: "inherit" }}
              />
              <button onClick={() => setShowPassword(!showPassword)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                {showPassword ? (
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="1" y1="1" x2="23" y2="23" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="#94a3b8" strokeWidth="2"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "9999px",
              backgroundColor: "#0EAF50",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "15px",
              fontWeight: 700,
              color: "#ffffff",
              fontFamily: "inherit",
              height: "56px",
              opacity: loading ? 0.6 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "opacity 0.2s",
            }}
          >
            {loading ? <div className="spinner" /> : "Login"}
          </button>

          {/* OR divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#e2e8f0" }} />
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#475569", letterSpacing: "1.2px", textTransform: "uppercase", fontFamily: "inherit" }}>
              or continue with
            </span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#e2e8f0" }} />
          </div>

          {/* Google + LinkedIn side by side */}
          <div style={{ display: "flex", gap: "12px" }}>

            {/* Google */}
            <button className="social-oauth-btn" onClick={() => handleOAuth("google")}>
              <svg width="18" height="18" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
                <path fill="none" d="M0 0h48v48H0z"/>
              </svg>
              Google
            </button>

            {/* LinkedIn */}
            <button className="social-oauth-btn" onClick={() => handleOAuth("linkedin")}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </button>
          </div>
        </div>

        {/* Sign up link */}
        <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
          Don't have an account?{" "}
          <a href="/signup" style={{ color: "#11D462", fontWeight: 600, textDecoration: "none" }}>
            Create An Account
          </a>
        </p>
      </div>
    </div>
  );
}
