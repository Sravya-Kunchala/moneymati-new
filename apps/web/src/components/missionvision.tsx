"use client";

import { Playfair_Display, DM_Sans } from "next/font/google";

const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

const cards = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.65834 30.4206C7.73195 29.5888 6.05625 28.4604 4.63125 27.0354C3.20625 25.6104 2.07839 23.9347 1.24767 22.0083C0.416947 20.0819 0.00105756 18.0236 2.00422e-06 15.8333C-0.00105355 13.6431 0.414835 11.5847 1.24767 9.65834C2.0805 7.73195 3.20836 6.05625 4.63125 4.63125C6.05414 3.20625 7.72984 2.07839 9.65834 1.24767C11.5868 0.416947 13.6452 0.00105756 15.8333 2.00422e-06C18.0215 -0.00105355 20.0798 0.414835 22.0083 1.24767C23.9368 2.0805 25.6125 3.20836 27.0354 4.63125C28.4583 6.05414 29.5867 7.72984 30.4206 9.65834C31.2545 11.5868 31.6698 13.6452 31.6667 15.8333C31.6635 18.0215 31.2476 20.0798 30.419 22.0083C29.5904 23.9368 28.4625 25.6125 27.0354 27.0354C25.6083 28.4583 23.9326 29.5867 22.0083 30.4206C20.0841 31.2545 18.0257 31.6698 15.8333 31.6667C13.6409 31.6635 11.5826 31.2492 9.65834 30.4206ZM24.8188 24.8188C27.2729 22.3646 28.5 19.3694 28.5 15.8333C28.5 12.2972 27.2729 9.30209 24.8188 6.84792C22.3646 4.39375 19.3694 3.16667 15.8333 3.16667C12.2972 3.16667 9.30209 4.39375 6.84792 6.84792C4.39375 9.30209 3.16667 12.2972 3.16667 15.8333C3.16667 19.3694 4.39375 22.3646 6.84792 24.8188C9.30209 27.2729 12.2972 28.5 15.8333 28.5C19.3694 28.5 22.3646 27.2729 24.8188 24.8188ZM9.10417 22.5625C7.25695 20.7153 6.33334 18.4722 6.33334 15.8333C6.33334 13.1944 7.25695 10.9514 9.10417 9.10417C10.9514 7.25695 13.1944 6.33334 15.8333 6.33334C18.4722 6.33334 20.7153 7.25695 22.5625 9.10417C24.4097 10.9514 25.3333 13.1944 25.3333 15.8333C25.3333 18.4722 24.4097 20.7153 22.5625 22.5625C20.7153 24.4097 18.4722 25.3333 15.8333 25.3333C13.1944 25.3333 10.9514 24.4097 9.10417 22.5625ZM20.3063 20.3063C21.5465 19.066 22.1667 17.575 22.1667 15.8333C22.1667 14.0917 21.5465 12.6007 20.3063 11.3604C19.066 10.1201 17.575 9.5 15.8333 9.5C14.0917 9.5 12.6007 10.1201 11.3604 11.3604C10.1201 12.6007 9.5 14.0917 9.5 15.8333C9.5 17.575 10.1201 19.066 11.3604 20.3063C12.6007 21.5465 14.0917 22.1667 15.8333 22.1667C17.575 22.1667 19.066 21.5465 20.3063 20.3063ZM13.5977 18.0706C12.977 17.4499 12.6667 16.7042 12.6667 15.8333C12.6667 14.9625 12.977 14.2173 13.5977 13.5977C14.2183 12.9781 14.9636 12.6677 15.8333 12.6667C16.7031 12.6656 17.4489 12.9759 18.0706 13.5977C18.6923 14.2194 19.0021 14.9646 19 15.8333C18.9979 16.7021 18.6881 17.4478 18.0706 18.0706C17.4531 18.6934 16.7073 19.0032 15.8333 19C14.9593 18.9968 14.2141 18.687 13.5977 18.0706Z" fill="#FFB600"/>
      </svg>
    ),
    title: "Our Mission",
    description:
      "To provide accessible, high-quality financial education that empowers women to take control of their economic destiny and bridge the gender wealth gap.",
  },
  {
    icon: (
      <svg width="35" height="23" viewBox="0 0 35 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M0 11.0833C3.211 4.50933 9.804 0 17.4167 0C25.0293 0 31.6223 4.50933 34.8333 11.0833C31.6223 17.6573 25.0293 22.1667 17.4167 22.1667C9.804 22.1667 3.211 17.6573 0 11.0833ZM17.4167 16.625C18.1444 16.625 18.865 16.4817 19.5374 16.2032C20.2097 15.9247 20.8206 15.5165 21.3352 15.0019C21.8498 14.4873 22.258 13.8764 22.5365 13.204C22.815 12.5317 22.9583 11.8111 22.9583 11.0833C22.9583 10.3556 22.815 9.63498 22.5365 8.96263C22.258 8.29029 21.8498 7.67938 21.3352 7.16478C20.8206 6.65019 20.2097 6.242 19.5374 5.9635C18.865 5.68501 18.1444 5.54167 17.4167 5.54167C15.9469 5.54167 14.5374 6.12552 13.4981 7.16478C12.4589 8.20405 11.875 9.61359 11.875 11.0833C11.875 12.5531 12.4589 13.9626 13.4981 15.0019C14.5374 16.0411 15.9469 16.625 17.4167 16.625Z" fill="#FFB600"/>
      </svg>
    ),
    title: "Our Vision",
    description:
      "A world where every woman possesses the knowledge, tools, and confidence to build lasting wealth and financial security for herself and her family.",
  },
];

