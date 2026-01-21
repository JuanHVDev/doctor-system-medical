import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { BookingForm } from "@/components/dashboard/BookingForm";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AgendarCitaPage()
{
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
  {
    redirect("/login");
  }

  // Fetch patient profile
  const patient = await prisma.patient.findUnique({
    where: { userId: session.user.id }
  });

  if (!patient)
  {
    redirect("/paciente");
  }

  // Fetch all active doctors
  const doctors = await prisma.doctor.findMany({
    where: { isActive: true },
    select: {
      id: true,
      fullName: true,
      specialization: true,
      availableDays: true,
      startTime: true,
      endTime: true,
    }
  });

  return (
    <div className="min-h-screen bg-muted/30 dark:bg-background/95 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/paciente">
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Agendar Nueva Cita</h1>
            <p className="text-muted-foreground">Sigue los pasos para reservar tu atención médica.</p>
          </div>
        </div>

        <BookingForm
          doctors={doctors.map(d => ({
            ...d,
            specialization: d.specialization || "General"
          }))}
          patientId={patient.id}
        />
      </div>
    </div>
  );
}
