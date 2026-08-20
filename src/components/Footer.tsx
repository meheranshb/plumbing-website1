import Link from "next/link";
import { BUSINESS, SERVICES } from "@/lib/data";
import { IconClock, IconMail, IconPhone, IconPin, Stars } from "./Icons";
import { Logo } from "./Nav";

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-deep border-t border-line scroll-mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 sm:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-5 text-mist text-[13.5px] leading-relaxed max-w-xs">
              Family-run, Florida-licensed plumbers out of Sebring since the days of copper-only.
              4.9 stars across {BUSINESS.reviews} reviews — and we intend to keep it that way.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              <Stars n={5} className="w-4 h-4" />
              <span className="font-mono text-[11px] text-dim tracking-[0.14em]">
                {BUSINESS.rating} · {BUSINESS.reviews} REVIEWS
              </span>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-line bg-panel px-3.5 py-2 font-mono text-[10.5px] tracking-[0.16em] text-dim">
              <IconPin className="w-3.5 h-3.5 text-aqua" />
              {BUSINESS.plusCode}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-mono text-[10.5px] tracking-[0.28em] text-dim mb-5">SERVICES</h3>
            <ul className="space-y-2.5">
              {SERVICES.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/book?service=${s.id}`}
                    className="text-[13.5px] text-mist hover:text-aqua transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/book" className="text-[13.5px] text-aqua hover:underline">
                  Book something else →
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-mono text-[10.5px] tracking-[0.28em] text-dim mb-5">QUICK LINKS</h3>
            <ul className="space-y-2.5 text-[13.5px]">
              <li>
                <Link href="/book" className="text-mist hover:text-aqua transition-colors">
                  Book a Service
                </Link>
              </li>
              <li>
                <Link href="/quote" className="text-mist hover:text-aqua transition-colors">
                  Request a Quote
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-mist hover:text-aqua transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="text-mist hover:text-aqua transition-colors">
                  Reviews
                </Link>
              </li>
              </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="font-mono text-[10.5px] tracking-[0.28em] text-dim mb-5">CONTACT</h3>
            <ul className="space-y-4 text-[13.5px]">
              <li className="flex gap-3">
                <IconPhone className="w-4 h-4 mt-0.5 text-aqua shrink-0" />
                <span>
                  <a href={`tel:${BUSINESS.tel1}`} className="block text-foam hover:text-aqua transition-colors">
                    {BUSINESS.phone1}
                  </a>
                  <a href={`tel:${BUSINESS.tel2}`} className="block text-mist hover:text-aqua transition-colors">
                    {BUSINESS.phone2}
                  </a>
                </span>
              </li>
              <li className="flex gap-3 text-mist">
                <IconPin className="w-4 h-4 mt-0.5 text-aqua shrink-0" />
                <a
                  href="https://www.google.com/maps/search/?api=1&query=4305+Grand+Concourse+Sebring+FL+33875"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-aqua transition-colors leading-relaxed"
                >
                  {BUSINESS.address}
                </a>
              </li>
              <li className="flex gap-3 text-mist">
                <IconClock className="w-4 h-4 mt-0.5 text-aqua shrink-0" />
                <span>{BUSINESS.hours}</span>
              </li>
              <li className="flex gap-3 text-mist">
                <IconMail className="w-4 h-4 mt-0.5 text-aqua shrink-0" />
                <span className="font-mono text-[12.5px]">bookings@allserviceplumbing-cf.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-7 border-t border-line/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-[10.5px] tracking-[0.14em] text-dim">
            © 2026 {BUSINESS.name.toUpperCase()} · LICENSED · BONDED · INSURED
          </p>
          <p className="font-mono text-[10.5px] tracking-[0.14em] text-dim">
            SEBRING, FL — 24/7 EMERGENCY DISPATCH
          </p>
        </div>
      </div>
    </footer>
  );
}
