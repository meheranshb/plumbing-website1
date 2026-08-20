"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BOOKING_STATUSES,
  QUOTE_STATUSES,
  cx,
  fmtDate,
  relTime,
  statusColor,
  telHref,
  todayISO,
} from "@/lib/utils";
import {
  IconCalendar,
  IconDrop,
  IconMail,
  IconPhone,
  IconPin,
  IconRefresh,
  IconSearch,
  IconUser,
  IconWrench,
} from "./Icons";

type Booking = {
  id: number;
  ref: string;
  name: string;
  phone: string;
  email: string | null;
  address: string;
  city: string;
  service: string;
  date: string;
  timeSlot: string;
  urgency: string;
  notes: string | null;
  status: string;
  createdAt: string;
};

type Quote = {
  id: number;
  ref: string;
  name: string;
  phone: string;
  email: string | null;
  address: string | null;
  propertyType: string | null;
  service: string;
  description: string;
  budget: string | null;
  timeline: string | null;
  status: string;
  createdAt: string;
};

const URGENCY_BADGE: Record<string, string> = {
  emergency: "text-danger border-danger/50 bg-danger/10",
  asap: "text-warn border-warn/50 bg-warn/10",
  standard: "text-dim border-line bg-raise/40",
};

const TOKEN_KEY = "asp_staff_token";

/** Cookie is primary; the signed token header is a fallback for browsers
 *  that drop the httpOnly cookie (plain-HTTP previews, proxies). */
function staffHeaders(): Record<string, string> {
  try {
    const t = window.sessionStorage.getItem(TOKEN_KEY);
    return t ? { "x-staff-token": t } : {};
  } catch {
    return {};
  }
}

