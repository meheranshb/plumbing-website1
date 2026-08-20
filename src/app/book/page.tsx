import type { Metadata } from "next";
import { Suspense } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import Reveal from "@/components/Reveal";
import { BUSINESS } from "@/lib/data";
import { IconPhone } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Book a Service",
  description:
    "Book a plumbing service in Sebring and central Florida in under a minute. Pick your service, day, and window — we confirm by text.",
};

const FAQS = [
  {
    q: "What if I need it sooner than my window?",
    a: `Call ${BUSINESS.phone1}. Emergencies jump the queue — we dispatch 24/7 and flag your ticket as priority on the board.`,
  },
  {
    q: "Is there a call-out fee?",
    a: "A flat diagnostic applies to standard visits and is applied directly to your repair if you approve the work. Emergencies get a straight price on the phone.",
  },
  {
    q: "Can I change or cancel?",
    a: "Free, no questions — up to 2 hours before your window. Just call and tell us. We hold your slot against a real tech's schedule, so earlier is better.",
  },
];

export default function BookPage() {
  return (
    <>
      <Nav />
      <main className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg grid-fade" aria-hidden="true" />
        <div className="absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-aqua/10 blur-[130px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 pt-36 sm:pt-44 pb-24">
          <Reveal>
            <p className="font-mono text-[10.5px] tracking-[0.3em] text-dim">
              HOME <span className="text-aqua">/</span> BOOK A SERVICE
            </p>
            <div className="mt-5 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight leading-[1.03] max-w-2xl">
                Lock in your window.
                <br />
                <span className="text-mist">We'll do the wrenching.</span>
              </h1>
              <a
                href={`tel:${BUSINESS.tel1}`}
                className="inline-flex items-center gap-2.5 self-start lg:self-auto rounded-lg border border-line bg-panel/60 px-5 py-3.5 font-mono text-[13px] text-foam hover:border-aqua/50 hover:text-aqua transition-colors"
              >
                <IconPhone className="w-4 h-4 text-aqua" />
                Prefer a human? 863-991-5702
              </a>
            </div>
          </Reveal>

          <div className="mt-14">
            <Suspense
              fallback={
                <div className="grid place-items-center py-32 text-dim">
                  <span className="w-8 h-8 border-2 border-line border-t-aqua rounded-full animate-spin" />
                </div>
              }
            >
              <BookingForm />
            </Suspense>
          </div>

          <div className="mt-24">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.32em] text-aqua mb-8">// BEFORE YOU ASK</p>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-4">
              {FAQS.map((f, i) => (
                <Reveal key={f.q} delay={i * 100}>
                  <div className="h-full rounded-xl border border-line bg-panel/50 p-6 hover:border-aqua/40 transition-colors">
                    <p className="font-display text-[15.5px] font-semibold leading-snug">{f.q}</p>
                    <p className="mt-3 text-[13.5px] text-mist leading-relaxed">{f.a}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
