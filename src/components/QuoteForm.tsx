"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BUSINESS, SERVICES } from "@/lib/data";
import { digitsOnly, cx } from "@/lib/utils";
import { IconCheck, IconDrop, IconPhone, IconTag } from "./Icons";

const BUDGETS = ["Under $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000 – $15,000", "$15,000+", "Not sure yet"];
const TIMELINES = ["ASAP — it's leaking", "This month", "This season", "Just planning"];
const PROPERTIES = ["Single-family home", "Multi-family / condo", "Mobile home", "Rental property", "Commercial"];

export default function QuoteForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [property, setProperty] = useState(PROPERTIES[0]);
  const [service, setService] = useState(SERVICES[0].name);
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState(BUDGETS[1]);
  const [timeline, setTimeline] = useState(TIMELINES[1]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [netError, setNetError] = useState("");

  const barcode = useMemo(() => Array.from({ length: 30 }, () => 1 + Math.floor(Math.random() * 3)), []);

  function validate() {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = "Name needed for the estimate.";
    if (digitsOnly(phone).length < 10) e.phone = "A 10-digit number where we can reach you.";
    if (email && !/^\S+@\S+\.\S+$/.test(email)) e.email = "That email looks off.";
    if (address.trim().length < 5) e.address = "Address helps us scope materials.";
    if (description.trim().length < 20)
      e.description = `A few more details, please (${Math.max(0, 20 - description.trim().length)} more characters).`;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    setNetError("");
    if (!validate()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || null,
          address: address.trim(),
          propertyType: property,
          service,
          description: description.trim(),
          budget,
          timeline,
        }),
      });
      const data = await res.json();
      if (data.ok) setDone(data.ref);
      else setNetError(data.error ?? "Something went wrong — please call us.");
    } catch {
      setNetError("Network hiccup — please try again or call 863-991-5702.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl border border-ok/40 bg-panel p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-ok to-transparent" />
          <span className="mx-auto grid place-items-center w-16 h-16 rounded-full bg-ok/15 border border-ok/50 text-ok">
            <IconCheck className="w-8 h-8" />
          </span>
          <h2 className="mt-6 font-display text-3xl sm:text-4xl font-bold">Quote request received.</h2>
          <p className="mt-3 text-mist text-[15px] max-w-md mx-auto leading-relaxed">
            A plumber (not a salesperson) will walk your scope with you and get back with numbers
            — usually within one business day, often the same afternoon.
          </p>
          <div className="mt-7 inline-flex flex-col items-center gap-1 rounded-xl border border-line bg-deep px-10 py-5">
            <span className="font-mono text-[10px] tracking-[0.3em] text-dim">ESTIMATE REF</span>
            <span className="font-mono text-3xl sm:text-4xl font-bold text-aqua tracking-[0.12em] text-glow">
              {done}
            </span>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={`tel:${BUSINESS.tel1}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-ember px-6 py-3.5 font-bold text-ink hover:bg-ember-deep transition-colors"
            >
              <IconPhone className="w-4.5 h-4.5" /> Talk it through now
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-line px-6 py-3.5 font-semibold text-mist hover:border-aqua/50 hover:text-aqua transition-colors"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-5 gap-8 items-start">
      <form onSubmit={submit} noValidate className="lg:col-span-3 flex flex-col gap-7">
        <div>
          <p className="font-mono text-[11px] tracking-[0.26em] text-dim mb-3">01 · THE PROJECT</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <select className="field" value={service} onChange={(e) => setService(e.target.value)}>
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
                <option value="Something else">Something else / not sure</option>
              </select>
            </div>
            <div>
              <select className="field" value={property} onChange={(e) => setProperty(e.target.value)}>
                {PROPERTIES.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <label className="font-mono text-[11px] tracking-[0.26em] text-dim">
                DESCRIBE THE JOB
              </label>
              <span className={cx("font-mono text-[10.5px]", description.trim().length >= 20 ? "text-ok" : "text-dim")}>
                {description.trim().length}/20
              </span>
            </div>
            <textarea
              className={cx("field min-h-[140px] resize-y", errors.description && "err")}
              placeholder="Example: 1980s galvanized lines, low pressure upstairs, considering full repipe to PEX. Two stories, approx 1,800 sq ft. Happy to send photos."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {errors.description && (
              <p className="mt-2 text-[12.5px] text-danger">{errors.description}</p>
            )}
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <div>
              <p className="font-mono text-[11px] tracking-[0.26em] text-dim mb-2 flex items-center gap-1.5">
                <IconTag className="w-3.5 h-3.5" /> BUDGET RANGE
              </p>
              <select className="field" value={budget} onChange={(e) => setBudget(e.target.value)}>
                {BUDGETS.map((b) => (
                  <option key={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.26em] text-dim mb-2">TIMELINE</p>
              <select className="field" value={timeline} onChange={(e) => setTimeline(e.target.value)}>
                {TIMELINES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-[0.26em] text-dim mb-3">02 · WHERE & WHO</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <input
                className={cx("field", errors.name && "err")}
                placeholder="Full name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="mt-1.5 text-[12.5px] text-danger">{errors.name}</p>}
            </div>
            <div>
              <input
                className={cx("field", errors.phone && "err")}
                placeholder="Phone *"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {errors.phone && <p className="mt-1.5 text-[12.5px] text-danger">{errors.phone}</p>}
            </div>
            <div>
              <input
                className={cx("field", errors.email && "err")}
                placeholder="Email (optional)"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="mt-1.5 text-[12.5px] text-danger">{errors.email}</p>}
            </div>
            <div>
              <input
                className={cx("field", errors.address && "err")}
                placeholder="Property address *"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              {errors.address && <p className="mt-1.5 text-[12.5px] text-danger">{errors.address}</p>}
            </div>
          </div>
        </div>

        {netError && (
          <div className="rounded-lg border border-danger/50 bg-danger/10 px-4 py-3 text-[13.5px] text-danger">
            {netError}
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <button
            type="submit"
            disabled={busy}
            className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-aqua px-8 py-4 font-bold text-ink hover:bg-aqua-deep hover:text-foam transition-colors disabled:opacity-60"
          >
            {busy ? (
              <>
                <span className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                Sending it over…
              </>
            ) : (
              <>Send quote request</>
            )}
          </button>
          <p className="text-[12.5px] text-dim leading-relaxed">
            Free, no obligation. <span className="text-mist">Fixed-price written estimates</span>{" "}
            within 1 business day.
          </p>
        </div>
      </form>

      {/* sidebar */}
      <aside className="lg:col-span-2 lg:sticky lg:top-32 flex flex-col gap-4">
        <div className="relative rounded-2xl border border-line bg-panel overflow-hidden">
          <div className="px-6 pt-6 pb-4 border-b border-dashed border-line flex items-center justify-between">
            <span className="font-mono text-[10.5px] tracking-[0.3em] text-dim">ESTIMATE SCOPE</span>
            <IconDrop className="w-6 h-6 text-aqua/25" />
          </div>
          <div className="px-6 py-5 space-y-3 font-mono text-[12.5px]">
            {[
              ["SERVICE", service],
              ["PROPERTY", property],
              ["BUDGET", budget],
              ["TIMELINE", timeline],
              ["SITE", address || "—"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4">
                <span className="text-[10px] tracking-[0.26em] text-dim shrink-0">{k}</span>
                <span className="text-right text-foam/90 truncate">{v}</span>
              </div>
            ))}
          </div>
          <div className="mx-6 border-t border-dashed border-line" />
          <div className="px-6 py-5">
            <p className="font-mono text-[9.5px] tracking-[0.26em] text-dim">REF</p>
            <p className="mt-1.5 font-mono text-2xl text-aqua tracking-[0.14em]">QT-·····</p>
            <div className="mt-3 flex items-end gap-[2px] h-7">
              {barcode.map((w, i) => (
                <span key={i} className="bg-foam/70" style={{ width: w * 1.6, height: i % 4 === 0 ? "100%" : "80%" }} />
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-line bg-deep/60 p-6">
          <p className="font-mono text-[10px] tracking-[0.26em] text-dim mb-4">WHAT MAKES A FAST QUOTE</p>
          <ul className="space-y-2.5 text-[13px] text-mist">
            {[
              "Approximate square footage or number of bathrooms",
              "Age of the home / when plumbing last touched",
              "What's happening now (drips, pressure, odors)",
              "Any photos of the area (mention them in notes)",
            ].map((t) => (
              <li key={t} className="flex gap-2.5">
                <IconCheck className="w-4 h-4 text-aqua shrink-0 mt-0.5" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/book"
          className="rounded-xl border border-ember/40 bg-ember/5 px-5 py-4 text-[13px] text-mist hover:border-ember hover:text-ember transition-colors"
        >
          Actually just need someone out there? <span className="text-ember">Book a service →</span>
        </Link>
      </aside>
    </div>
  );
}
