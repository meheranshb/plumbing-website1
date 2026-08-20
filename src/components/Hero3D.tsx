"use client";

import dynamic from "next/dynamic";

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 grid place-items-center">
      <div className="w-40 h-52 rounded-[45%_45%_55%_55%/60%_60%_40%_40%] bg-aqua/10 border border-aqua/25 blur-[1px]" />
    </div>
  ),
});

export default function Hero3D({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${className}`} aria-hidden="true">
      <Scene3D />
    </div>
  );
}
