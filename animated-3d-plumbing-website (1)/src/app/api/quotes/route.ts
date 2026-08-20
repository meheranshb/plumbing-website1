import { NextResponse } from "next/server";
import { db } from "@/db";
import { quotes } from "@/db/schema";
import { cleanStr, digitsOnly, genRef } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const name = cleanStr(b.name, 80);
    const phone = cleanStr(b.phone, 24);
    const email = cleanStr(b.email, 120) || null;
    const address = cleanStr(b.address, 160) || null;
    const propertyType = cleanStr(b.propertyType, 80) || null;
    const service = cleanStr(b.service, 80);
    const description = cleanStr(b.description, 2000);
    const budget = cleanStr(b.budget, 40) || null;
    const timeline = cleanStr(b.timeline, 40) || null;

    const problems: string[] = [];
    if (name.length < 2) problems.push("name");
    if (digitsOnly(phone).length < 10) problems.push("phone");
    if (!service) problems.push("service");
    if (description.length < 20) problems.push("description");
    if (problems.length) {
      return NextResponse.json(
        { ok: false, error: `Missing or invalid: ${problems.join(", ")}.` },
        { status: 400 }
      );
    }

    const [row] = await db
      .insert(quotes)
      .values({
        ref: genRef("QT"),
        name,
        phone,
        email,
        address,
        propertyType,
        service,
        description,
        budget,
        timeline,
        status: "new",
      })
      .returning();

    return NextResponse.json({ ok: true, ref: row.ref, id: row.id });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not save your quote request. Please call 863-991-5702." },
      { status: 500 }
    );
  }
}
