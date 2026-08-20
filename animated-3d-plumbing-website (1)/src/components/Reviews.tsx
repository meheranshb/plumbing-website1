import { BUSINESS, REVIEWS, REVIEW_TOPICS } from "@/lib/data";
import { Stars } from "./Icons";
import Reveal from "./Reveal";

const AV = [
  "bg-aqua/20 text-aqua border-aqua/40",
  "bg-ember/20 text-ember border-ember/40",
  "bg-ok/20 text-ok border-ok/40",
];

export default function Reviews() {
  return (
    <section id="reviews" className="relative py-24 sm:py-32 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.32em] text-aqua mb-4">// WORD OF MOUTH</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            346 reviews. <span className="text-mist">One pattern: they come back.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-12 gap-10 lg:gap-14">
          {/* rating panel */}
          <Reveal className="lg:col-span-4">
            <div className="rounded-2xl border border-line bg-panel/60 p-8 h-fit lg:sticky lg:top-32">
              <div className="flex items-end gap-4">
                <span className="font-display text-[5.5rem] leading-none font-bold text-foam text-glow">
                  {BUSINESS.rating}
                </span>
                <div className="pb-3">
                  <Stars n={5} className="w-5 h-5" />
                  <p className="mt-2 font-mono text-[11px] tracking-[0.16em] text-dim">
                    {BUSINESS.reviews} GOOGLE REVIEWS
                  </p>
                </div>
              </div>
              <div className="mt-7 space-y-2">
                {[5, 4, 3, 2, 1].map((n) => (
                  <div key={n} className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-dim w-2.5">{n}</span>
                    <div className="h-1.5 flex-1 rounded-full bg-raise overflow-hidden">
                      <div
                        className="h-full rounded-full bg-warn"
                        style={{ width: n === 5 ? "97%" : n === 4 ? "2.5%" : "0.5%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-7 font-mono text-[10px] tracking-[0.28em] text-dim mb-3">
                WHAT CUSTOMERS MENTION
              </p>
              <div className="flex flex-wrap gap-2">
                {REVIEW_TOPICS.map((t) => (
                  <span
                    key={t.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-deep px-3 py-1.5 text-[12px] text-mist"
                  >
                    {t.label}
                    <span className="font-mono text-[10px] text-aqua">{t.count}</span>
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          {/* review cards */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            {REVIEWS.map((r, i) => (
              <Reveal key={r.name} delay={i * 120}>
                <article
                  className={`rounded-xl border border-line bg-panel/50 p-6 sm:p-8 transition-colors hover:border-aqua/40 ${
                    i === 1 ? "lg:translate-x-6" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <Stars n={r.stars} />
                    <span className="font-mono text-[10px] tracking-[0.2em] text-dim border border-line rounded-full px-2.5 py-1">
                      {r.topic.toUpperCase()}
                    </span>
                  </div>
                  <p className="mt-4 text-[15px] leading-relaxed text-foam/90">“{r.text}”</p>
                  <div className="mt-5 flex items-center gap-3">
                    <span
                      className={`grid place-items-center w-10 h-10 rounded-full border font-display font-bold text-sm ${AV[i]}`}
                    >
                      {r.name
                        .split(" ")
                        .map((w) => w[0])
                        .slice(0, 2)
                        .join("")}
                    </span>
                    <div>
                      <p className="font-semibold text-[14.5px]">{r.name}</p>
                      <p className="font-mono text-[10.5px] tracking-[0.12em] text-dim">{r.meta}</p>
                    </div>
                  </div>
                  {r.ownerReply && (
                    <div className="mt-5 ml-2 border-l-2 border-aqua/40 pl-4">
                      <p className="font-mono text-[9.5px] tracking-[0.24em] text-aqua mb-1.5">
                        RESPONSE FROM THE OWNER
                      </p>
                      <p className="text-[13.5px] text-mist leading-relaxed">{r.ownerReply}</p>
                    </div>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
