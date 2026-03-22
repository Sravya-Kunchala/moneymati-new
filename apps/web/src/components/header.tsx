"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/About", hasDropdown: true },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/Blog" },
  { label: "Community", href: "/community" },
  { label: "Calculator", href: "/calucator" },
  { label: "E-Books", href: "/e-book" },
];

const aboutDropdown = [
  { label: "Home Teams", href: "/hometeams" },
  { label: "Home Contact", href: "/homecontact" },
  { label: "Home FAQ", href: "/FAQ" },
];

export default function Header() {
  const [aboutOpen, setAboutOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      const isInsideBtn = btnRef.current?.contains(target);
      const isInsideDropdown = document.getElementById("about-dropdown")?.contains(target);
      if (!isInsideBtn && !isInsideDropdown) setAboutOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleAboutClick = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 8, left: rect.left });
    }
    setAboutOpen((v) => !v);
  };

  const dropdown = mounted && aboutOpen
    ? createPortal(
        <div
          id="about-dropdown"
          style={{
            position: "fixed",
            top: dropdownPos.top,
            left: dropdownPos.left,
            backgroundColor: "#1a3a2a",
            borderRadius: "12px",
            padding: "8px 0",
            minWidth: "180px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.45)",
            border: "1px solid rgba(201,168,76,0.25)",
            zIndex: 99999,
            animation: "aboutDropFadeIn 0.18s ease both",
          }}
        >
          <style>{`
            @keyframes aboutDropFadeIn {
              from { opacity: 0; transform: translateY(-8px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          {aboutDropdown.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setAboutOpen(false)}
              style={{
                display: "block",
                padding: "10px 20px",
                fontSize: "14px",
                fontWeight: 500,
                color: "rgba(255,255,255,0.85)",
                textDecoration: "none",
                transition: "color 0.15s, background 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#c9a84c";
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(201,168,76,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.85)";
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <header
        className="w-full bg-[#122B1F] px-8 py-3 flex items-center justify-between"
        style={{ position: "relative", zIndex: 50 }}
      >
        {/* Logo */}
        <div>
          <img src="/best new moneymati logo.svg" alt="Money Mati" className="h-10 w-10" />
        </div>

        {/* Nav Links */}
        <nav>
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.label} style={{ position: "relative" }}>
                {link.hasDropdown ? (
                  <button
                    ref={btnRef}
                    onClick={handleAboutClick}
                    className="text-white text-sm font-medium hover:text-yellow-400 transition-colors flex items-center gap-1 bg-transparent border-none cursor-pointer"
                  >
                    {link.label}
                    <span
                      className="text-xs transition-transform duration-200"
                      style={{ display: "inline-block", transform: aboutOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                    >
                      ▾
                    </span>
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="text-white text-sm font-medium hover:text-yellow-400 transition-colors flex items-center gap-1"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <button className="bg-[#c9a84c] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#b8963e] transition-colors">
            Login →
          </button>
          <button className="border border-[#c9a84c] text-[#c9a84c] text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#c9a84c] hover:text-white transition-colors">
            Sign In →
          </button>
        </div>
      </header>

      {/* Portal dropdown — renders directly into document.body, escapes all stacking contexts */}
      {dropdown}
    </>
  );
}