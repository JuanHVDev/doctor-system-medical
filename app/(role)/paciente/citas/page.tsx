import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ChevronLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AppointmentsClient } from "@/components/dashboard/AppointmentsClient";

export default async function MisCitasPage()
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

  // Fetch all appointments for this patient
  const appointments = await prisma.appointment.findMany({
    where: { patientId: patient.id },
    include: {
      doctor: {
        select: {
          fullName: true,
          specialization: true,
          officeLocation: true,
        }
      }
    },
    orderBy: {
      startTime: "desc"
    }
  });

  return (
    <div className="min-h-screen bg-muted/30 dark:bg-background/95 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/paciente">
                <ChevronLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Mis Citas Médicas</h1>
              <p className="text-muted-foreground">Gestiona tus consultas programadas e historial.</p>
            </div>
          </div>
          <Button asChild className="shadow-lg shadow-primary/20">
            <Link href="/paciente/agendar" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Agendar Nueva Cita
            </Link>
          </Button>
        </div>

        <AppointmentsClient appointments={appointments} />
      </div>
    </div>
  );
}
