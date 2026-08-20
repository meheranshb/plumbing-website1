import type { FC, SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (props: P) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

/* ---------- service icons (hand-drawn line style) ---------- */

export const IconHeater: FC<P> = (p) => (
  <svg {...base(p)}>
    <rect x="7" y="5.5" width="10" height="14.5" rx="3.5" />
    <path d="M12 5.5V3M9.5 3h5" />
    <path d="M9.5 10.5h5" />
    <circle cx="12" cy="14.5" r="2.1" />
    <path d="M9 20v1.6M15 20v1.6" />
  </svg>
);

export const IconDrain: FC<P> = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="7.2" />
    <path d="M12 8.4a3.6 3.6 0 1 0 3.6 3.6" />
    <circle cx="12" cy="12" r="0.4" fill="currentColor" />
    <path d="M4.5 4.5 3 3M19.5 4.5 21 3" opacity="0" />
    <path d="M2 8.5c1.2.9 2.4 1.3 4 1.4M22 12.5c-1 .7-2 1-3.2 1.1" />
  </svg>
);

export const IconPipe: FC<P> = (p) => (
  <svg {...base(p)}>
    <path d="M3 8h7a5 5 0 0 1 5 5v8" />
    <path d="M3 12h6.5a3.5 3.5 0 0 1 3.5 3.5V21" />
    <path d="M3 6.5v7M10.5 21H15M8.2 8v4" />
  </svg>
);

export const IconLeak: FC<P> = (p) => (
  <svg {...base(p)}>
    <path d="M10 3.8S5.2 9.4 5.2 13a4.8 4.8 0 0 0 9.6 0C14.8 9.4 10 3.8 10 3.8Z" />
    <circle cx="16.8" cy="15.4" r="3.4" />
    <path d="m19.3 17.9 2.2 2.2" />
    <path d="M10 11.5v3M8.6 13h2.8" opacity="0.9" />
  </svg>
);

export const IconFaucet: FC<P> = (p) => (
  <svg {...base(p)}>
    <path d="M6.5 11a5.5 5.5 0 0 1 11 0" />
    <path d="M17.5 11v2.5h-3.2" />
    <path d="M8.5 11V8h7v3" />
    <path d="M12 8V5.5M10 5.5h4" />
    <path d="M14 17.2s-1 1.4-1 2.2a1 1 0 1 0 2 0c0-.8-1-2.2-1-2.2Z" />
  </svg>
);

export const IconBib: FC<P> = (p) => (
  <svg {...base(p)}>
    <circle cx="10.5" cy="12.5" r="4.6" />
    <path d="M10.5 7.9V4.8M8 4.8h5" />
    <path d="M15.1 11h4.4v3h-4.4" />
    <path d="M19.5 9.5v6" />
    <path d="M17.3 17.4s-.9 1.2-.9 2a.9.9 0 1 0 1.8 0c0-.8-.9-2-.9-2Z" />
  </svg>
);

export const IconSeptic: FC<P> = (p) => (
  <svg {...base(p)}>
    <path d="M2.5 10.5h19" />
    <path d="M5 10.5a7 6 0 0 0 14 0" />
    <path d="M16.5 10.5V7.5H21" />
    <path d="M9.8 13.2h.01M13.4 15h.01M11.8 12.2h.01" strokeWidth="2.2" />
  </svg>
);

export const IconSump: FC<P> = (p) => (
  <svg {...base(p)}>
    <path d="M2.5 9.5h19" />
    <path d="M5 9.5a7 6 0 0 0 14 0" />
    <rect x="10.4" y="10.5" width="3.4" height="4.6" rx="1" />
    <path d="M12 10.5V5.5h6.5" />
    <path d="M18.5 4.5v2M17 5.5h3" />
  </svg>
);

export const ServiceIcons: Record<string, FC<P>> = {
  heater: IconHeater,
  drain: IconDrain,
  pipe: IconPipe,
  leak: IconLeak,
  faucet: IconFaucet,
  bib: IconBib,
  septic: IconSeptic,
  sump: IconSump,
};

/* ---------- ui icons ---------- */

export const IconStar: FC<P> = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.5l-5.8 3.05 1.1-6.5-4.7-4.6 6.5-.95L12 2.6z" />
  </svg>
);

export const IconPhone: FC<P> = (p) => (
  <svg {...base(p)}>
    <path d="M5 4h4l1.5 4.5-2.2 1.6a12.5 12.5 0 0 0 5.6 5.6l1.6-2.2L20 15v4a1.9 1.9 0 0 1-2 2A16.5 16.5 0 0 1 3 6a1.9 1.9 0 0 1 2-2Z" />
  </svg>
);

