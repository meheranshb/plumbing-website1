import { NextResponse } from "next/server";
import { db } from "@/db";
import { quotes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { staffAuthed } from "@/lib/auth";
import { QUOTE_STATUSES } from "@/lib/utils";

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
    typeof body.status === "string" && (QUOTE_STATUSES as readonly string[]).includes(body.status)
      ? body.status
      : null;
  if (!status) {
    return NextResponse.json(
      { ok: false, error: "Status must be one of: " + QUOTE_STATUSES.join(", ") },
      { status: 400 }
    );
  }

  await db.update(quotes).set({ status }).where(eq(quotes.id, num));
  return NextResponse.json({ ok: true });
}
