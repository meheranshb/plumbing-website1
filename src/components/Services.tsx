import Link from "next/link";
import { SERVICES } from "@/lib/data";
import { ServiceIcons, IconArrow, IconBolt } from "./Icons";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="services" className="relative py-24 sm:py-32 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.32em] text-aqua mb-4">
              // WHAT WE FIX
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.05] max-w-2xl">
              Every pipe in the house.
              <br />
              <span className="text-mist">One call.</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-dim text-sm leading-relaxed max-w-xs md:text-right">
              Flat-rate “from” pricing quoted up front — you approve the number before a wrench
              turns. Bigger jobs come with a free on-site estimate.
            </p>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {SERVICES.map((s, i) => {
            const Icon = ServiceIcons[s.icon];
            return (
              <Reveal key={s.id} delay={(i % 4) * 90} className="h-full">
                <Link
                  href={`/book?service=${s.id}`}
                  className="group relative flex h-full flex-col rounded-xl border border-line bg-panel/50 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-aqua/50 hover:bg-panel hover:shadow-[0_0_0_1px_rgba(62,205,245,0.22),0_24px_60px_-24px_rgba(62,205,245,0.4)]"
                >
                  {s.popular && (
                    <span className="absolute top-4 right-4 flex items-center gap-1 font-mono text-[9.5px] tracking-[0.18em] text-ember border border-ember/40 bg-ember/10 rounded-full px-2 py-0.5">
                      <IconBolt className="w-2.5 h-2.5" /> TOP BOOKED
                    </span>
                  )}
                  <span className="grid place-items-center w-12 h-12 rounded-lg border border-line bg-deep text-aqua transition-all duration-300 group-hover:rotate-[-6deg] group-hover:border-aqua/60 group-hover:scale-105">
                    <Icon className="w-6.5 h-6.5" />
                  </span>
                  <h3 className="mt-5 font-display text-[17px] font-semibold leading-snug">
                    {s.name}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.22em] text-dim uppercase">
                    {s.tag}
                  </p>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-mist flex-1">{s.desc}</p>
                  <div className="mt-5 pt-4 border-t border-line/70 flex items-center justify-between">
                    <span className="font-mono text-[12.5px] text-foam">
                      {s.from ? (
                        <>
                          <span className="text-dim text-[10px] mr-1.5">FROM</span>
                          ${s.from.toLocaleString()}
                        </>
                      ) : (
                        <span className="text-aqua">FREE ON-SITE ESTIMATE</span>
                      )}
                    </span>
                    <IconArrow className="w-4.5 h-4.5 text-dim transition-all duration-300 group-hover:translate-x-1 group-hover:text-aqua" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