export default function DashboardClient() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"bookings" | "quotes">("bookings");
  const [filter, setFilter] = useState("all");
  const [quoteFilter, setQuoteFilter] = useState("all");
  const [q, setQ] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [toast, setToast] = useState("");
  const [spinning, setSpinning] = useState(false);
  const toastTimer = useRef<number | null>(null);

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    try {
      const [b, qt] = await Promise.all([
        fetch("/api/staff/bookings", { headers: staffHeaders() }).then((r) =>
          r.ok ? r.json() : { bookings: [] }
        ),
        fetch("/api/staff/quotes", { headers: staffHeaders() }).then((r) =>
          r.ok ? r.json() : { quotes: [] }
        ),
      ]);
      setBookings(b.bookings ?? []);
      setQuotes(qt.quotes ?? []);
    } catch {
      /* keep previous data */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const iv = window.setInterval(() => load(true), 30000);
    return () => window.clearInterval(iv);
  }, [load]);

  function ping(msg: string) {
    setToast(msg);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2600);
  }

  async function updateStatus(kind: "booking" | "quote", id: number, status: string) {
    const list = kind === "booking" ? bookings : quotes;
    const item = list.find((x) => x.id === id);
    if (!item) return;
    const prev = item.status;
    setBookings((bs) => bs.map((b) => (b.id === id ? { ...b, status } : b)));
    setQuotes((qs) => qs.map((x) => (x.id === id ? { ...x, status } : x)));
    try {
      const res = await fetch(`/api/staff/${kind === "booking" ? "bookings" : "quotes"}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", ...staffHeaders() },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
      ping(`${item.ref} → ${status.toUpperCase()}`);
    } catch {
      setBookings((bs) => bs.map((b) => (b.id === id ? { ...b, status: prev } : b)));
      setQuotes((qs) => qs.map((x) => (x.id === id ? { ...x, status: prev } : x)));
      ping("Update failed — retrying will work.");
    }
  }

  async function signout() {
    try {
      window.sessionStorage.removeItem(TOKEN_KEY);
    } catch {
      /* ignore */
    }
    await fetch("/api/staff/logout", { method: "POST" });
    router.refresh();
    router.push("/dashboard");
  }

  const today = todayISO();
  const stats = useMemo(() => {
    const weekAgo = Date.now() - 7 * 86400000;
    return {
      pending: bookings.filter((b) => b.status === "pending").length,
      todayJobs: bookings.filter(
        (b) => b.date === today && (b.status === "confirmed" || b.status === "dispatched")
      ).length,
      openQuotes: quotes.filter((x) => ["new", "contacted", "proposed"].includes(x.status)).length,
      done7d: bookings.filter(
        (b) => b.status === "completed" && new Date(b.createdAt).getTime() > weekAgo
      ).length,
    };
  }, [bookings, quotes, today]);

  const matches = (x: Booking | Quote) => {
    const s = q.trim().toLowerCase();
    if (!s) return true;
    return [x.name, x.phone, x.ref, "address" in x ? x.address : ""].join(" ").toLowerCase().includes(s);
  };

  const visibleBookings = useMemo(() => {
    return bookings
      .filter((b) => (filter === "all" ? true : b.status === filter) && matches(b))
      .sort((a, b) => (a.date === b.date ? b.id - a.id : a.date < b.date ? -1 : 1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookings, filter, q]);

  const visibleQuotes = useMemo(() => {
    return quotes
      .filter((x) => (quoteFilter === "all" ? true : x.status === quoteFilter) && matches(x))
      .sort((a, b) => b.id - a.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quotes, quoteFilter, q]);

  const bookingCounts = useMemo(() => {
    const c: Record<string, number> = { all: bookings.length };
    for (const s of BOOKING_STATUSES) c[s] = bookings.filter((b) => b.status === s).length;
    return c;
  }, [bookings]);

  const quoteCounts = useMemo(() => {
    const c: Record<string, number> = { all: quotes.length };
    for (const s of QUOTE_STATUSES) c[s] = quotes.filter((b) => b.status === s).length;
    return c;
  }, [quotes]);

  const activeFilter = tab === "bookings" ? filter : quoteFilter;
  const setActiveFilter = tab === "bookings" ? setFilter : setQuoteFilter;
  const activeCounts = tab === "bookings" ? bookingCounts : quoteCounts;
  const activeStatuses = tab === "bookings" ? BOOKING_STATUSES : QUOTE_STATUSES;
  const activeList = tab === "bookings" ? visibleBookings : visibleQuotes;

  return (
    <div className="min-h-screen bg-ink">
      {/* header */}
      <header className="sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid place-items-center w-9 h-9 rounded-lg bg-aqua/12 border border-aqua/40">
              <IconWrench className="w-4.5 h-4.5 text-aqua" />
            </span>
            <div className="leading-tight">
              <p className="font-display font-bold text-[15px]">Dispatch Center</p>
              <p className="font-mono text-[9.5px] tracking-[0.26em] text-dim">
                ALL SERVICE PLUMBING · {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }).toUpperCase()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSpinning(true);
                load(true);
                window.setTimeout(() => setSpinning(false), 700);
              }}
              className="grid place-items-center w-9 h-9 rounded-lg border border-line text-mist hover:text-aqua hover:border-aqua/50 transition-colors"
              aria-label="Refresh"
            >
              <IconRefresh className={cx("w-4 h-4", spinning && "animate-spin")} />
            </button>
            <Link
              href="/"
              className="hidden sm:inline-flex items-center rounded-lg border border-line px-4 py-2 text-[12.5px] font-semibold text-mist hover:border-aqua/50 hover:text-aqua transition-colors"
            >
              View site
            </Link>
            <button
              onClick={signout}
              className="inline-flex items-center rounded-lg border border-line px-4 py-2 text-[12.5px] font-semibold text-mist hover:border-danger/60 hover:text-danger transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-8 py-8">
        {/* stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "PENDING APPROVAL", value: stats.pending, tone: "text-warn" },
            { label: "ON THE BOARD TODAY", value: stats.todayJobs, tone: "text-aqua" },
            { label: "OPEN QUOTES", value: stats.openQuotes, tone: "text-ember" },
            { label: "COMPLETED · 7 DAYS", value: stats.done7d, tone: "text-ok" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-line bg-panel/60 px-5 py-4">
              <p className={cx("font-display text-3xl sm:text-4xl font-bold tabular-nums", s.tone)}>
                {s.value}
              </p>
              <p className="mt-1 font-mono text-[9.5px] tracking-[0.2em] text-dim">{s.label}</p>
            </div>
          ))}
        </div>

        {/* tabs + controls */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="inline-flex self-start rounded-xl border border-line bg-deep p-1">
            {(["bookings", "quotes"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cx(
                  "rounded-lg px-5 py-2.5 text-[13.5px] font-semibold capitalize transition-colors",
                  tab === t ? "bg-ember text-ink" : "text-mist hover:text-foam"
                )}
              >
                {t}
                <span
                  className={cx(
                    "ml-2 font-mono text-[10.5px] px-1.5 py-0.5 rounded-full",
                    tab === t ? "bg-ink/15 text-ink" : "bg-raise text-dim"
                  )}
                >
                  {t === "bookings" ? bookings.length : quotes.length}
                </span>
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-72">
            <IconSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dim" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, phone, ref…"
              className="field pl-10"
            />
          </div>
        </div>

        {/* filter chips */}
        <div className="mt-4 flex flex-wrap gap-2">
          {["all", ...activeStatuses].map((s) => (
            <button
              key={s}
              onClick={() => setActiveFilter(s)}
              className={cx(
                "rounded-full border px-3.5 py-1.5 text-[12px] font-medium capitalize transition-colors",
                activeFilter === s
                  ? "border-aqua bg-aqua/15 text-aqua"
                  : "border-line text-dim hover:text-mist hover:border-aqua/40"
              )}
            >
              {s}
              <span className="ml-1.5 font-mono text-[10px] opacity-70">{activeCounts[s] ?? 0}</span>
            </button>
          ))}
        </div>

        {/* list */}
        {loading ? (
          <div className="mt-10 grid place-items-center py-24 text-dim">
            <span className="w-8 h-8 border-2 border-line border-t-aqua rounded-full animate-spin" />
            <p className="mt-4 font-mono text-[11px] tracking-[0.26em]">LOADING THE BOARD…</p>
          </div>
        ) : activeList.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-dashed border-line py-20 text-center">
            <IconDrop className="w-8 h-8 text-dim mx-auto" />
            <p className="mt-4 font-display text-xl font-semibold text-mist">
              {q || activeFilter !== "all" ? "Nothing matches that filter." : "The board is clear."}
            </p>
            <p className="mt-2 text-[13px] text-dim">
              {q || activeFilter !== "all"
                ? "Try clearing the search or picking another status."
                : tab === "bookings"
                  ? "New customer bookings land here the second they're submitted."
                  : "Quote requests from the website appear here."}
            </p>
          </div>
        ) : (
          <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {tab === "bookings"
              ? visibleBookings.map((b) => (
                  <BookingCard
                    key={b.id}
                    b={b}
                    expanded={expanded === b.id}
                    onExpand={() => setExpanded(expanded === b.id ? null : b.id)}
                    onStatus={(s) => updateStatus("booking", b.id, s)}
                  />
                ))
              : visibleQuotes.map((x) => (
                  <QuoteCard
                    key={x.id}
                    x={x}
                    expanded={expanded === x.id}
                    onExpand={() => setExpanded(expanded === x.id ? null : x.id)}
                    onStatus={(s) => updateStatus("quote", x.id, s)}
                  />
                ))}
          </div>
        )}
      </main>

      {/* toast */}
      <div
        className={cx(
          "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
          toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <div className="rounded-lg border border-aqua/40 bg-panel px-5 py-3 font-mono text-[12.5px] text-aqua shadow-[0_10px_40px_-10px_rgba(62,205,245,0.4)]">
          {toast}
        </div>
      </div>
    </div>
  );
}

function StatusSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: readonly string[];
  onChange: (s: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cx(
        "rounded-lg border bg-deep px-2.5 py-1.5 text-[12px] font-semibold capitalize outline-none cursor-pointer",
        statusColor(value)
      )}
      aria-label="Update status"
    >
      {options.map((o) => (
        <option key={o} value={o} className="bg-deep text-foam">
          {o}
        </option>
      ))}
    </select>
  );
}

function BookingCard({
  b,
  expanded,
  onExpand,
  onStatus,
}: {
  b: Booking;
  expanded: boolean;
  onExpand: () => void;
  onStatus: (s: string) => void;
}) {
  return (
    <article
      className={cx(
        "flex flex-col rounded-xl border bg-panel/60 p-5 transition-colors",
        b.urgency === "emergency" && b.status !== "completed" && b.status !== "cancelled"
          ? "border-danger/50"
          : "border-line hover:border-aqua/40"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[12px] tracking-[0.14em] text-aqua">{b.ref}</span>
        <div className="flex items-center gap-2">
          <span
            className={cx(
              "font-mono text-[9.5px] tracking-[0.18em] border rounded-full px-2 py-0.5 uppercase",
              URGENCY_BADGE[b.urgency] ?? URGENCY_BADGE.standard
            )}
          >
            {b.urgency}
          </span>
          <StatusSelect value={b.status} options={BOOKING_STATUSES} onChange={onStatus} />
        </div>
      </div>

      <h3 className="mt-3.5 font-display text-[16.5px] font-semibold leading-snug">{b.service}</h3>
      <div className="mt-3 space-y-2 text-[13px] text-mist">
        <p className="flex items-center gap-2">
          <IconUser className="w-3.5 h-3.5 text-dim shrink-0" /> {b.name}
          <a href={telHref(b.phone)} className="font-mono text-[12px] text-aqua hover:underline">
            {b.phone}
          </a>
        </p>
        <p className="flex items-center gap-2">
          <IconCalendar className="w-3.5 h-3.5 text-dim shrink-0" />
          <span className="text-foam/90">{fmtDate(b.date)}</span>
          <span className="font-mono text-[11px] text-dim">· {b.timeSlot}</span>
        </p>
        <p className="flex items-start gap-2">
          <IconPin className="w-3.5 h-3.5 text-dim shrink-0 mt-0.5" />
          {b.address}, {b.city}
        </p>
        {b.email && (
          <p className="flex items-center gap-2">
            <IconMail className="w-3.5 h-3.5 text-dim shrink-0" />
            <span className="truncate">{b.email}</span>
          </p>
        )}
      </div>

      {b.notes && (
        <div className="mt-3 rounded-lg bg-deep/70 border border-line/70 px-3.5 py-2.5">
          <p className={cx("text-[12.5px] text-mist leading-relaxed", !expanded && "line-clamp-2")}>
            “{b.notes}”
          </p>
          <button onClick={onExpand} className="mt-1 font-mono text-[10px] tracking-[0.16em] text-aqua">
            {expanded ? "SHOW LESS" : "SHOW MORE"}
          </button>
        </div>
      )}

      <div className="mt-auto pt-4 flex items-center justify-between border-t border-line/60">
        <span className="font-mono text-[10px] text-dim tracking-[0.14em]">
          REQUESTED {relTime(b.createdAt).toUpperCase()}
        </span>
        <a
          href={telHref(b.phone)}
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-ember hover:text-foam transition-colors"
        >
          <IconPhone className="w-3.5 h-3.5" /> Call
        </a>
      </div>
    </article>
  );
}

function QuoteCard({
  x,
  expanded,
  onExpand,
  onStatus,
}: {
  x: Quote;
  expanded: boolean;
  onExpand: () => void;
  onStatus: (s: string) => void;
}) {
  return (
    <article className="flex flex-col rounded-xl border border-line bg-panel/60 p-5 hover:border-aqua/40 transition-colors">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[12px] tracking-[0.14em] text-aqua">{x.ref}</span>
        <StatusSelect value={x.status} options={QUOTE_STATUSES} onChange={onStatus} />
      </div>

      <h3 className="mt-3.5 font-display text-[16.5px] font-semibold leading-snug">{x.service}</h3>
      <div className="mt-3 space-y-2 text-[13px] text-mist">
        <p className="flex items-center gap-2">
          <IconUser className="w-3.5 h-3.5 text-dim shrink-0" /> {x.name}
          <a href={telHref(x.phone)} className="font-mono text-[12px] text-aqua hover:underline">
            {x.phone}
          </a>
        </p>
        <p className="flex items-center gap-2">
          <IconPin className="w-3.5 h-3.5 text-dim shrink-0" />
          {x.address ?? "Address pending"}
          {x.propertyType && <span className="font-mono text-[11px] text-dim">· {x.propertyType}</span>}
        </p>
      </div>

      <div className="mt-3 rounded-lg bg-deep/70 border border-line/70 px-3.5 py-2.5">
        <p className={cx("text-[12.5px] text-mist leading-relaxed", !expanded && "line-clamp-3")}>
          {x.description}
        </p>
        <button onClick={onExpand} className="mt-1 font-mono text-[10px] tracking-[0.16em] text-aqua">
          {expanded ? "SHOW LESS" : "SHOW MORE"}
        </button>
      </div>

      {(x.budget || x.timeline) && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {x.budget && (
            <span className="font-mono text-[10px] tracking-[0.1em] rounded-full border border-ember/40 bg-ember/10 text-ember px-2.5 py-1">
              {x.budget.toUpperCase()}
            </span>
          )}
          {x.timeline && (
            <span className="font-mono text-[10px] tracking-[0.1em] rounded-full border border-line bg-raise/50 text-mist px-2.5 py-1">
              {x.timeline.toUpperCase()}
            </span>
          )}
        </div>
      )}

      <div className="mt-auto pt-4 border-t border-line/60 flex items-center justify-between">
        <span className="font-mono text-[10px] text-dim tracking-[0.14em]">
          RECEIVED {relTime(x.createdAt).toUpperCase()}
        </span>
        <a
          href={telHref(x.phone)}
          className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-ember hover:text-foam transition-colors"
        >
          <IconPhone className="w-3.5 h-3.5" /> Call
        </a>
      </div>
    </article>
  );
}
