import Link from "next/link";
import Nav from "@/components/Nav";
import Hero3D from "@/components/Hero3D";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import WhySection from "@/components/WhySection";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import AreaSection from "@/components/AreaSection";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import Scramble from "@/components/Scramble";
import { Stars, IconArrow, IconPhone, IconShield, IconClock, IconGauge } from "@/components/Icons";
import { BUSINESS } from "@/lib/data";

function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-32 pb-20">
      <div className="absolute inset-0 grid-bg grid-fade" aria-hidden="true" />
      <div
        className="absolute -top-44 right-[-12%] h-[620px] w-[620px] rounded-full bg-aqua/10 blur-[150px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-22%] left-[-10%] h-[520px] w-[520px] rounded-full bg-ember/10 blur-[130px]"
        aria-hidden="true"
      />
      <Hero3D />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3">
            <span className="relative flex w-2.5 h-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-ok animate-pulse-ring" />
              <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-ok" />
            </span>
            <Scramble
              text={`SEBRING, FL · OPEN 24 HOURS · ${BUSINESS.rating}★ (${BUSINESS.reviews} REVIEWS)`}
              className="font-mono text-[10.5px] sm:text-[11px] tracking-[0.28em] text-aqua"
            />
          </p>

          <h1 className="mt-7 font-display font-bold tracking-tight leading-[1.02] text-[2.75rem] sm:text-6xl lg:text-[4.6rem]">
            <span className="mask-line">
              <span style={{ "--d": "120ms" } as React.CSSProperties}>PLUMBING THAT</span>
            </span>
            <span className="mask-line">
              <span style={{ "--d": "280ms" } as React.CSSProperties}>
                SHOWS UP<span className="text-aqua text-glow">, 24/7.</span>
              </span>
            </span>
          </h1>

          <p className="mt-7 text-mist text-[15.5px] sm:text-lg leading-relaxed max-w-lg">
            Burst line at midnight? Water heater on its last gurgle? A licensed Sebring crew
            answers, shows up inside your window, and prices the job <em className="text-foam not-italic underline decoration-aqua/60 decoration-2 underline-offset-4">before</em> a wrench turns.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/book"
              className="group inline-flex items-center gap-2.5 rounded-lg bg-ember px-7 py-4 font-bold text-ink hover:bg-ember-deep transition-colors ember-glow"
            >
              Book a Service
              <IconArrow className="w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center gap-2.5 rounded-lg border border-aqua/50 px-7 py-4 font-semibold text-aqua hover:bg-aqua/10 transition-colors"
            >
              Get a Free Quote
            </Link>
            <a
              href={`tel:${BUSINESS.tel1}`}
              className="inline-flex items-center gap-2.5 font-mono text-[14px] text-foam hover:text-aqua transition-colors px-1"
            >
              <span className="grid place-items-center w-8 h-8 rounded-lg border border-line text-aqua">
                <IconPhone className="w-4 h-4" />
              </span>
              863-991-5702
            </a>
          </div>

          <div className="mt-11 flex flex-wrap items-center gap-x-7 gap-y-3">
            <span className="flex items-center gap-2.5">
              <Stars n={5} className="w-4 h-4" />
              <span className="font-mono text-[11.5px] tracking-[0.1em] text-mist">
                {BUSINESS.rating} · {BUSINESS.reviews} REVIEWS
              </span>
            </span>
            {[
              { icon: IconShield, t: "Licensed & insured" },
              { icon: IconClock, t: "Same-day dispatch" },
              { icon: IconGauge, t: "Upfront pricing" },
            ].map(({ icon: Icon, t }) => (
              <span key={t} className="flex items-center gap-2 font-mono text-[11.5px] tracking-[0.1em] text-dim">
                <Icon className="w-4 h-4 text-aqua/70" />
                {t.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* floating dispatch card */}
      <div className="hidden xl:block absolute right-[5%] bottom-[16%] z-10 w-72 animate-float-y">
        <div className="rounded-xl border border-line bg-panel/80 backdrop-blur px-5 py-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9.5px] tracking-[0.26em] text-dim">LIVE DISPATCH</span>
            <span className="flex items-center gap-1.5 font-mono text-[9.5px] text-ok">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-ok animate-pulse-ring" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-ok" />
              </span>
              EN ROUTE
            </span>
          </div>
          <p className="mt-2.5 font-mono text-[12px] text-aqua tracking-[0.12em]">ASP-9F2K1</p>
          <p className="text-[12.5px] text-mist mt-0.5">Water heater replacement · Avon Park</p>
          <div className="mt-3 h-1 rounded-full bg-raise overflow-hidden">
            <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-aqua to-ember" />
          </div>
          <p className="mt-2 font-mono text-[10px] text-dim tracking-[0.14em]">ETA 22 MIN · TECH: B. RIVERA</p>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2">
        <span className="font-mono text-[9px] tracking-[0.34em] text-dim">SCROLL</span>
        <span className="relative h-9 w-px bg-line overflow-hidden">
          <span className="absolute left-0 top-0 w-px h-3 bg-aqua animate-drip" />
        </span>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Gallery />
        <WhySection />
        <Process />
        <Reviews />
        <AreaSection />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
