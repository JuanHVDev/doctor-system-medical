import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
)
{
  try
  {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user)
    {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Ensure user is a doctor
    if (session.user.role !== "DOCTOR" && session.user.role !== "DR")
    {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const { status, notes, reason } = await req.json();

    const doctor = await prisma.doctor.findUnique({
      where: { userId: session.user.id },
    });

    if (!doctor)
    {
      return new NextResponse("Doctor not found", { status: 404 });
    }

    // Update appointment, ensuring it belongs to this doctor
    const appointment = await prisma.appointment.update({
      where: {
        id: params.id,
        doctorId: doctor.id
      },
      data: {
        status: status || undefined,
        notes: notes || undefined,
        reason: reason || undefined,
      },
    });

    return NextResponse.json(appointment);
  } catch (error)
  {
    console.error("Error updating appointment:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
