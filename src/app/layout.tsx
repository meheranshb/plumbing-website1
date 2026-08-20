import type { Metadata } from "next";
import type { ReactNode } from "react";
import { JetBrains_Mono, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { BUSINESS } from "@/lib/data";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const body = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  title: {
    default: `${BUSINESS.short} of Central Florida · 24/7 Plumbers in Sebring, FL`,
    template: `%s · ${BUSINESS.short}`,
  },
  description:
    "Family-run, Florida-licensed plumbers based in Sebring. Water heaters, drain jetting, repiping, leak detection, septic and sump service — open 24 hours, 4.9 stars across 346 reviews. Book online or call 863-991-5702.",
  keywords: [
    "plumber sebring fl",
    "24/7 emergency plumber central florida",
    "water heater replacement sebring",
    "drain cleaning",
    "repiping",
    "septic service",
  ],
  openGraph: {
    title: "All Service Plumbing of Central Florida",
    description:
      "Plumbing that shows up, 24/7. Licensed, insured, and rated 4.9★ by 346 Central Florida neighbors.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body">
        <div className="noise-layer" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
