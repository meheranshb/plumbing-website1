"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BUSINESS } from "@/lib/data";
import { IconDrop, IconMenu, IconPhone, IconX } from "./Icons";

const LINKS = [
  ["Services", "/#services"],
  ["In the Field", "/#work"],
  ["Why Us", "/#why"],
  ["Reviews", "/#reviews"],
  ["Coverage", "/#area"],
] as const;

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="All Service Plumbing home">
      <span className="relative grid place-items-center w-9 h-9 rounded-lg bg-aqua/12 border border-aqua/40 group-hover:bg-aqua/20 transition-colors">
        <IconDrop className="w-4.5 h-4.5 text-aqua" />
        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-ember grid place-items-center border-2 border-ink">
          <svg viewBox="0 0 24 24" className="w-2 h-2 text-ink" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        </span>
      </span>
      {!compact && (
        <span className="leading-none">
          <span className="block font-display font-bold text-[15px] tracking-tight">
            ALL SERVICE PLUMBING
          </span>
          <span className="block font-mono text-[9.5px] tracking-[0.3em] text-aqua mt-1">
            OF CENTRAL FLORIDA
          </span>
        </span>
      )}
    </Link>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* utility strip */}
      <div className="hidden md:block border-b border-line/60 bg-ink/90 backdrop-blur">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between h-9 font-mono text-[10.5px] tracking-[0.18em] text-dim">
          <span className="flex items-center gap-2">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-ok animate-pulse-ring" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-ok" />
            </span>
            OPEN 24 HOURS — BURST LINE? WE DISPATCH TONIGHT
          </span>
          <span>{BUSINESS.address.toUpperCase()}</span>
        </div>
      </div>

      <div
        className={`transition-all duration-300 border-b ${
          scrolled
            ? "bg-ink/85 backdrop-blur-xl border-line shadow-[0_10px_40px_-20px_rgba(0,0,0,0.8)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <Logo />

          <nav className="hidden lg:flex items-center gap-1">
            {LINKS.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="px-3 py-2 text-[13.5px] font-medium text-mist hover:text-foam rounded-md hover:bg-raise/50 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={`tel:${BUSINESS.tel1}`}
              className="hidden xl:flex items-center gap-2 font-mono text-[13px] text-mist hover:text-aqua transition-colors px-2"
            >
              <IconPhone className="w-4 h-4" />
              863-991-5702
            </a>
            <Link
              href="/quote"
              className="hidden sm:inline-flex items-center rounded-lg border border-line bg-panel/60 px-4 py-2.5 text-[13.5px] font-semibold text-foam hover:border-aqua/50 hover:text-aqua transition-colors"
            >
              Get a Quote
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center rounded-lg bg-ember px-4 py-2.5 text-[13.5px] font-bold text-ink hover:bg-ember-deep transition-colors shadow-[0_8px_24px_-10px_rgba(255,138,61,0.7)]"
            >
              Book a Service
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden grid place-items-center w-10 h-10 rounded-lg border border-line text-foam"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <IconX className="w-5 h-5" /> : <IconMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* mobile panel */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height] duration-400 ease-out bg-ink/97 backdrop-blur-xl border-b border-line ${
          open ? "max-h-[420px]" : "max-h-0"
        }`}
      >
        <div className="px-5 py-5 flex flex-col gap-1">
          {LINKS.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="px-3 py-3 font-display text-lg text-foam hover:text-aqua transition-colors"
            >
              {label}
            </a>
          ))}
          <div className="flex gap-3 mt-3">
            <a
              href={`tel:${BUSINESS.tel1}`}
              className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-line py-3 font-mono text-sm text-foam"
            >
              <IconPhone className="w-4 h-4 text-aqua" /> 863-991-5702
            </a>
            <Link
              href="/quote"
              onClick={() => setOpen(false)}
              className="flex-1 flex items-center justify-center rounded-lg border border-aqua/40 py-3 font-semibold text-aqua"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
