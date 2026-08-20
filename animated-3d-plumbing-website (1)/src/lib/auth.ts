import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const SECRET = process.env.ASP_DASH_SECRET ?? "asp-central-florida-2026";
const PIN = process.env.ASP_DASH_PIN ?? "5702";
export const COOKIE_NAME = "asp_staff";
const TTL_MS = 12 * 60 * 60 * 1000; // 12h

function sign(payload: string): string {
  return createHmac("sha256", SECRET).update(payload).digest("base64url");
}

export function makeStaffToken(): string {
  const exp = Date.now() + TTL_MS;
  return `${exp}.${sign(String(exp))}`;
}

export function verifyToken(t: string | null | undefined): boolean {
  if (!t) return false;
  const [exp, sig] = t.split(".");
  if (!exp || !sig) return false;
  if (Number(exp) < Date.now()) return false;
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(sign(exp)));
  } catch {
    return false;
  }
}

export function verifyPin(pin: string): boolean {
  const a = Buffer.from(pin.trim());
  const b = Buffer.from(PIN);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isStaff(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(COOKIE_NAME)?.value);
}

/**
 * For route handlers: accepts the staff cookie, or — as a fallback for
 * environments where cookies don't survive (plain-HTTP previews, proxies) —
 * an `x-staff-token` header carrying the same signed token.
 */
export async function staffAuthed(req: Request): Promise<boolean> {
  const headerToken = req.headers.get("x-staff-token");
  if (headerToken) return verifyToken(headerToken);
  return isStaff();
}
