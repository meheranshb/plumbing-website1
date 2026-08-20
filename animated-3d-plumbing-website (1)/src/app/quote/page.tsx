import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import QuoteForm from "@/components/QuoteForm";
import Reveal from "@/components/Reveal";
import { BUSINESS } from "@/lib/data";
import { IconPhone } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Free, fixed-price plumbing quotes for central Florida: repipes, water heater conversions, bath and kitchen remodels, septic and sump projects.",
};

const STEPS = [
  {
    n: "A",
    t: "We scope it",
    d: "A plumber reads your description and may call with two questions. Not a salesperson — a guy with a wrench and a bad back.",
  },
  {
    n: "B",
    t: "We walk it",
    d: "For anything above a couple of grand we come on-site. Tape measures and cameras, not guesswork and 'it depends'.",
  },
  {
    n: "C",
    t: "You get numbers",
    d: "A fixed written price with the materials listed. Valid for 30 days. No pressure, no 'today only' — the number just holds.",
  },
];

export default function QuotePage() {
  return (
    <>
      <Nav />
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg grid-fade" aria-hidden="true" />
        <div className="absolute -top-32 left-[-10%] h-[420px] w-[420px] rounded-full bg-ember/10 blur-[130px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-36 sm:pt-44 pb-24">
          <Reveal>
            <p className="font-mono text-[10.5px] tracking-[0.3em] text-dim">
              HOME <span className="text-aqua">/</span> REQUEST A QUOTE
            </p>
            <div className="mt-5 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight leading-[1.03] max-w-2xl">
                Big project?
                <br />
                <span className="text-mist">Let's price it properly.</span>
              </h1>
              <a
                href={`tel:${BUSINESS.tel1}`}
                className="inline-flex items-center gap-2.5 self-start lg:self-auto rounded-lg border border-line bg-panel/60 px-5 py-3.5 font-mono text-[13px] text-foam hover:border-aqua/50 hover:text-aqua transition-colors"
              >
                <IconPhone className="w-4 h-4 text-ember" />
                Skip the form — 863-991-5702
              </a>
            </div>
          </Reveal>

          <div className="mt-14">
            <QuoteForm />
          </div>

          <div className="mt-24">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.32em] text-aqua mb-8">
                // HOW QUOTES WORK HERE
              </p>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-4">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 100}>
                  <div className="h-full rounded-xl border border-line bg-panel/50 p-6 hover:border-aqua/40 transition-colors">
                    <span
                      className="font-display text-5xl font-bold text-transparent"
                      style={{ WebkitTextStroke: "1.5px var(--color-line)" }}
                    >
                      {s.n}
                    </span>
                    <p className="mt-4 font-display text-[16px] font-semibold">{s.t}</p>
                    <p className="mt-2.5 text-[13.5px] text-mist leading-relaxed">{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
