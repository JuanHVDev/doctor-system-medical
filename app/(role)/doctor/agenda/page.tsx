import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { prisma } from "@/lib/prisma"
import { DoctorCalendar } from "@/components/dashboard/DoctorCalendar"
import { Calendar } from "lucide-react"

export default async function DoctorAgendaPage()
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

  const doctor = await prisma.doctor.findUnique({
    where: { userId: session.user.id },
  })

  if (!doctor)
  {
    redirect("/onboarding/doctor")
  }

  const appointments = await prisma.appointment.findMany({
    where: {
      doctorId: doctor.id,
      status: {
        in: ["SCHEDULED", "COMPLETED", "IN_PROGRESS"]
      }
    },
    include: {
      patient: {
        include: {
          user: true
        }
      }
    },
    orderBy: {
      startTime: "asc",
    },
  })

  const serializedAppointments = appointments.map(app => ({
    ...app,
    startTime: app.startTime.toISOString(),
    endTime: app.endTime.toISOString(),
  }))

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] p-8 space-y-8 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Calendar className="h-8 w-8 text-primary" />
            Agenda Médica
          </h1>
          <p className="text-muted-foreground font-medium">
            Visualice y gestione sus compromisos y disponibilidad horaria.
          </p>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        <DoctorCalendar appointments={serializedAppointments as any} />
      </div>
    </div>
  )
}
