import { BUSINESS, TOWNS } from "@/lib/data";
import { IconPin } from "./Icons";
import Reveal from "./Reveal";

export default function AreaSection() {
  return (
    <section
      id="area"
      className="relative py-24 sm:py-32 bg-deep/40 border-y border-line/60 overflow-hidden scroll-mt-24"
    >
      <div className="absolute inset-0 grid-bg grid-fade opacity-70" aria-hidden="true" />
      <div className="relative mx-auto max-w-5xl px-5 sm:px-8 text-center">
        <Reveal>
          <p className="font-mono text-[11px] tracking-[0.32em] text-aqua mb-4">// SERVICE AREA</p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            Base camp: <span className="text-ember">Sebring.</span>
          </h2>
          <p className="mt-4 text-mist text-[15px] max-w-xl mx-auto leading-relaxed">
            {BUSINESS.address}. Trucks roll out to the whole Lake — and beyond — every single
            morning.
          </p>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {TOWNS.map((t, i) => (
              <span
                key={t}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13.5px] transition-colors ${
                  i === 0
                    ? "border-ember/60 bg-ember/10 text-ember"
                    : "border-line bg-panel/50 text-mist hover:border-aqua/50 hover:text-aqua"
                }`}
              >
                <IconPin className="w-3.5 h-3.5" />
                {t}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={280}>
          <p className="mt-9 text-dim text-sm">
            Don't see your town? If it's between Ocala and Fort Myers, we probably run your street
            —{" "}
            <a href={`tel:${BUSINESS.tel1}`} className="text-aqua hover:underline font-medium">
              call {BUSINESS.phone1}
            </a>{" "}
            and ask.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
