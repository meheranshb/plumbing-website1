"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IconLock } from "./Icons";
import { Logo } from "./Nav";
import { cx } from "@/lib/utils";
import DashboardClient from "./DashboardClient";

const TOKEN_KEY = "asp_staff_token";

export default function StaffGate() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [shakes, setShakes] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(true);

  // If a valid session already exists (cookie survived, or token in storage),
  // go straight to the board.
  useEffect(() => {
    let alive = true;
    const headers: Record<string, string> = {};
    try {
      const t = window.sessionStorage.getItem(TOKEN_KEY);
      if (t) headers["x-staff-token"] = t;
    } catch {
      /* ignore */
    }
    fetch("/api/staff/session", { cache: "no-store", headers })
      .then((r) => (r.ok ? r.json() : { staff: false }))
      .then((d) => {
        if (alive && d.staff) setUnlocked(true);
      })
      .catch(() => {})
      .finally(() => {
        if (alive) setChecking(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  async function submit(ev: React.FormEvent) {
    ev.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/staff/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        // Keep the token client-side as a fallback in case the httpOnly
        // cookie is not retained by this browser/environment.
        if (data.token) {
          try {
            window.sessionStorage.setItem(TOKEN_KEY, data.token);
          } catch {
            /* ignore */
          }
        }
        setUnlocked(true);
        router.refresh();
      } else {
        setError("Wrong PIN — it's the last four of our main line.");
        setShakes((s) => s + 1);
        setPin("");
      }
    } catch {
      setError("Network error — try again.");
    } finally {
      setBusy(false);
    }
  }

  if (unlocked) return <DashboardClient />;

  if (checking) {
    return (
      <div className="min-h-screen grid place-items-center bg-ink">
        <div className="flex flex-col items-center text-dim">
          <span className="w-8 h-8 border-2 border-line border-t-aqua rounded-full animate-spin" />
          <p className="mt-4 font-mono text-[11px] tracking-[0.26em]">CHECKING SESSION…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid place-items-center px-5 py-16 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg grid-fade" aria-hidden="true" />
      <div
        className="absolute top-1/4 right-[-10%] h-[420px] w-[420px] rounded-full bg-aqua/10 blur-[130px]"
        aria-hidden="true"
      />
      <div className="relative w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <form
          key={shakes}
          onSubmit={submit}
          className={cx("rounded-2xl border border-line bg-panel/80 backdrop-blur p-8", shakes > 0 && "shake")}
        >
          <span className="grid place-items-center w-14 h-14 rounded-xl border border-line bg-deep text-aqua mx-auto">
            <IconLock className="w-6 h-6" />
          </span>
          <h1 className="mt-5 text-center font-display text-2xl font-bold">Dispatch Center</h1>
          <p className="mt-1.5 text-center text-[13px] text-dim">
            Staff access — bookings, quotes & the day board.
          </p>
          <input
            type="password"
            inputMode="numeric"
            autoFocus
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="ENTER PIN"
            className="field mt-6 text-center font-mono text-xl tracking-[0.5em]"
            aria-label="Staff PIN"
          />
          {error && <p className="mt-3 text-[12.5px] text-danger text-center">{error}</p>}
          <button
            type="submit"
            disabled={busy || pin.length < 4}
            className="mt-4 w-full rounded-lg bg-ember px-6 py-3.5 font-bold text-ink hover:bg-ember-deep transition-colors disabled:opacity-50"
          >
            {busy ? "Checking…" : "Enter the shop"}
          </button>
          <p className="mt-5 text-center font-mono text-[10.5px] tracking-[0.16em] text-dim">
            
          </p>
        </form>
        <p className="mt-6 text-center text-[12px] text-dim">
          Customer? You want the{" "}
          <a href="/book" className="text-aqua hover:underline">
            booking form
          </a>{" "}
          or a{" "}
          <a href="/quote" className="text-aqua hover:underline">
            quote
          </a>
          .
        </p>
      </div>
    </div>
  );
}
