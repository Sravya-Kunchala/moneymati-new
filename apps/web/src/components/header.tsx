"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Inria_Serif, DM_Sans } from "next/font/google";
import { authClient } from "@/app/lib/auth-client";

const inriaSerif = Inria_Serif({ subsets: ["latin"], weight: ["300", "700"], variable: "--font-inria" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/About", hasDropdown: true },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/Blog" },
  { label: "Calculator", href: "/calucator" },
  { label: "E-Books", href: "/e-book" },
];

const aboutDropdown = [
  { label: "Teams", href: "/hometeams" },
  { label: "Contact", href: "/home-contact" },
  { label: "FAQ", href: "/FAQ" },
];

const loginHref = "/signin";
const signupHref = "/signup";

export default function Header() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [aboutOpenMobile, setAboutOpenMobile] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userMenuPos, setUserMenuPos] = useState({ top: 0, right: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const chevronRef = useRef<HTMLButtonElement>(null);
  const userBtnRef = useRef<HTMLButtonElement>(null);
  const mobileUserBtnRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const { data: sessionData, isPending } = authClient.useSession();

  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    setMounted(true);
  }, [pathname]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setAboutOpenMobile(false);
  }, [pathname]);

  const sessionUser =
    (sessionData as any)?.user ?? (sessionData as any)?.data?.user ?? null;
  const authUser = !isPending && sessionUser
    ? {
        name: sessionUser.name || sessionUser.email || "User",
        email: sessionUser.email || "",
        avatarSrc: sessionUser.image || sessionUser.avatar || "",
      }
    : null;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (!chevronRef.current?.contains(target) && !document.getElementById("about-dropdown")?.contains(target)) {
        setAboutOpen(false);
      }
      if (
        !userBtnRef.current?.contains(target) &&
        !mobileUserBtnRef.current?.contains(target) &&
        !document.getElementById("user-dropdown")?.contains(target)
      ) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleChevronClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (chevronRef.current) {
      const rect = chevronRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 8, left: rect.left - 60 });
    }
    setAboutOpen((v) => !v);
  };

  const handleUserMenuClick = (e: React.MouseEvent, btnRef: { current: HTMLButtonElement | null }) => {
    e.stopPropagation();
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const right = window.innerWidth - rect.right;
      setUserMenuPos({ top: rect.bottom + 8, right });
    }
    setUserMenuOpen((v) => !v);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen((v) => !v);
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      window.location.href = "/";
    } finally {
      setUserMenuOpen(false);
    }
  };

  const aboutDropdownEl = mounted && aboutOpen
    ? createPortal(
        <div
          id="about-dropdown"
          style={{ position: "fixed", top: dropdownPos.top, left: dropdownPos.left, backgroundColor: "#1a3a2a", borderRadius: "12px", padding: "8px 0", minWidth: "180px", boxShadow: "0 8px 32px rgba(0,0,0,0.45)", border: "1px solid rgba(201,168,76,0.25)", zIndex: 99999, animation: "dropFadeIn 0.18s ease both" }}
        >
          <style>{`@keyframes dropFadeIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }`}</style>
          {aboutDropdown.map((item) => (
            <Link key={item.label} href={item.href} onClick={() => setAboutOpen(false)}
              style={{ display: "block", padding: "10px 20px", fontFamily: "var(--font-inria), serif", fontWeight: 700, fontSize: "14px", color: "rgba(255,255,255,0.85)", textDecoration: "none", transition: "color 0.15s, background 0.15s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#c9a84c"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(201,168,76,0.08)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.85)"; (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
            >{item.label}</Link>
          ))}
        </div>,
        document.body
      )
    : null;

  const userDropdownEl = mounted && userMenuOpen
    ? createPortal(
        <div
          id="user-dropdown"
          style={{ position: "fixed", top: userMenuPos.top, right: userMenuPos.right, backgroundColor: "#fff", borderRadius: "16px", padding: "0", minWidth: "180px", maxWidth: "360px", boxShadow: "0 8px 32px rgba(0,0,0,0.18)", border: "1px solid #e5e5e5", zIndex: 99999, animation: "dropFadeIn 0.18s ease both", overflow: "hidden" }}
        >
          {/* User header */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", borderBottom: "1.5px solid #e5e5e5", position: "relative", background: "#fff" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", border: "2.5px dashed #c9a84c", padding: "2px", flexShrink: 0 }}>
              <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", background: "#c9a84c", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {authUser?.avatarSrc
                  ? <img src={authUser.avatarSrc} alt={authUser?.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <span style={{ fontWeight: 700, fontSize: "16px", color: "#1B3226", fontFamily: "var(--font-dm-sans), sans-serif" }}>{authUser?.name?.charAt(0).toUpperCase()}</span>
                }
              </div>
            </div>
            <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700, fontSize: "15px", color: "#111", flex: 1 }}>{authUser?.name}</span>
            <button onClick={() => setUserMenuOpen(false)} style={{ background: "#222", border: "none", borderRadius: "50%", width: 22, height: 22, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 1l8 8M9 1L1 9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* My Profile */}
          <Link href="/profile" onClick={() => setUserMenuOpen(false)}
            style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 18px", textDecoration: "none", borderBottom: "1px solid #f0f0f0", transition: "background 0.15s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#f8f8f8"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
          >
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 500, fontSize: "14px", color: "#222" }}>My Profile</span>
          </Link>

          {/* Logout */}
          <Link href="#" onClick={handleLogout}
            style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 18px", textDecoration: "none", transition: "background 0.15s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#fff5f5"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 600, fontSize: "14px", color: "#e53e3e" }}>Logout</span>
          </Link>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <header
        className={`w-full bg-[#122B1F] px-4 py-3 md:px-8 flex items-center justify-between md:grid md:[grid-template-columns:1fr_auto_1fr] ${inriaSerif.variable} ${dmSans.variable}`}
        style={{ position: "relative", zIndex: 50 }}
      >
        {/* Logo — left */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="/best new moneymati logo.svg" alt="Money Mati" className="h-10 w-10" />
        </div>

        {/* Nav Links — center (desktop only) */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-7" style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {navLinks.map((link) => (
              <li key={link.label} style={{ position: "relative" }}>
                {link.hasDropdown ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                    <Link href={link.href}
                      style={{ fontFamily: "var(--font-inria), serif", fontWeight: isActive(link.href) ? 700 : 300, fontSize: "16px", lineHeight: "19.5px", color: isActive(link.href) ? "#FFFFFF" : "rgba(255,255,255,0.75)", textDecoration: "none", transition: "color 0.15s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#FFB600")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = isActive(link.href) ? "#FFFFFF" : "rgba(255,255,255,0.75)")}
                    >{link.label}</Link>
                    <button ref={chevronRef} onClick={handleChevronClick}
                      style={{ background: "transparent", border: "none", cursor: "pointer", padding: "0 2px", color: isActive(link.href) ? "#FFFFFF" : "rgba(255,255,255,0.75)", display: "flex", alignItems: "center", transition: "color 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#FFB600")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = isActive(link.href) ? "#FFFFFF" : "rgba(255,255,255,0.75)")}
                    >
                      <span style={{ fontSize: "12px", display: "inline-block", transition: "transform 0.2s", transform: aboutOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
                    </button>
                  </div>
                ) : (
                  <Link href={link.href}
                    style={{ fontFamily: "var(--font-inria), serif", fontWeight: isActive(link.href) ? 700 : 300, fontSize: "16px", lineHeight: "19.5px", color: isActive(link.href) ? "#FFFFFF" : "rgba(255,255,255,0.75)", textDecoration: "none", transition: "color 0.15s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#FFB600")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = isActive(link.href) ? "#FFFFFF" : "rgba(255,255,255,0.75)")}
                  >{link.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Right side — desktop */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: "12px", justifyContent: "flex-end" }}>
          {authUser ? (
            <button ref={userBtnRef} onClick={(e) => handleUserMenuClick(e, userBtnRef)}
              style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", padding: "4px 8px", borderRadius: "9999px", transition: "background 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 500, fontSize: "14px", color: "#FFFFFF" }}>{authUser.name}</span>
              <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", background: "#c9a84c", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {authUser.avatarSrc
                  ? <img src={authUser.avatarSrc} alt={authUser.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700, fontSize: "14px", color: "#1B3226" }}>{authUser.name.charAt(0).toUpperCase()}</span>
                }
              </div>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.75)", display: "inline-block", transition: "transform 0.2s", transform: userMenuOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
            </button>
          ) : (
            <>
              <Link href={loginHref}
                style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 500, fontSize: "14px", lineHeight: "20px", color: "#1B3226", backgroundColor: "#c9a84c", borderRadius: "9999px", padding: "8px 20px", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px", transition: "background 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#b8963e")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#c9a84c")}
              >
                Login
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M0.791709 4.58333H10.2709" stroke="#1B3226" strokeWidth="1.58333" strokeLinecap="round" strokeLinejoin="round"/><path d="M6.75008 8.375L10.5417 4.58333L6.75008 0.791664" stroke="#1B3226" strokeWidth="1.58333" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link href={signupHref}
                style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 500, fontSize: "14px", lineHeight: "20px", color: "#FFFFFF", backgroundColor: "transparent", border: "1.5px solid #c9a84c", borderRadius: "9999px", padding: "8px 20px", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px", transition: "background 0.2s, color 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#c9a84c"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent"; }}
              >
                Sign Up
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M11.375 6.5H1.89587" stroke="white" strokeWidth="1.58333" strokeLinecap="round" strokeLinejoin="round"/><path d="M5.41667 2.70833L1.625 6.5L5.41667 10.2917" stroke="white" strokeWidth="1.58333" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </>
          )}
        </div>

        {/* Mobile actions */}
        <div className="flex md:hidden" style={{ alignItems: "center", gap: "10px", justifyContent: "flex-end" }}>
          {/* Search button */}
          <button
            type="button"
            aria-label="Search"
            style={{
              width: 34,
              height: 34,
              borderRadius: "9999px",
              border: "1.5px solid #c9a84c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              color: "#c9a84c",
              cursor: "pointer",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <line x1="20" y1="20" x2="16.5" y2="16.5" />
            </svg>
          </button>

          {/* User avatar — only shown when logged in on mobile */}
          {authUser && (
            <button
              ref={mobileUserBtnRef}
              type="button"
              aria-label="User menu"
              onClick={(e) => handleUserMenuClick(e, mobileUserBtnRef)}
              style={{
                width: 34,
                height: 34,
                borderRadius: "9999px",
                border: "2px solid #c9a84c",
                overflow: "hidden",
                background: "#c9a84c",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
                padding: 0,
              }}
            >
              {authUser.avatarSrc ? (
                <img
                  src={authUser.avatarSrc}
                  alt={authUser.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <span style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#1B3226",
                }}>
                  {authUser.name.charAt(0).toUpperCase()}
                </span>
              )}
            </button>
          )}

          {/* Hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            style={{
              width: 34,
              height: 34,
              borderRadius: "6px",
              background: "transparent",
              border: "none",
              color: "#ffffff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleMobileMenuToggle}
          >
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="2" y1="2" x2="20" y2="2" />
              <line x1="2" y1="8" x2="20" y2="8" />
              <line x1="2" y1="14" x2="20" y2="14" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden"
          style={{
            background: "#0f261b",
            borderBottom: "1px solid rgba(201,168,76,0.2)",
            padding: "10px 16px 16px",
            position: "relative",
            zIndex: 60,
            pointerEvents: "auto",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {navLinks.map((link) => (
              <div key={link.label}>
                {link.hasDropdown ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Link
                      href={link.href}
                      onClick={() => { setMobileMenuOpen(false); setAboutOpenMobile(false); }}
                      style={{ display: "block", padding: "8px 0", fontFamily: "var(--font-inria), serif", fontWeight: 700, fontSize: "15px", color: "rgba(255,255,255,0.9)", textDecoration: "none" }}
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setAboutOpenMobile((v) => !v)}
                      aria-label={aboutOpenMobile ? "Collapse About menu" : "Expand About menu"}
                      style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.9)", fontSize: "12px", padding: "8px 0 8px 12px", cursor: "pointer" }}
                    >
                      <span style={{ display: "inline-block", transform: aboutOpenMobile ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{ display: "block", padding: "8px 0", fontFamily: "var(--font-inria), serif", fontWeight: 700, fontSize: "15px", color: "rgba(255,255,255,0.9)", textDecoration: "none" }}
                  >
                    {link.label}
                  </Link>
                )}

                {link.hasDropdown && aboutOpenMobile && (
                  <div style={{ paddingLeft: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    {aboutDropdown.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => { setMobileMenuOpen(false); setAboutOpenMobile(false); }}
                        style={{ display: "block", padding: "6px 0", fontFamily: "var(--font-inria), serif", fontWeight: 600, fontSize: "14px", color: "rgba(201,168,76,0.9)", textDecoration: "none" }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Login/Signup buttons — only when NOT logged in */}
          {!authUser && (
            <div style={{ marginTop: "14px", display: "flex", gap: "10px" }}>
              <Link
                href={loginHref}
                onClick={() => setMobileMenuOpen(false)}
                style={{ flex: 1, fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 600, fontSize: "14px", lineHeight: "20px", color: "#1B3226", backgroundColor: "#c9a84c", borderRadius: "9999px", padding: "10px 14px", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                Login
              </Link>
              <Link
                href={signupHref}
                onClick={() => setMobileMenuOpen(false)}
                style={{ flex: 1, fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 600, fontSize: "14px", lineHeight: "20px", color: "#FFFFFF", backgroundColor: "transparent", border: "1.5px solid #c9a84c", borderRadius: "9999px", padding: "10px 14px", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}

      {aboutDropdownEl}
      {userDropdownEl}
    </>
  );
}