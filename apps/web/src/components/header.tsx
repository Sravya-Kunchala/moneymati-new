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
  { label: "Home",       href: "/" },
  { label: "Company",    href: "/About", hasDropdown: true },
  { label: "Services",   href: "/services" },
  { label: "Blog",       href: "/Blog" },
  { label: "Calculator", href: "/calucator" },
  { label: "E-Books",    href: "/e-book" },
];

const companyDropdown = [
  { label: "About",   href: "/About" },
  { label: "FAQ",     href: "/FAQ" },
  { label: "Contact", href: "/home-contact" },
  { label: "Teams",   href: "/hometeams" },
];

const loginHref  = "/signin";
const signupHref = "/signup";

/* ─── Keyframes & drawer styles injected once ─── */
const DRAWER_STYLES = `
  @keyframes mmSlideInRight {
    from { transform: translateX(100%); }
    to   { transform: translateX(0); }
  }
  @keyframes mmFadeBackdrop {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  /* Pages enter from the LEFT after a nav link is tapped */
  @keyframes mmPageEnterLeft {
    from { opacity: 0; transform: translateX(-28px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  body.mm-navigating main,
  body.mm-navigating section:first-of-type {
    animation: mmPageEnterLeft 0.28s cubic-bezier(0.32,0.72,0,1) both;
  }
  .mm-drawer {
    position: fixed;
    top: 0; right: 0; bottom: 0;
    width: min(80vw, 300px);
    background: #0f261b;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    box-shadow: -8px 0 40px rgba(0,0,0,0.5);
    animation: mmSlideInRight 0.3s cubic-bezier(0.32,0.72,0,1) both;
    overflow-y: auto;
  }
  .mm-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.55);
    z-index: 9998;
    animation: mmFadeBackdrop 0.25s ease both;
  }
  .mm-nav-item {
    display: flex;
    align-items: center;
    padding: 15px 24px;
    font-weight: 700;
    font-size: 16px;
    color: rgba(255,255,255,0.9);
    text-decoration: none;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    transition: background 0.15s, color 0.15s;
    cursor: pointer;
  }
  .mm-nav-item:hover,
  .mm-nav-item.active { color: #c9a84c; background: rgba(201,168,76,0.07); }
  .mm-sub-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 11px 24px 11px 40px;
    font-weight: 600;
    font-size: 14px;
    color: rgba(201,168,76,0.85);
    text-decoration: none;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    background: rgba(0,0,0,0.18);
    transition: background 0.15s, color 0.15s;
  }
  .mm-sub-item:hover { background: rgba(201,168,76,0.1); color: #c9a84c; }
`;

