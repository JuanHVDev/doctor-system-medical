import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PatientProfileForm } from "@/components/dashboard/PatientProfileForm";

export default async function PerfilPacientePage()
{
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
  {
    redirect("/login");
  }

  // Ensure only patients can access this page
  if (session.user.role !== "PATIENT" && session.user.role !== "PACIENTE")
  {
    redirect("/forbidden");
  }

  // Fetch detailed patient data
  const patientData = await prisma.patient.findUnique({
    where: { userId: session.user.id }
  });

  if (!patientData)
  {
    redirect("/paciente");
  }

  return (
    <div className="min-h-screen bg-muted/30 dark:bg-background/95 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/paciente">
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Mi Perfil</h1>
            <p className="text-muted-foreground">Gestiona tu información personal, médica y de contacto.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <PatientProfileForm initialData={patientData} />
        </div>
      </div>
    </div>
  );
}
