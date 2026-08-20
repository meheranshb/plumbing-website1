import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { COOKIE_NAME, makeStaffToken, verifyPin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({ pin: "" }));
  const pin = typeof body.pin === "string" ? body.pin : "";

  if (!verifyPin(pin)) {
    return NextResponse.json({ ok: false, error: "Wrong PIN." }, { status: 401 });
  }

  const token = makeStaffToken();
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    // Only mark the cookie Secure when actually on HTTPS — a Secure cookie
    // set on a plain-HTTP preview is silently dropped by the browser.
    secure: req.nextUrl.protocol === "https:",
    path: "/",
    maxAge: 12 * 60 * 60,
  });

  // Also hand the token back to the client so it can fall back to the
  // x-staff-token header if the cookie isn't retained by the browser.
  return NextResponse.json({ ok: true, token });
}
