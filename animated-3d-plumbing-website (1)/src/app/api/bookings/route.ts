import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { cleanStr, digitsOnly, genRef } from "@/lib/utils";

const URGENCY_IDS = ["standard", "asap", "emergency"];
const VALID_SLOTS = ["8 – 10 AM", "10 AM – 12 PM", "12 – 2 PM", "2 – 4 PM", "4 – 6 PM"];

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const service = cleanStr(b.service, 80);
    const name = cleanStr(b.name, 80);
    const phone = cleanStr(b.phone, 24);
    const email = cleanStr(b.email, 120) || null;
    const address = cleanStr(b.address, 160);
    const city = cleanStr(b.city, 60) || "Sebring";
    const date = cleanStr(b.date, 10);
    const urgency = URGENCY_IDS.includes(b.urgency) ? b.urgency : "standard";
    const timeSlot =
      urgency === "emergency" ? "ASAP — 24/7" : VALID_SLOTS.includes(b.timeSlot) ? b.timeSlot : "";
    const notes = cleanStr(b.notes, 600) || null;

    const problems: string[] = [];
    if (!service) problems.push("service");
    if (name.length < 2) problems.push("name");
    if (digitsOnly(phone).length < 10) problems.push("phone");
    if (!address) problems.push("address");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) problems.push("date");
    if (!timeSlot) problems.push("timeSlot");
    if (problems.length) {
      return NextResponse.json(
        { ok: false, error: `Missing or invalid: ${problems.join(", ")}.` },
        { status: 400 }
      );
    }

    const [row] = await db
      .insert(bookings)
      .values({
        ref: genRef("ASP"),
        service,
        name,
        phone,
        email,
        address,
        city,
        date,
        timeSlot,
        urgency,
        notes,
        status: "pending",
      })
      .returning();

    return NextResponse.json({ ok: true, ref: row.ref, id: row.id });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not save your booking. Please call 863-991-5702." },
      { status: 500 }
    );
  }
}
