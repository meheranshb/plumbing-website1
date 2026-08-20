"use client";

import { useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BUSINESS, SERVICES, TIME_SLOTS, URGENCIES } from "@/lib/data";
import { digitsOnly, todayISO, cx } from "@/lib/utils";
import {
  IconBolt,
  IconCheck,
  IconDrop,
  IconPhone,
  ServiceIcons,
} from "./Icons";

const URGENCY_STYLE: Record<string, string> = {
  standard: "text-mist border-line",
  asap: "text-warn border-warn/50 bg-warn/10",
  emergency: "text-danger border-danger/50 bg-danger/10",
};

export default function BookingForm() {
  const params = useSearchParams();
  const preselect = params.get("service");

  const [service, setService] = useState(
    SERVICES.find((s) => s.id === preselect)?.name ?? ""
  );
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [urgency, setUrgency] = useState("standard");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Sebring");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [netError, setNetError] = useState("");

  const barcode = useMemo(
    () => Array.from({ length: 30 }, () => 1 + Math.floor(Math.random() * 3)),
    []
  );

  const serviceObj = SERVICES.find((s) => s.name === service);
  const slotValue = urgency === "emergency" ? "ASAP — 24/7" : slot;

  function pickUrgency(id: string) {
    setUrgency(id);
    setSlot("");
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!service) e.service = "Pick a service so we load the right truck.";
    if (!date) e.date = "Choose a day.";
    else if (urgency !== "emergency" && date < todayISO()) e.date = "That day already passed.";
    if (!slot && urgency !== "emergency") e.slot = "Pick a window (or call for something earlier).";
    if (name.trim().length < 2) e.name = "We need a name for the ticket.";
    if (digitsOnly(phone).length < 10) e.phone = "A 10-digit number, so the tech can text you.";
    if (email && !/^\S+@\S+\.\S+$/.test(email)) e.email = "That email looks off.";
    if (address.trim().length < 5) e.address = "Street address is required.";
    if (!city.trim()) e.city = "City required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    setNetError("");
    if (!validate()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service,
          date,
          timeSlot: slotValue,
          urgency,
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || null,
          address: address.trim(),
          city: city.trim(),
          notes: notes.trim() || null,
        }),
      });
      const data = await res.json();
      if (data.ok) setDone(data.ref);
      else setNetError(data.error ?? "Something went wrong — please call us instead.");
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
          <h2 className="mt-6 font-display text-3xl sm:text-4xl font-bold">You're on the board.</h2>
          <p className="mt-3 text-mist text-[15px] max-w-md mx-auto leading-relaxed">
            {urgency === "emergency"
              ? "Emergency flagged — we're calling you back right now. If it's serious, hang up the form and dial the emergency line."
              : "We'll confirm your window by text within 15 minutes during business hours (and a lot faster than that at night)."}
          </p>
          <div className="mt-7 inline-flex flex-col items-center gap-1 rounded-xl border border-line bg-deep px-10 py-5">
            <span className="font-mono text-[10px] tracking-[0.3em] text-dim">YOUR TICKET</span>
            <span className="font-mono text-3xl sm:text-4xl font-bold text-aqua tracking-[0.12em] text-glow">
              {done}
            </span>
          </div>
          <p className="mt-5 font-mono text-[11px] tracking-[0.14em] text-dim">
            {service.toUpperCase()} · {date} · {slotValue.toUpperCase()}
          </p>
          <div className="mt-8 grid sm:grid-cols-3 gap-3 text-left">
            {[
              ["1. We confirm", "Text or call with your tech's name"],
              ["2. We dispatch", "Truck stocked, window locked"],
              ["3. We fix it", "Price approved first, in writing"],
            ].map(([t, d]) => (
              <div key={t} className="rounded-lg border border-line bg-deep/70 p-4">
                <p className="font-display text-[13.5px] font-semibold text-aqua">{t}</p>
                <p className="mt-1 text-[12px] text-dim leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <a
              href={`tel:${BUSINESS.tel1}`}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-ember px-6 py-3.5 font-bold text-ink hover:bg-ember-deep transition-colors"
            >
              <IconPhone className="w-4.5 h-4.5" /> Need us sooner? Call
            </a>
            <button
              onClick={() => setDone(null)}
              className="inline-flex items-center justify-center rounded-lg border border-line px-6 py-3.5 font-semibold text-mist hover:border-aqua/50 hover:text-aqua transition-colors"
            >
              Book another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-5 gap-8 items-start">
      {/* form */}
      <form onSubmit={submit} noValidate className="lg:col-span-3 flex flex-col gap-7">
        <div>
          <p className="font-mono text-[11px] tracking-[0.26em] text-dim mb-3">
            01 · WHAT NEEDS FIXING
          </p>
          <div className="grid sm:grid-cols-2 gap-2">
            {SERVICES.map((s) => {
              const Icon = ServiceIcons[s.icon];
              const active = service === s.name;
              return (
                <button
                  type="button"
                  key={s.id}
                  onClick={() => setService(s.name)}
                  className={cx(
                    "flex items-center gap-3 rounded-lg border px-3.5 py-3 text-left transition-all",
                    active
                      ? "border-aqua bg-aqua/10 text-foam"
                      : "border-line bg-deep/60 text-mist hover:border-aqua/40"
                  )}
                >
                  <Icon className={cx("w-5 h-5 shrink-0", active ? "text-aqua" : "text-dim")} />
                  <span className="text-[13px] font-medium leading-tight">{s.name}</span>
                </button>
              );
            })}
          </div>
          {errors.service && <p className="mt-2 text-[12.5px] text-danger">{errors.service}</p>}
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-[0.26em] text-dim mb-3">02 · URGENCY</p>
          <div className="grid sm:grid-cols-3 gap-2">
            {URGENCIES.map((u) => {
              const active = urgency === u.id;
              return (
                <button
                  type="button"
                  key={u.id}
                  onClick={() => pickUrgency(u.id)}
                  className={cx(
                    "rounded-lg border px-4 py-3.5 text-left transition-all",
                    active
                      ? u.id === "emergency"
                        ? "border-danger bg-danger/10"
                        : u.id === "asap"
                          ? "border-warn bg-warn/10"
                          : "border-aqua bg-aqua/10"
                      : "border-line bg-deep/60 hover:border-aqua/40"
                  )}
                >
                  <span
                    className={cx(
                      "flex items-center gap-1.5 font-semibold text-[14px]",
                      u.id === "emergency" ? "text-danger" : u.id === "asap" ? "text-warn" : ""
                    )}
                  >
                    {u.id === "emergency" && <IconBolt className="w-3.5 h-3.5" />}
                    {u.label}
                  </span>
                  <span className="block mt-1 text-[11.5px] text-dim">{u.note}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="font-mono text-[11px] tracking-[0.26em] text-dim block mb-3">
              03 · DAY
            </label>
            <input
              type="date"
              className={cx("field", errors.date && "err")}
              min={todayISO()}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              disabled={urgency === "emergency"}
            />
            {urgency === "emergency" && (
              <p className="mt-2 font-mono text-[11px] text-danger tracking-[0.08em]">
                EMERGENCY → WE COME WHENEVER
              </p>
            )}
            {errors.date && <p className="mt-2 text-[12.5px] text-danger">{errors.date}</p>}
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-[0.26em] text-dim mb-3">
              04 · WINDOW
            </p>
            <div className="flex flex-wrap gap-1.5">
              {urgency === "emergency" ? (
                <span className="inline-flex items-center rounded-lg border border-danger/50 bg-danger/10 px-3 py-2.5 text-[12.5px] font-semibold text-danger">
                  ASAP — next available tech
                </span>
              ) : (
                TIME_SLOTS.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setSlot(t)}
                    className={cx(
                      "rounded-lg border px-3 py-2.5 font-mono text-[11.5px] transition-colors",
                      slot === t
                        ? "border-aqua bg-aqua/15 text-aqua"
                        : "border-line bg-deep/60 text-mist hover:border-aqua/40"
                    )}
                  >
                    {t}
                  </button>
                ))
              )}
            </div>
            {errors.slot && <p className="mt-2 text-[12.5px] text-danger">{errors.slot}</p>}
          </div>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-[0.26em] text-dim mb-3">05 · YOUR DETAILS</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <input
                className={cx("field", errors.name && "err")}
                placeholder="Full name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
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
                autoComplete="tel"
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
                autoComplete="email"
              />
              {errors.email && <p className="mt-1.5 text-[12.5px] text-danger">{errors.email}</p>}
            </div>
            <div>
              <div className="grid grid-cols-[1fr_130px] gap-4">
                <input
                  className={cx("field", errors.address && "err")}
                  placeholder="Street address *"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  autoComplete="street-address"
                />
                <input
                  className={cx("field", errors.city && "err")}
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              {errors.address && <p className="mt-1.5 text-[12.5px] text-danger">{errors.address}</p>}
            </div>
          </div>
          <div className="mt-4">
            <textarea
              className="field min-h-[90px] resize-y"
              placeholder="Anything we should know? Gate codes, shaggy dog on the property, what exactly is happening…"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
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
            className="inline-flex items-center justify-center gap-2.5 rounded-lg bg-ember px-8 py-4 font-bold text-ink hover:bg-ember-deep transition-colors disabled:opacity-60"
          >
            {busy ? (
              <>
                <span className="w-4 h-4 border-2 border-ink/30 border-t-ink rounded-full animate-spin" />
                Locking it in…
              </>
            ) : (
              <>Lock in my slot</>
            )}
          </button>
          <p className="text-[12.5px] text-dim leading-relaxed">
            No deposit. Free cancellation up to 2h before your window.{" "}
            <a href={`tel:${BUSINESS.tel1}`} className="text-aqua hover:underline">
              Prefer to call? 863-991-5702
            </a>
          </p>
        </div>
      </form>

      {/* live ticket */}
      <aside className="lg:col-span-2 lg:sticky lg:top-32">
        <div className="relative rounded-2xl border border-line bg-panel overflow-hidden">
          <div className="flex items-center justify-between px-6 pt-6">
            <span className="font-mono text-[10.5px] tracking-[0.3em] text-dim">
              SERVICE REQUEST
            </span>
            <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] text-warn">
              <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-warn animate-pulse-ring" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-warn" />
              </span>
              DRAFT
            </span>
          </div>
          <div className="px-6 py-5 space-y-3 font-mono text-[12.5px]">
            <Row k="REF" v="ASP-·····" accent />
            <Row k="SERVICE" v={service || "—"} />
            <Row k="DAY" v={date || "—"} />
            <Row k="WINDOW" v={slotValue || "—"} />
            <Row k="URGENCY" v={urgency.toUpperCase()} className={URGENCY_STYLE[urgency]} />
            <Row k="NAME" v={name || "—"} />
            <Row k="PHONE" v={phone || "—"} />
            <Row k="ADDRESS" v={`${address}${address && city ? ", " : ""}${city}`.trim() || "—"} />
          </div>
          <div className="mx-6 border-t border-dashed border-line" />
          <div className="px-6 py-5 flex items-end justify-between">
            <div>
              <p className="font-mono text-[9.5px] tracking-[0.26em] text-dim">SCAN ON ARRIVAL</p>
              <div className="mt-2 flex items-end gap-[2px] h-8">
                {barcode.map((w, i) => (
                  <span
                    key={i}
                    className="bg-foam/80"
                    style={{ width: w * 1.6, height: i % 5 === 0 ? "100%" : "82%" } as CSSProperties}
                  />
                ))}
              </div>
            </div>
            <IconDrop className="w-9 h-9 text-aqua/20" />
          </div>
          <div className="bg-deep/80 border-t border-line px-6 py-3.5 flex items-center gap-2.5">
            <IconCheck className="w-3.5 h-3.5 text-ok" />
            <p className="text-[11.5px] text-dim">
              Lands on the dispatch board the second you submit.
            </p>
          </div>
        </div>
        <Link
          href="/quote"
          className="mt-4 block rounded-xl border border-line bg-deep/60 px-5 py-4 text-[13px] text-mist hover:border-aqua/50 hover:text-aqua transition-colors"
        >
          Planning a bigger project instead? <span className="text-aqua">Request a quote →</span>
        </Link>
      </aside>
    </div>
  );
}

function Row({
  k,
  v,
  accent = false,
  className = "",
}: {
  k: string;
  v: string;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-[10px] tracking-[0.26em] text-dim shrink-0">{k}</span>
      <span
        className={cx(
          "text-right truncate",
          accent ? "text-aqua tracking-[0.14em]" : "text-foam/90",
          className
        )}
      >
        {v}
      </span>
    </div>
  );
}
