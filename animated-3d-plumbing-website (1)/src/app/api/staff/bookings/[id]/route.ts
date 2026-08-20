import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { staffAuthed } from "@/lib/auth";
import { BOOKING_STATUSES } from "@/lib/utils";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await staffAuthed(req))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const num = Number(id);
  if (!Number.isInteger(num) || num <= 0) {
    return NextResponse.json({ ok: false, error: "Bad id" }, { status: 400 });
  }

  const body = await req.json().catch(() => ({}));
  const status =
    typeof body.status === "string" && (BOOKING_STATUSES as readonly string[]).includes(body.status)
      ? body.status
      : null;
  if (!status) {
    return NextResponse.json(
      { ok: false, error: "Status must be one of: " + BOOKING_STATUSES.join(", ") },
      { status: 400 }
    );
  }

  await db.update(bookings).set({ status }).where(eq(bookings.id, num));
  return NextResponse.json({ ok: true });
}
