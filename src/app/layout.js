import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Unidrop - Minimalist Memory Hub",
  description: "Cross-platform, minimalist memory hub organized by AI.",
};

import { Suspense } from "react";
import SideNav from "@/components/SideNav";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <meta
        name="format-detection"
        content="telephone=no, date=no, email=no, address=no"
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-on-surface`}
      >
        <Suspense fallback={null}>
          <SideNav />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
