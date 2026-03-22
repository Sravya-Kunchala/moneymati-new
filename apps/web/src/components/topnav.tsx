"use client";

import React, { useState } from "react";

export default function TopNav() {
  const [search, setSearch] = useState("");

  return (
    <header
      style={{
        height: "56px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e8ede9",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        gap: "12px",
        fontFamily: "'DM Sans', sans-serif",
        width: "100%",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        .search-input::placeholder {
          color: #9ab09e;
        }
        .search-input:focus {
          outline: none;
          border-color: #0e3d27;
          background: #ffffff;
        }
        .icon-btn {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          cursor: pointer;
          color: #5a7060;
          transition: background 0.15s ease;
          flex-shrink: 0;
        }
        .icon-btn:hover {
          background: #f0f5f1;
        }
      `}</style>

      {/* Search bar */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "#f4f6f4",
          border: "1px solid #e4ebe5",
          borderRadius: "10px",
          padding: "0 14px",
          height: "38px",
        }}
      >
        {/* Search icon */}
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0, color: "#9ab09e" }}>
          <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5" />
          <line x1="10.5" y1="10.5" x2="13.5" y2="13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search analytics, users, or posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            border: "none",
            background: "transparent",
            fontSize: "13.5px",
            color: "#1a3a22",
            fontFamily: "'DM Sans', sans-serif",
            outline: "none",
          }}
        />
      </div>

      {/* Bell icon */}
      <div className="icon-btn">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M9 2a5 5 0 00-5 5v3l-1.5 2H15.5L14 10V7a5 5 0 00-5-5z"
            stroke="#5a7060"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M7 14a2 2 0 004 0"
            stroke="#5a7060"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* User info + avatar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          padding: "4px 8px",
          borderRadius: "10px",
          transition: "background 0.15s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f5f1")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: "13.5px",
              fontWeight: 600,
              color: "#1a3a22",
              lineHeight: "1.2",
            }}
          >
            Swathi
          </div>
          <div
            style={{
              fontSize: "10px",
              fontWeight: 600,
              color: "#9ab09e",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Admin
          </div>
        </div>

        {/* Avatar */}
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ flexShrink: 0 }}>
          <rect width="36" height="36" rx="18" fill="#0B4634" fillOpacity="0.1"/>
          <rect width="36" height="36" rx="18" fill="url(#pattern0_88_379)"/>
          <rect x="0.5" y="0.5" width="35" height="35" rx="17.5" stroke="#0B4634" strokeOpacity="0.2"/>
          <defs>
            <pattern id="pattern0_88_379" patternContentUnits="objectBoundingBox" width="0.944444" height="0.944444">
              <use xlinkHref="#image0_88_379" transform="scale(0.0138889)"/>
            </pattern>
            <image id="image0_88_379" width="68" height="68" preserveAspectRatio="none" xlinkHref="data:image/jpeg;base64,/9j/2wBDAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNH/2wBDAQgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNH/wgARCABEAEQDASIAAhEBAxEB/8QAGgABAQEBAQEBAAAAAAAAAAAAAAEEAwIFB//EABcBAQEBAQAAAAAAAAAAAAAAAAABBQb/2gAMAwEAAhADEAAAAP0ey83vgQBRFBKMevMmH6+TXQssAsoy6vkWb+nLibxLBAUPaeHXmQqwQAAAAC//xAAjEAACAQQCAgIDAAAAAAAAAAABAgMEESExABIFMBNAIEGS/9oACAEBAAE/APq1tdBRRB5ScmygbJ5R+apauURBWRzoNbPolgilmiaRQ3VXABFxm3HpacCPrEilZFYdVAyPQJo53eOJ7mN7OR+jx7xj5Xa6oCTi1hbfIpY5o0kjYMjC4I/Px1FPSy1RkZCsjdhblXHJLTTRxkBnQqCdZ546melpI4XILKW1rJ+gLALld31zsMYT+Tw79v8A/8QAGxEAAgIDAQAAAAAAAAAAAAAAAREgIQAwQVH/2gAIAQIBAT8AkE7wrkKRyk+uJA90f//EABwRAAICAwEBAAAAAAAAAAAAAAERACASIUEwYf/aAAgBAwEBPwCxa1Bl00LYm8lxUMB+eH//2Q=="/>
          </defs>
        </svg>
      </div>
    </header>
  );
}