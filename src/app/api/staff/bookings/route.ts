import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { desc } from "drizzle-orm";
import { staffAuthed } from "@/lib/auth";

export async function GET(req: Request) {
  if (!(await staffAuthed(req))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const rows = await db.select().from(bookings).orderBy(desc(bookings.id));
  return NextResponse.json({ ok: true, bookings: rows });
}
