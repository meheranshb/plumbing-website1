import Link from "next/link";
import { BUSINESS } from "@/lib/data";
import { IconArrow, IconPhone } from "./Icons";
import Reveal from "./Reveal";

export default function CtaBand() {
  return (
    <section className="relative py-24 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-panel via-deep to-ink" aria-hidden="true" />
      <div
        className="absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-ember/15 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 left-[-8%] h-[380px] w-[380px] rounded-full bg-aqua/12 blur-[120px]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-ember/50 bg-ember/10 px-4 py-1.5 font-mono text-[10.5px] tracking-[0.24em] text-ember">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-ember animate-pulse-ring" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-ember" />
            </span>
            OPEN NOW · 24/7
          </span>
          <h2 className="mt-6 font-display text-4xl sm:text-6xl font-bold tracking-tight leading-[1.03]">
            Water running
            <br />
            <span className="text-ember">right now?</span>
          </h2>
          <p className="mt-5 text-mist text-[15.5px] max-w-md leading-relaxed">
            Night, weekend, hurricane season — a human answers and a truck rolls. Tell us where
            it's leaking; we'll tell you the price before we start.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <div className="rounded-2xl border border-line bg-ink/60 backdrop-blur p-8 sm:p-10">
            <p className="font-mono text-[10.5px] tracking-[0.28em] text-dim">EMERGENCY LINE</p>
            <a
              href={`tel:${BUSINESS.tel1}`}
              className="mt-3 block font-display text-3xl sm:text-4xl font-bold text-foam hover:text-ember transition-colors break-all"
            >
              {BUSINESS.phone1}
            </a>
            <p className="mt-1 font-mono text-[11px] text-dim">
              SECOND LINE {BUSINESS.phone2}
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${BUSINESS.tel1}`}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-ember px-6 py-4 font-bold text-ink hover:bg-ember-deep transition-colors"
              >
                <IconPhone className="w-4.5 h-4.5" /> Call now
              </a>
              <Link
                href="/book"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-aqua/50 px-6 py-4 font-semibold text-aqua hover:bg-aqua/10 transition-colors"
              >
                Book a Service <IconArrow className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
