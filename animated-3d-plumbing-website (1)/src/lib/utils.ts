const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export function genRef(prefix: string, len = 5): string {
  let s = "";
  for (let i = 0; i < len; i++) {
    s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return `${prefix}-${s}`;
}

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function todayISO(): string {
  const d = new Date();
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function addDaysISO(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export function fmtDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  const today = todayISO();
  const tomorrow = addDaysISO(1);
  let base = d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  if (iso === today) base = `Today · ${base}`;
  else if (iso === tomorrow) base = `Tomorrow · ${base}`;
  return base;
}

export function relTime(iso: string): string {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "";
  const s = Math.max(0, (Date.now() - t) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  const d = Math.floor(s / 86400);
  if (d < 7) return `${d}d ago`;
  return new Date(t).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function cleanStr(v: unknown, max = 500): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export function digitsOnly(v: string): string {
  return v.replace(/\D/g, "");
}

export function telHref(phone: string): string {
  const d = digitsOnly(phone);
  return `tel:+1${d}`;
}

export const BOOKING_STATUSES = [
  "pending",
  "confirmed",
  "dispatched",
  "completed",
  "cancelled",
] as const;

export const QUOTE_STATUSES = [
  "new",
  "contacted",
  "proposed",
  "won",
  "declined",
] as const;

export function statusColor(status: string): string {
  switch (status) {
    case "confirmed":
    case "won":
      return "text-ok border-ok/40 bg-ok/10";
    case "dispatched":
    case "proposed":
      return "text-aqua border-aqua/40 bg-aqua/10";
    case "pending":
    case "new":
      return "text-warn border-warn/40 bg-warn/10";
    case "completed":
      return "text-mist border-line bg-raise/60";
    case "cancelled":
    case "declined":
      return "text-danger border-danger/40 bg-danger/10";
    case "contacted":
      return "text-ember border-ember/40 bg-ember/10";
    default:
      return "text-mist border-line bg-raise/60";
  }
}
