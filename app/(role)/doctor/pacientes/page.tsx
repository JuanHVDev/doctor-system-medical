import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { prisma } from "@/lib/prisma"
import { PatientList } from "@/components/dashboard/PatientList"
import { Users, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function DoctorPatientsPage()
{
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session)
  {
    redirect("/login")
  }

  // Ensure only doctors can access this page
  if (session.user.role !== "DOCTOR" && session.user.role !== "DR")
  {
    redirect("/forbidden")
  }

  // Fetch doctor ID
  const doctor = await prisma.doctor.findUnique({
    where: { userId: session.user.id },
  })

  if (!doctor)
  {
    redirect("/onboarding/doctor")
  }

  // Fetch unique patients the doctor has had appointments with
  const appointments = await prisma.appointment.findMany({
    where: {
      doctorId: doctor.id
    },
    include: {
      patient: {
        include: {
          user: true
        }
      }
    },
    distinct: ['patientId']
  })

  const patients = appointments.map(app => ({
    id: app.patient.id,
    user: app.patient.user,
    bloodType: app.patient.bloodType,
    // Finding last visit date for each patient
    lastVisit: "Reciente" // Simplified for now, could be improved with a more complex query
  }))

  return (
    <div className="container mx-auto py-8 px-4 md:px-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            Mis Pacientes
          </h1>
          <p className="text-muted-foreground font-medium">
            Gestione y supervise la base de datos de sus pacientes atendidos.
          </p>
        </div>
        <Button className="gap-2 rounded-xl h-11 px-6 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]">
          <UserPlus className="h-4 w-4" />
          Registrar Paciente
        </Button>
      </div>

      <PatientList patients={patients as any} />
    </div>
  )
}