export default function Header() {
  const [companyOpen,       setCompanyOpen]       = useState(false);
  const [companyOpenMobile, setCompanyOpenMobile] = useState(false);
  const [dropdownPos,       setDropdownPos]       = useState({ top: 0, left: 0 });
  const [userMenuOpen,      setUserMenuOpen]      = useState(false);
  const [userMenuPos,       setUserMenuPos]       = useState({ top: 0, right: 0 });
  const [mobileMenuOpen,    setMobileMenuOpen]    = useState(false);
  const [mounted,           setMounted]           = useState(false);

  const chevronRef        = useRef<HTMLButtonElement>(null);
  const userBtnRef        = useRef<HTMLButtonElement>(null);
  const mobileUserBtnRef  = useRef<HTMLButtonElement>(null);

  const pathname = usePathname();
  const { data: sessionData, isPending } = authClient.useSession();
  const isActive = (href: string) => pathname === href;

  useEffect(() => { setMounted(true); }, [pathname]);
  useEffect(() => { setMobileMenuOpen(false); setCompanyOpenMobile(false); }, [pathname]);

  const sessionUser  = (sessionData as any)?.user ?? (sessionData as any)?.data?.user ?? null;
  const authUser     = !isPending && sessionUser
    ? {
        name:      sessionUser.name || sessionUser.email || "User",
        email:     sessionUser.email || "",
        avatarSrc: sessionUser.image || sessionUser.avatar || "",
      }
    : null;

  /* Close dropdowns on outside click */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const t = e.target as Node;
      if (!chevronRef.current?.contains(t) && !document.getElementById("company-dropdown")?.contains(t)) setCompanyOpen(false);
      if (!userBtnRef.current?.contains(t) && !mobileUserBtnRef.current?.contains(t) && !document.getElementById("user-dropdown")?.contains(t)) setUserMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleChevronClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (chevronRef.current) {
      const r = chevronRef.current.getBoundingClientRect();
      setDropdownPos({ top: r.bottom + 8, left: r.left - 60 });
    }
    setCompanyOpen((v) => !v);
  };

  const handleUserMenuClick = (e: React.MouseEvent, ref: { current: HTMLButtonElement | null }) => {
    e.stopPropagation();
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      setUserMenuPos({ top: r.bottom + 8, right: window.innerWidth - r.right });
    }
    setUserMenuOpen((v) => !v);
  };

  const handleLogout = async () => {
    try { await authClient.signOut(); window.location.href = "/"; }
    finally { setUserMenuOpen(false); }
  };

  /* Add .mm-navigating to body so the page-enter animation fires */
  const handleNavClick = () => {
    setMobileMenuOpen(false);
    setCompanyOpenMobile(false);
    document.body.classList.add("mm-navigating");
    setTimeout(() => document.body.classList.remove("mm-navigating"), 400);
  };

  /* ── Desktop: Company dropdown ── */
  const companyDropdownEl = mounted && companyOpen ? createPortal(
    <div id="company-dropdown" style={{ position: "fixed", top: dropdownPos.top, left: dropdownPos.left, backgroundColor: "#1a3a2a", borderRadius: "12px", padding: "8px 0", minWidth: "180px", boxShadow: "0 8px 32px rgba(0,0,0,0.45)", border: "1px solid rgba(201,168,76,0.25)", zIndex: 99999, animation: "dropFadeIn 0.18s ease both" }}>
      <style>{`@keyframes dropFadeIn { from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)} }`}</style>
      {companyDropdown.map((item) => (
        <Link key={item.label} href={item.href} onClick={() => setCompanyOpen(false)}
          style={{ display: "block", padding: "10px 20px", fontFamily: "var(--font-inria), serif", fontWeight: 700, fontSize: "14px", color: "rgba(255,255,255,0.85)", textDecoration: "none", transition: "color 0.15s, background 0.15s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color="#c9a84c"; (e.currentTarget as HTMLAnchorElement).style.background="rgba(201,168,76,0.08)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color="rgba(255,255,255,0.85)"; (e.currentTarget as HTMLAnchorElement).style.background="transparent"; }}
        >{item.label}</Link>
      ))}
    </div>,
    document.body
  ) : null;

  /* ── Desktop: User dropdown ── */
  const userDropdownEl = mounted && userMenuOpen ? createPortal(
    <div id="user-dropdown" style={{ position: "fixed", top: userMenuPos.top, right: userMenuPos.right, backgroundColor: "#fff", borderRadius: "16px", padding: "0", minWidth: "180px", maxWidth: "360px", boxShadow: "0 8px 32px rgba(0,0,0,0.18)", border: "1px solid #e5e5e5", zIndex: 99999, animation: "dropFadeIn 0.18s ease both", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 16px", borderBottom: "1.5px solid #e5e5e5", background: "#fff" }}>
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
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 1l8 8M9 1L1 9" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></svg>
        </button>
      </div>
      <Link href="/profile" onClick={() => setUserMenuOpen(false)}
        style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 18px", textDecoration: "none", borderBottom: "1px solid #f0f0f0", transition: "background 0.15s" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background="#f8f8f8"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background="transparent"; }}
      >
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 500, fontSize: "14px", color: "#222" }}>My Profile</span>
      </Link>
      <Link href="#" onClick={handleLogout}
        style={{ display: "flex", alignItems: "center", gap: "12px", padding: "14px 18px", textDecoration: "none", transition: "background 0.15s" }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background="#fff5f5"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background="transparent"; }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 600, fontSize: "14px", color: "#e53e3e" }}>Logout</span>
      </Link>
    </div>,
    document.body
  ) : null;

  /* ── Mobile drawer (portal) ── */
  const mobileDrawerEl = mounted ? createPortal(
    <>
      <style>{DRAWER_STYLES}</style>
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div className="mm-backdrop" onClick={() => setMobileMenuOpen(false)} />

          {/* Drawer slides in from RIGHT */}
          <div className="mm-drawer" style={{ fontFamily: "var(--font-inria), serif" }}>

            {/* Drawer header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid rgba(201,168,76,0.2)", flexShrink: 0 }}>
              <img src="/best new moneymati logo.svg" alt="MoneyMati" style={{ height: 72, width: 72 }} />
              <button type="button" aria-label="Close menu" onClick={() => setMobileMenuOpen(false)}
                style={{ background: "rgba(255,255,255,0.08)", border: "none", borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>

            {/* Links — page enters from LEFT on tap */}
            <nav style={{ flex: 1, overflowY: "auto" }}>
              {navLinks.map((link) => (
                <div key={link.label}>
                  {link.hasDropdown ? (
                    <>
                      <div style={{ display: "flex", alignItems: "stretch", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                        <Link href={link.href} className={`mm-nav-item${isActive(link.href) ? " active" : ""}`}
                          style={{ flex: 1, borderBottom: "none" }} onClick={handleNavClick}>
                          {link.label}
                        </Link>
                        <button type="button" onClick={() => setCompanyOpenMobile((v) => !v)}
                          style={{ background: "transparent", border: "none", borderLeft: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", padding: "0 18px", cursor: "pointer", fontSize: "13px", flexShrink: 0 }}>
                          <span style={{ display: "inline-block", transition: "transform 0.2s", transform: companyOpenMobile ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
                        </button>
                      </div>
                      {companyOpenMobile && companyDropdown.map((item) => (
                        <Link key={item.label} href={item.href} className="mm-sub-item" onClick={handleNavClick}>
                          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#c9a84c", flexShrink: 0 }} />
                          {item.label}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Link href={link.href} className={`mm-nav-item${isActive(link.href) ? " active" : ""}`} onClick={handleNavClick}>
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Bottom: user row or login/signup */}
            <div style={{ padding: "18px 20px", borderTop: "1px solid rgba(201,168,76,0.2)", flexShrink: 0 }}>
              {authUser ? (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", background: "#c9a84c", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {authUser.avatarSrc
                      ? <img src={authUser.avatarSrc} alt={authUser.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700, fontSize: "14px", color: "#1B3226" }}>{authUser.name.charAt(0).toUpperCase()}</span>
                    }
                  </div>
                  <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 600, fontSize: "14px", color: "#fff", flex: 1 }}>{authUser.name}</span>
                  <button onClick={handleLogout} style={{ background: "transparent", border: "1px solid #e53e3e", borderRadius: "9999px", padding: "6px 14px", color: "#e53e3e", fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 600, fontSize: "12px", cursor: "pointer" }}>
                    Logout
                  </button>
                </div>
              ) : (
                <div style={{ display: "flex", gap: "10px" }}>
                  <Link href={loginHref} onClick={handleNavClick}
                    style={{ flex: 1, fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 600, fontSize: "14px", color: "#1B3226", backgroundColor: "#c9a84c", borderRadius: "9999px", padding: "11px 14px", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Login
                  </Link>
                  <Link href={signupHref} onClick={handleNavClick}
                    style={{ flex: 1, fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 600, fontSize: "14px", color: "#FFFFFF", backgroundColor: "transparent", border: "1.5px solid #c9a84c", borderRadius: "9999px", padding: "11px 14px", textDecoration: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>,
    document.body
  ) : null;

  return (
    <>
      <header
        className={`w-full bg-[#122B1F] px-4 py-2 md:px-8 flex items-center justify-between md:grid md:[grid-template-columns:1fr_auto_1fr] ${inriaSerif.variable} ${dmSans.variable}`}
        style={{ position: "relative", zIndex: 50 }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
  <img src="/best new moneymati logo.svg" alt="Money Mati" style={{ height: 150, width: 150 }} />
</Link>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-7" style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {navLinks.map((link) => (
              <li key={link.label} style={{ position: "relative" }}>
                {link.hasDropdown ? (
                  <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                    <Link href={link.href}
                      style={{ fontFamily: "var(--font-inria), serif", fontWeight: isActive(link.href) ? 700 : 300, fontSize: "16px", lineHeight: "19.5px", color: isActive(link.href) ? "#FFFFFF" : "rgba(255,255,255,0.75)", textDecoration: "none", transition: "color 0.15s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color="#FFB600")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color=isActive(link.href)?"#FFFFFF":"rgba(255,255,255,0.75)")}
                    >{link.label}</Link>
                    <button ref={chevronRef} onClick={handleChevronClick}
                      style={{ background: "transparent", border: "none", cursor: "pointer", padding: "0 2px", color: isActive(link.href) ? "#FFFFFF" : "rgba(255,255,255,0.75)", display: "flex", alignItems: "center", transition: "color 0.15s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color="#FFB600")}
                      onMouseLeave={(e) => (e.currentTarget.style.color=isActive(link.href)?"#FFFFFF":"rgba(255,255,255,0.75)")}
                    >
                      <span style={{ fontSize: "12px", display: "inline-block", transition: "transform 0.2s", transform: companyOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
                    </button>
                  </div>
                ) : (
                  <Link href={link.href}
                    style={{ fontFamily: "var(--font-inria), serif", fontWeight: isActive(link.href) ? 700 : 300, fontSize: "16px", lineHeight: "19.5px", color: isActive(link.href) ? "#FFFFFF" : "rgba(255,255,255,0.75)", textDecoration: "none", transition: "color 0.15s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color="#FFB600")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color=isActive(link.href)?"#FFFFFF":"rgba(255,255,255,0.75)")}
                  >{link.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop right: auth */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: "12px", justifyContent: "flex-end" }}>
          {authUser ? (
            <button ref={userBtnRef} onClick={(e) => handleUserMenuClick(e, userBtnRef)}
              style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", padding: "4px 8px", borderRadius: "9999px", transition: "background 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background="rgba(255,255,255,0.07)")}
              onMouseLeave={(e) => (e.currentTarget.style.background="transparent")}
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
                style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 500, fontSize: "14px", color: "#1B3226", backgroundColor: "#c9a84c", borderRadius: "9999px", padding: "8px 20px", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px", transition: "background 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor="#b8963e")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor="#c9a84c")}
              >
                Login
                <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M0.791709 4.58333H10.2709" stroke="#1B3226" strokeWidth="1.58333" strokeLinecap="round" strokeLinejoin="round"/><path d="M6.75008 8.375L10.5417 4.58333L6.75008 0.791664" stroke="#1B3226" strokeWidth="1.58333" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link href={signupHref}
                style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 500, fontSize: "14px", color: "#FFFFFF", backgroundColor: "transparent", border: "1.5px solid #c9a84c", borderRadius: "9999px", padding: "8px 20px", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px", transition: "background 0.2s, color 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor="#c9a84c"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor="transparent"; }}
              >
                Sign Up
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M11.375 6.5H1.89587" stroke="white" strokeWidth="1.58333" strokeLinecap="round" strokeLinejoin="round"/><path d="M5.41667 2.70833L1.625 6.5L5.41667 10.2917" stroke="white" strokeWidth="1.58333" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
            </>
          )}
        </div>

        {/* Mobile: avatar (if logged in) + hamburger */}
        <div className="flex md:hidden" style={{ alignItems: "center", gap: "10px", justifyContent: "flex-end" }}>
          {authUser && (
            <button ref={mobileUserBtnRef} type="button" aria-label="User menu" onClick={(e) => handleUserMenuClick(e, mobileUserBtnRef)}
              style={{ width: 34, height: 34, borderRadius: "9999px", border: "2px solid #c9a84c", overflow: "hidden", background: "#c9a84c", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, padding: 0 }}>
              {authUser.avatarSrc
                ? <img src={authUser.avatarSrc} alt={authUser.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <span style={{ fontFamily: "var(--font-dm-sans), sans-serif", fontWeight: 700, fontSize: "14px", color: "#1B3226" }}>{authUser.name.charAt(0).toUpperCase()}</span>
              }
            </button>
          )}
          {/* Hamburger — opens RIGHT-side drawer */}
          <button type="button" aria-label="Open menu" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen(true)}
            style={{ width: 34, height: 34, borderRadius: "6px", background: "transparent", border: "none", color: "#ffffff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="2" y1="2" x2="20" y2="2"/>
              <line x1="2" y1="8" x2="20" y2="8"/>
              <line x1="2" y1="14" x2="20" y2="14"/>
            </svg>
          </button>
        </div>
      </header>

      {companyDropdownEl}
      {userDropdownEl}
      {mobileDrawerEl}
    </>
  );
}
