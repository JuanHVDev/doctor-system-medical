import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { PatientStats } from "@/components/dashboard/PatientStats";
import { PatientProfile } from "@/components/dashboard/PatientProfile";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";
import { Bell, Search, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function PacientePage()
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
    where: { userId: session.user.id },
    include: {
      appointments: {
        where: {
          startTime: { gte: new Date() },
          status: { in: ["SCHEDULED", "CONFIRMED"] }
        },
        include: {
          doctor: true
        },
        orderBy: {
          startTime: "asc"
        },
        take: 5
      }
    }
  });

  if (!patientData)
  {
    // This shouldn't happen if databaseHooks are working, but just in case
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold">Perfil no encontrado</h1>
        <p className="text-muted-foreground">Tu perfil de paciente no ha sido inicializado correctamente.</p>
        <Button asChild className="mt-4">
          <a href="/">Cerrar Sesión e intentar de nuevo</a>
        </Button>
      </div>
    );
  }

  // Fetch counts for stats
  const allAppointmentsCount = await prisma.appointment.count({
    where: { patientId: patientData.id }
  });

  const completedAppointmentsCount = await prisma.appointment.count({
    where: {
      patientId: patientData.id,
      status: "COMPLETED"
    }
  });

  const upcomingCount = await prisma.appointment.count({
    where: {
      patientId: patientData.id,
      startTime: { gte: new Date() },
      status: { in: ["SCHEDULED", "CONFIRMED"] }
    }
  });

  return (
    <div className="min-h-screen bg-muted/30 dark:bg-background">
      {/* Dashboard Top Navigation */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2 font-bold text-xl">
          <span className="text-primary font-black italic">AG</span>
          <span>Health</span>
        </div>
        <div className="ml-auto flex items-center gap-4 md:gap-8">
          <form className="hidden lg:flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar médicos, citas..."
              className="w-72 pl-8 bg-muted/50 border-none focus-visible:ring-1"
            />
          </form>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-primary ring-2 ring-background"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Hola, {session.user.name} 👋</h1>
            <p className="text-muted-foreground">Bienvenido de nuevo a tu panel médico. Aquí tienes un resumen de tu salud.</p>
          </div>
          <Button className="w-full md:w-auto shadow-lg shadow-primary/20">
            Nueva Cita
          </Button>
        </div>

        {/* Stats Grid */}
        <PatientStats
          totalAppointments={allAppointmentsCount}
          completedAppointments={completedAppointmentsCount}
          upcomingAppointments={upcomingCount}
        />

        {/* Main Content Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <PatientProfile
              patient={{
                fullName: patientData.fullName,
                email: session.user.email,
                image: session.user.image,
                gender: patientData.gender,
                bloodType: patientData.bloodType,
                phoneNumber: patientData.phoneNumber,
                address: patientData.address,
                city: patientData.city,
                dateOfBirth: patientData.dateOfBirth
              }}
            />
          </div>

          {/* Appointments Section */}
          <div className="lg:col-span-2">
            <UpcomingAppointments
              appointments={patientData.appointments.map(app => ({
                id: app.id,
                startTime: app.startTime,
                status: app.status,
                doctor: {
                  fullName: app.doctor.fullName,
                  specialization: app.doctor.specialization
                }
              }))}
            />
          </div>
        </div>
      </main>
    </div>
  );
}