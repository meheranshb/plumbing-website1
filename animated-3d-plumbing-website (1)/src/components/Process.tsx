import Link from "next/link";
import { BUSINESS, PROCESS_STEPS } from "@/lib/data";
import { IconPhone } from "./Icons";
import Reveal from "./Reveal";

export default function Process() {
  return (
    <section
      id="process"
      className="relative py-24 sm:py-32 bg-deep/40 border-y border-line/60 scroll-mt-24"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.32em] text-aqua mb-4">// HOW IT WORKS</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
                Call to wrench,
                <br />
                <span className="text-mist">three moves.</span>
              </h2>
              <p className="mt-5 text-mist text-[15px] leading-relaxed max-w-md">
                Same-day in most of central Florida. Book online in under a minute, or call a
                human — we genuinely pick up.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/book"
                  className="inline-flex items-center rounded-lg bg-ember px-6 py-3.5 text-sm font-bold text-ink hover:bg-ember-deep transition-colors"
                >
                  Book a Service
                </Link>
                <a
                  href={`tel:${BUSINESS.tel1}`}
                  className="inline-flex items-center gap-2.5 rounded-lg border border-line px-6 py-3.5 font-mono text-sm text-foam hover:border-aqua/50 hover:text-aqua transition-colors"
                >
                  <IconPhone className="w-4 h-4" />
                  863-991-5702
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="flex flex-col">
            {PROCESS_STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 130}>
                <div
                  className={`group relative grid sm:grid-cols-[auto_1fr] gap-4 sm:gap-8 py-9 ${
                    i > 0 ? "border-t border-line/70" : ""
                  }`}
                >
                  <span
                    className="font-display text-6xl sm:text-7xl font-bold text-transparent leading-none select-none"
                    style={{ WebkitTextStroke: "1.5px var(--color-line)" }}
                  >
                    {s.n}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold group-hover:text-aqua transition-colors">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-mist text-[14.5px] leading-relaxed max-w-xl">{s.body}</p>
                    <span className="mt-4 inline-block font-mono text-[10.5px] tracking-[0.2em] text-aqua border border-aqua/30 bg-aqua/5 rounded-full px-3 py-1.5">
                      {s.chip.toUpperCase()}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
