import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request)
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

    const {
      patientId,
      appointmentId,
      diagnosis,
      treatment,
      notes,
      prescriptions
    } = await req.json();

    const doctor = await prisma.doctor.findUnique({
      where: { userId: session.user.id },
    });

    if (!doctor)
    {
      return new NextResponse("Doctor not found", { status: 404 });
    }

    // Create the medical record
    const result = await prisma.$transaction(async (tx) =>
    {
      const record = await tx.medicalRecord.create({
        data: {
          patientId,
          doctorId: doctor.id,
          diagnosis,
          treatment,
          notes,
          prescriptions: {
            create: prescriptions.map((p: any) => ({
              medication: p.medication,
              dosage: p.dosage,
              frequency: p.frequency,
              duration: p.duration,
              instructions: p.instructions,
            })),
          },
        },
      });

      // Update appointment status to COMPLETED if provided
      if (appointmentId)
      {
        await tx.appointment.update({
          where: { id: appointmentId },
          data: { status: "COMPLETED" },
        });
      }

      return record;
    });

    return NextResponse.json(result);
  } catch (error)
  {
    console.error("Error creating medical record:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
