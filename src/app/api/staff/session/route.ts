import { NextResponse } from "next/server";
import { staffAuthed } from "@/lib/auth";

export async function GET(req: Request) {
  const staff = await staffAuthed(req);
  return NextResponse.json({ ok: true, staff });
}
