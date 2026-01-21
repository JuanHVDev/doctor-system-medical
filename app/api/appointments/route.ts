import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: Request)
{
  try
  {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session)
    {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { patientId, doctorId, startTime, endTime, reason, appointmentType } = body;

    if (!patientId || !doctorId || !startTime || !endTime || !appointmentType)
    {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        doctorId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        duration: 30, // Default 30 mins
        reason,
        appointmentType,
        status: "SCHEDULED",
      },
    });

    return NextResponse.json(appointment);
  } catch (error)
  {
    console.error("[APPOINTMENTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
