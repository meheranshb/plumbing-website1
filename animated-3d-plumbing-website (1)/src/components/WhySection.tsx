import { BUSINESS, WHY_POINTS } from "@/lib/data";
import { IconClock, IconGauge, IconShield, IconTruck, Stars } from "./Icons";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

const ICONS = { shield: IconShield, gauge: IconGauge, truck: IconTruck, clock: IconClock };

const STATS = [
  { to: 4.9, decimals: 1, suffix: "", label: "average Google rating" },
  { to: 346, decimals: 0, suffix: "", label: "public reviews" },
  { to: 24, decimals: 0, suffix: "/7", label: "humans answer the phone" },
  { to: 100, decimals: 0, suffix: "%", label: "licensed & insured" },
];

export default function WhySection() {
  return (
    <section id="why" className="relative py-24 sm:py-32 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-12 lg:gap-16">
        {/* sticky intro + stats */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.32em] text-aqua mb-4">// WHY US</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
                The crew your neighbors
                <span className="text-mist"> text their neighbors about.</span>
              </h2>
              <p className="mt-5 text-mist text-[15px] leading-relaxed max-w-md">
                We're a family-run Sebring shop, not a franchise call center. The person who
                answers knows your street, the work is backed in writing, and nobody upsells you
                in your own hallway.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-2 gap-px rounded-xl overflow-hidden border border-line bg-line">
              {STATS.map((s, i) => (
                <div key={i} className="bg-panel p-6 sm:p-7">
                  <p className="font-display text-4xl sm:text-[2.9rem] font-bold text-aqua text-glow tabular-nums">
                    <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 font-mono text-[10.5px] tracking-[0.18em] text-dim uppercase">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* points */}
        <div className="lg:col-span-7 flex flex-col">
          {WHY_POINTS.map((p, i) => {
            const Icon = ICONS[p.icon as keyof typeof ICONS];
            return (
              <Reveal key={p.title} delay={i * 110}>
                <div
                  className={`group flex gap-5 sm:gap-7 py-7 ${
                    i > 0 ? "border-t border-line/70" : ""
                  }`}
                >
                  <span className="grid place-items-center w-13 h-13 sm:w-14 sm:h-14 shrink-0 rounded-xl border border-line bg-deep text-ember transition-all duration-300 group-hover:border-ember/50 group-hover:-rotate-6">
                    <Icon className="w-6 h-6" />
                  </span>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-display text-lg sm:text-xl font-semibold">{p.title}</h3>
                    </div>
                    <p className="mt-2 text-mist text-[14.5px] leading-relaxed max-w-xl">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}

          <Reveal delay={200}>
            <div className="mt-8 rounded-xl border border-aqua/25 bg-aqua/5 p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="flex items-center gap-3">
                <Stars n={5} className="w-4.5 h-4.5" />
                <span className="font-display font-bold text-xl">{BUSINESS.rating}</span>
              </div>
              <p className="text-mist text-[14px] leading-relaxed">
                “Very thorough. I feel confident when they do their work that it will be a good
                job with no repercussions. I highly recommend them!”
                <span className="block mt-1.5 font-mono text-[10.5px] tracking-[0.2em] text-dim">
                  — DEB HOYT, GOOGLE REVIEW
                </span>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
