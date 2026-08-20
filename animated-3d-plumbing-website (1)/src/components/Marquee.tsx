const ITEMS = [
  "24/7 EMERGENCY DISPATCH",
  "WATER HEATER REPLACEMENT",
  "DRAIN JETTING",
  "COPPER & PEX REPIPING",
  "LEAK DETECTION",
  "SEPTIC SERVICE",
  "SUMP PUMPS",
  "HOSE BIB INSTALLS",
  "LICENSED & INSURED",
];

export default function Marquee() {
  const row = (key: string) => (
    <div key={key} className="flex items-center shrink-0">
      {ITEMS.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="font-display text-sm sm:text-base tracking-[0.22em] text-mist px-6 sm:px-8 whitespace-nowrap">
            {item}
          </span>
          <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 text-ember" fill="currentColor">
            <path d="M6 0l6 6-6 6-6-6z" />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee relative border-y border-line bg-deep/70 py-3.5 overflow-hidden">
      <div className="marquee-track">
        {row("a")}
        {row("b")}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}
