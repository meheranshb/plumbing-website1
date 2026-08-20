import Reveal from "./Reveal";

type Shot = {
  src: string;
  alt: string;
  label: string;
  cap: string;
  cls: string;
};

const SHOTS: Shot[] = [
  {
    src: "/images/trench-pipe.jpg",
    alt: "Plumber standing in an excavated trench with PVC sewer line",
    label: "01 / MAIN LINE",
    cap: "Sewer line tie-in, Sebring",
    cls: "md:col-span-5 md:row-span-2",
  },
  {
    src: "/images/technician-sink.jpg",
    alt: "Technician installing a reverse osmosis filter under a bathroom sink",
    label: "02 / UNDER SINK",
    cap: "RO filter service, Waldo",
    cls: "md:col-span-7 md:row-span-2",
  },
  {
    src: "/images/water-heater.jpg",
    alt: "New water heater installed in a residential garage",
    label: "03 / WATER HEATER",
    cap: "50-gal gas swap, Avon Park",
    cls: "md:col-span-4",
  },
  {
    src: "/images/septic-tank.jpg",
    alt: "Technician inspecting a septic tank from above",
    label: "04 / SEPTIC",
    cap: "Field line inspection",
    cls: "md:col-span-3",
  },
  {
    src: "/images/team-van.jpg",
    alt: "Plumbing crew loading the service van in the morning",
    label: "05 / ROLL-OUT",
    cap: "6 AM dispatch — stocked truck, clean boots",
    cls: "md:col-span-7",
  },
];

export default function Gallery() {
  return (
    <section id="work" className="relative py-24 sm:py-32 bg-deep/40 border-y border-line/60 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.32em] text-aqua mb-4">// IN THE FIELD</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight leading-[1.05]">
              Real jobs.
              <br />
              <span className="text-mist">No stock photos.</span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="text-dim text-sm max-w-xs md:text-right">
              Shot by our crews between jobs across central Florida — from under-sinks to
              six-foot trenches.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[240px] sm:auto-rows-[270px] gap-4">
          {SHOTS.map((s, i) => (
            <Reveal key={s.src} delay={i * 80} className={`${s.cls} col-span-1`}>
              <figure className="kb-wrap group relative h-full w-full overflow-hidden rounded-xl border border-line">
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  className="kb-img absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <span className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.25em] text-foam/90 bg-ink/60 backdrop-blur border border-line rounded-full px-3 py-1">
                  {s.label}
                </span>
                <figcaption className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                  <span className="font-display text-[15px] font-semibold text-foam">
                    {s.cap}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-aqua opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M9 3v18M3 9l6-6 6 6M15 21V9m-6 12 6-6" opacity="0" />
                    <path d="M4 20 20 4M9 4h11v11" />
                  </svg>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