export const IconClock: FC<P> = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const IconShield: FC<P> = (p) => (
  <svg {...base(p)}>
    <path d="M12 3 5 5.8v5.4c0 4.4 3 7.6 7 9.3 4-1.7 7-4.9 7-9.3V5.8L12 3Z" />
    <path d="m9 11.8 2.1 2.1L15.3 9.6" />
  </svg>
);

export const IconTruck: FC<P> = (p) => (
  <svg {...base(p)}>
    <path d="M2.5 6.5h12v10h-12z" />
    <path d="M14.5 10h4l2.5 3.5v3h-6.5" />
    <circle cx="6.5" cy="17.8" r="1.8" />
    <circle cx="17.5" cy="17.8" r="1.8" />
    <path d="M5.5 9.5h5" />
  </svg>
);

export const IconGauge: FC<P> = (p) => (
  <svg {...base(p)}>
    <path d="M4.5 18.5a8.5 8.5 0 1 1 15 0" />
    <path d="m12 14.5 3.8-5.3" />
    <circle cx="12" cy="14.8" r="1.4" />
  </svg>
);

export const IconPin: FC<P> = (p) => (
  <svg {...base(p)}>
    <path d="M12 21s-6.5-5.4-6.5-10.3a6.5 6.5 0 0 1 13 0C18.5 15.6 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.3" />
  </svg>
);

export const IconCheck: FC<P> = (p) => (
  <svg {...base(p)}>
    <path d="m4.5 12.5 5 5L19.5 6.5" />
  </svg>
);

export const IconArrow: FC<P> = (p) => (
  <svg {...base(p)}>
    <path d="M4 12h15M13.5 5.5 20 12l-6.5 6.5" />
  </svg>
);

export const IconBolt: FC<P> = (p) => (
  <svg {...base(p)}>
    <path d="M13 2.5 4.5 13.5H11l-1.5 8L18.5 10H12l1-7.5Z" />
  </svg>
);

export const IconDrop: FC<P> = (p) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2.7S5.5 10 5.5 14.7a6.5 6.5 0 0 0 13 0C18.5 10 12 2.7 12 2.7Z" />
  </svg>
);

export const IconWrench: FC<P> = (p) => (
  <svg {...base(p)}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

export const IconLock: FC<P> = (p) => (
  <svg {...base(p)}>
    <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    <path d="M12 14.5v2.5" />
  </svg>
);

export const IconMenu: FC<P> = (p) => (
  <svg {...base(p)}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </svg>
);

export const IconX: FC<P> = (p) => (
  <svg {...base(p)}>
    <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />
  </svg>
);

export const IconRefresh: FC<P> = (p) => (
  <svg {...base(p)}>
    <path d="M20 5v5h-5" />
    <path d="M20 10a8.3 8.3 0 1 0 .5 4" opacity="0" />
    <path d="M19.6 10A8 8 0 1 0 20 14" />
  </svg>
);

export const IconSearch: FC<P> = (p) => (
  <svg {...base(p)}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </svg>
);

export const IconMail: FC<P> = (p) => (
  <svg {...base(p)}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <path d="m4 7.5 8 6 8-6" />
  </svg>
);

export const IconCalendar: FC<P> = (p) => (
  <svg {...base(p)}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 9.5h17M8 3v4M16 3v4" />
  </svg>
);

export const IconUser: FC<P> = (p) => (
  <svg {...base(p)}>
    <circle cx="12" cy="8" r="3.8" />
    <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
  </svg>
);

export const IconHome: FC<P> = (p) => (
  <svg {...base(p)}>
    <path d="m3.5 10.5 8.5-7 8.5 7" />
    <path d="M5.5 9v11h13V9" />
    <path d="M10 20v-5.5h4V20" />
  </svg>
);

export const IconTag: FC<P> = (p) => (
  <svg {...base(p)}>
    <path d="M3.5 12.5v-9h9L21 12l-8.5 8.5-9-8Z" />
    <circle cx="8" cy="8" r="1.2" />
  </svg>
);

export const IconMessage: FC<P> = (p) => (
  <svg {...base(p)}>
    <path d="M4 5.5h16v11H10l-4.5 3.5v-3.5H4v-11Z" />
    <path d="M8 9.5h8M8 12.5h5" />
  </svg>
);

export function Stars({ n = 5, className = "w-4 h-4" }: { n?: number; className?: string }) {
  return (
    <span className="inline-flex gap-0.5 text-warn">
      {Array.from({ length: 5 }).map((_, i) => (
        <IconStar key={i} className={`${className} ${i < n ? "" : "opacity-25"}`} />
      ))}
    </span>
  );
}
