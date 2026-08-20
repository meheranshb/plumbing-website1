import { NextResponse } from "next/server";
import { db } from "@/db";
import { quotes } from "@/db/schema";
import { desc } from "drizzle-orm";
import { staffAuthed } from "@/lib/auth";

export async function GET(req: Request) {
  if (!(await staffAuthed(req))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const rows = await db.select().from(quotes).orderBy(desc(quotes.id));
  return NextResponse.json({ ok: true, quotes: rows });
}
