import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

// POST /api/appointments
// Body: { fullName, email, phone, datetime, source }
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, datetime, source } = body || {};

    if (!fullName || !email || !datetime) {
      return NextResponse.json({ error: "fullName, email, and datetime are required" }, { status: 400 });
    }

    const parsedDate = new Date(datetime);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json({ error: "Invalid datetime" }, { status: 400 });
    }

    const appointment = await prisma.appointment.create({
      data: {
        fullName,
        email,
        phone,
        datetime: parsedDate,
        source: source ?? "home-cta",
        status: "PENDING",
      },
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error: any) {
    console.error("create appointment error", error);
    return NextResponse.json({ error: "Unable to create appointment" }, { status: 500 });
  }
}
