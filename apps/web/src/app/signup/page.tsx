"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth-client";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleOAuth = async (provider: "google" | "linkedin") => {
    await authClient.signIn.social({
      provider,
      callbackURL: "/",
    });
  };

  const handleSignup = async () => {
    if (!fullName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await authClient.signUp.email({
        name: fullName,
        email,
        password,
        role: "USER",
        callbackURL: "/",
      });
      if (res.error) {
        setError(res.error.message ?? "Something went wrong.");
      } else {
        router.push("/");
      }
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f4f0",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .bg-blob {
          position: absolute;
          width: 512px;
          height: 421.59px;
          border-radius: 9999px;
          background: #11D462;
          opacity: 0.10;
          filter: blur(64px);
          top: -80px;
          left: -120px;
          pointer-events: none;
        }

        .signup-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 24px 44px 24px;
          width: 100%;
          max-width: 460px;
          box-shadow: 0 8px 48px rgba(0,0,0,0.10);
        }

        .field-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.7px;
          text-transform: uppercase;
          color: #888;
          margin-bottom: 7px;
          display: block;
        }

        .input-wrapper {
          display: flex;
          align-items: center;
          background: #EDF1F0;
          border-radius: 32px;
          border: 1.5px solid transparent;
          padding: 18px 16px 18px 48px;
          gap: 10px;
          height: 55px;
          transition: border-color 0.2s;
          position: relative;
        }
        .input-wrapper:focus-within {
          border-color: #11D462;
          background: #EDF1F0;
        }
        .input-wrapper input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #222;
          padding: 0;
        }
        .input-wrapper input::placeholder { color: #bbb; }
        .input-icon {
          color: #475569;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 14.13px;
          height: 14.92px;
          position: absolute;
          left: 18px;
        }

        .create-btn {
          width: 100%;
          background: #0EAF50;
          color: #fff;
          border: none;
          border-radius: 9999px;
          padding: 20px;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 64px;
          transition: background 0.2s, transform 0.1s;
          letter-spacing: 0.1px;
        }
        .create-btn:hover:not(:disabled) { background: #0c9a46; transform: translateY(-1px); }
        .create-btn:active:not(:disabled) { transform: translateY(0); }
        .create-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .error-msg {
          background: #fff0f0;
          border: 1px solid #fca5a5;
          color: #dc2626;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 13px;
          margin-bottom: 14px;
          text-align: center;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
        }
        .divider-line { flex: 1; height: 1px; background: #ebebeb; }
        .divider-text {
          font-size: 12px;
          color: #475569;
          font-weight: 700;
          white-space: nowrap;
          letter-spacing: 1.2px;
          line-height: 16px;
          text-transform: uppercase;
        }

        .social-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: none;
          border-radius: 10px;
          padding: 11px 0;
          background: transparent;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #333;
          transition: opacity 0.2s;
        }
        .social-btn:hover { opacity: 0.7; }

        .trust-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          padding: 14px 0 10px;
        }
        .trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          color: #aaa;
          padding: 0 24px;
          position: relative;
        }
        .trust-item:not(:last-child)::after {
          content: '';
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 1px;
          height: 14px;
          background: #ddd;
        }

        .footer-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 40px;
          border-top: 1px solid #e8e8e8;
          background: #f8f8f8;
        }
        .footer-link {
          font-size: 11px;
          color: #aaa;
          text-decoration: none;
          letter-spacing: 0.3px;
          font-weight: 500;
        }
        .footer-link:hover { color: #555; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .signup-card { animation: fadeUp 0.5s ease both; }

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
        }
      `}</style>

      {/* Background blob */}
      <div className="bg-blob" />

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px 20px" }}>

        {/* Logo */}
        <div style={{ marginBottom: 28 }}>
          <img src="/best new moneymati logo.svg" alt="MoneyMati" style={{ width: 120, height: 80 }} />
        </div>

        {/* Card */}
        <div className="signup-card">

          {/* Heading */}
          <h1 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 24, color: "#102218", letterSpacing: "-0.6px", lineHeight: "32px", marginBottom: 6 }}>
            Create Account
          </h1>
          <p style={{ fontSize: 13.5, color: "#888", marginBottom: 16, lineHeight: 1.5 }}>
            Join the elite circle of sovereign wealth builders.
          </p>

          {/* Error message */}
          {error && <div className="error-msg">{error}</div>}

          {/* Full Name */}
          <div style={{ marginBottom: 10 }}>
            <label className="field-label">Full Name</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Sanjana"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
              />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: 10 }}>
            <label className="field-label">Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </span>
              <input
                type="email"
                placeholder="sanju@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 16 }}>
            <label className="field-label">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="············"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#bbb", padding: 0, display: "flex", alignItems: "center" }}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Create Account Button */}
          <button
            className="create-btn"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <div className="spinner" />
            ) : (
              <>
                Create Account
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </>
            )}
          </button>

          {/* Divider */}
          <div className="divider">
            <div className="divider-line" />
            <span className="divider-text">OR CONTINUE WITH</span>
            <div className="divider-line" />
          </div>

          {/* Social buttons */}
          <div style={{ display: "flex", gap: 24, marginBottom: 22, justifyContent: "center", alignItems: "center" }}>
            <button className="social-btn" onClick={() => handleOAuth("google")}>
              <img src="/google.svg" alt="Google" style={{ width: 84, height: 26 }} />
            </button>
            <button className="social-btn" onClick={() => handleOAuth("linkedin")}>
              <img src="/linkedin.svg" alt="LinkedIn" style={{ width: 84, height: 26 }} />
            </button>
          </div>

          {/* Login link */}
          <p style={{ textAlign: "center", fontSize: 13, color: "#888" }}>
            Already have an account?{" "}
            <a href="/signin" style={{ color: "#1DB954", fontWeight: 600, textDecoration: "none" }}>Log In</a>
          </p>
        </div>

        {/* Trust bar */}
        <div className="trust-bar" style={{ marginTop: 20 }}>
          <div className="trust-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            AES-256 Secured
          </div>
          <div className="trust-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <polyline points="9 12 11 14 15 10"/>
            </svg>
            SIPC Member
          </div>
          <div className="trust-item">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
            </svg>
            Privacy First
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="footer-bar">
        <span style={{ fontSize: 11, color: "#aaa", fontWeight: 500 }}>© 2026 MONEYMATI</span>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="#" className="footer-link">PRIVACY POLICY</a>
          <a href="#" className="footer-link">TERMS OF SERVICE</a>
          <a href="#" className="footer-link">SECURITY</a>
        </div>
      </div>
    </div>
  );
}
