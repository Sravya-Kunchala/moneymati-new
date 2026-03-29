import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moneymati",
  description: "Moneymati App",
  icons: {
    icon: [
      { url: "/best%20new%20moneymati%20logo.svg", type: "image/svg+xml" },
    ],
    apple: "/best%20new%20moneymati%20logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/best%20new%20moneymati%20logo.svg" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}