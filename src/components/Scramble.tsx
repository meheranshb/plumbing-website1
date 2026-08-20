"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "▮▯/\\|=+*<>#";

export default function Scramble({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const [out, setOut] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      return;
    }
    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started) return;
        started = true;
        io.disconnect();
        const t0 = performance.now();
        const dur = 950;
        const step = (t: number) => {
          const p = Math.min(1, Math.max(0, (t - t0 - delay) / dur));
          const reveal = Math.floor(p * text.length);
          let s = text.slice(0, reveal);
          for (let i = reveal; i < text.length; i++) {
            s += text[i] === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)];
          }
          setOut(s);
          if (p < 1) raf = requestAnimationFrame(step);
          else setOut(text);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text, delay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {out}
    </span>
  );
}
