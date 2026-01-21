import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET()
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

    const patient = await prisma.patient.findUnique({
      where: { userId: session.user.id },
    });

    if (!patient)
    {
      return new NextResponse("Patient not found", { status: 404 });
    }

    const medicalHistory = await prisma.medicalRecord.findMany({
      where: { patientId: patient.id },
      include: {
        doctor: {
          include: {
            user: {
              select: {
                fullName: true,
              },
            },
          },
        },
        prescriptions: true,
      },
      orderBy: { date: "desc" },
    });

    const labResults = await prisma.labResult.findMany({
      where: { patientId: patient.id },
      orderBy: { date: "desc" },
    });

    return NextResponse.json({
      medicalRecords: medicalHistory,
      labResults: labResults,
    });
  } catch (error)
  {
    console.error("Error fetching medical history:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