export default function MissionVision() {
  return (
    <section
      className={`${playfairDisplay.variable} ${dmSans.variable}`}
      style={{
        backgroundColor: "#f5f3ee",
        paddingTop: "0px",
        paddingBottom: "0",
        fontFamily: "var(--font-dm-sans), sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Cards */}
      <div
        className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 px-6 lg:px-16"
        style={{ maxWidth: "1100px", position: "relative", zIndex: 3, marginTop: "80px" }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#064E3B",
              borderRadius: "24px",
              padding: "40px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              minHeight: "287px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "78px",
                height: "65px",
                borderRadius: "10px",
                backgroundColor: "#677E73",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {card.icon}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-playfair), serif",
                fontWeight: 700,
                fontSize: "1.2rem",
                color: "#ffffff",
                margin: 0,
              }}
            >
              {card.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.875rem",
                color: "#a8c4a8",
                lineHeight: 1.75,
                margin: 0,
              }}
            >
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* Wave dividers */}
      <div style={{ position: "relative", height: "177px", marginTop: "-80px", lineHeight: 0, overflow: "hidden", width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>

        {/* Vector 7 (back) — 30% opacity, shifted up */}
        <svg
          width="100%"
          height="177"
          viewBox="0 0 1438 177"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", top: "-15px", left: 0, zIndex: 1, opacity: 0.8 }}
        >
          <path
            d="M625.59 90.5C448.658 78.1 135.642 154.167 0 176.5L1437.5 153V0C1331.93 17.6667 1093.24 60.5 983.044 90.5C845.301 128 846.756 106 625.59 90.5Z"
            fill="#E0E0E0"
          />
        </svg>

        {/* Vector 6 (front) — full opacity */}
        <svg
          width="100%"
          height="153"
          viewBox="0 0 1440 153"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", bottom: 0, left: 0, zIndex: 2 }}
        >
          <path
            d="M628.09 90.5C451.158 78.1 135.642 119.667 0 142L1440 153V0C1334.43 17.6667 1095.74 60.5 985.544 90.5C847.801 128 849.256 106 628.09 90.5Z"
            fill="#D9D9D9"
          />
        </svg>

      </div>
    </section>
  );
}