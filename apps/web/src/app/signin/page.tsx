"use client";

import { Inter } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    if (!email || !password) return;
    // Retrieve name from signup if available, else use email prefix
    const pending = localStorage.getItem("pending_user");
    const parsed = pending ? JSON.parse(pending) : null;
    const name = parsed?.name || email.split("@")[0];
    // Store logged-in user
    localStorage.setItem("auth_user", JSON.stringify({ name, email, avatarSrc: "" }));
    localStorage.removeItem("pending_user");
    router.push("/");
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

      {/* Footer — fixed to bottom corners */}
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
          {/* Heading */}
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <h1 style={{ margin: 0, fontWeight: 700, fontSize: "24px", lineHeight: "32px", color: "#102218" }}>
              Welcome back
            </h1>
            <p style={{ margin: 0, fontSize: "13px", color: "#64748b", fontWeight: 400 }}>
              Enter your credentials to access your portal
            </p>
          </div>

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ border: "none", outline: "none", flex: 1, fontSize: "16px", fontWeight: 500, color: "#94A3B8", backgroundColor: "transparent", fontFamily: "inherit", lineHeight: "100%", letterSpacing: "0px" }}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ border: "none", outline: "none", flex: 1, fontSize: "16px", fontWeight: 500, color: "#94A3B8", backgroundColor: "transparent", fontFamily: "inherit", lineHeight: "100%", letterSpacing: "0px" }}
              />
              <button onClick={() => setShowPassword(!showPassword)} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="3" stroke="#94a3b8" strokeWidth="2"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            style={{ width: "100%", padding: "16px", borderRadius: "9999px", backgroundColor: "#0EAF50", border: "none", cursor: "pointer", fontSize: "15px", fontWeight: 700, color: "#ffffff", fontFamily: "inherit", height: "56px" }}
          >
            Login
          </button>

          {/* OR divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#e2e8f0" }} />
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#475569", letterSpacing: "1.2px", textTransform: "uppercase", lineHeight: "16px", fontFamily: "inherit" }}>
              or continue with
            </span>
            <div style={{ flex: 1, height: "1px", backgroundColor: "#e2e8f0" }} />
          </div>

          {/* Social buttons */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src="/google.svg" alt="Google" style={{ width: 84, height: 26, objectFit: "contain" }} />
            </button>
            <button style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "none", background: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src="/linkedin.svg" alt="LinkedIn" style={{ width: 84, height: 26, objectFit: "contain" }} />
            </button>
          </div>
        </div>

        {/* Request Access */}
        <p style={{ margin: 0, fontSize: "13px", color: "#64748b" }}>
          Don't have an account?{" "}
          <a href="/signup" style={{ color: "#11D462", fontWeight: 600, textDecoration: "none" }}>
            Request Access
          </a>
        </p>
      </div>
    </div>
  );
}