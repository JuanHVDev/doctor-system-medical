import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function PATCH(req: Request)
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
    const {
      fullName,
      email,
      phoneNumber,
      dateOfBirth,
      gender,
      address,
      city,
      state,
      zipCode,
      country,
      bloodType,
      allergies,
      medicalHistory,
      height,
      weight,
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactRelation,
      primaryInsurance,
      insurancePolicyNumber,
      insuranceGroupNumber
    } = body;

    // Update User fullName if provided
    if (fullName)
    {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { name: fullName }
      });
    }

    // Update Patient Profile
    const updatedPatient = await prisma.patient.update({
      where: { userId: session.user.id },
      data: {
        fullName,
        phoneNumber,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        gender,
        address,
        city,
        state,
        zipCode,
        country,
        bloodType,
        allergies,
        medicalHistory,
        height: height ? parseFloat(height) : null,
        weight: weight ? parseFloat(weight) : null,
        emergencyContactName,
        emergencyContactPhone,
        emergencyContactRelation,
        primaryInsurance,
        insurancePolicyNumber,
        insuranceGroupNumber,
      },
    });

    return NextResponse.json(updatedPatient);
  } catch (error)
  {
    console.error("[PROFILE_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
