import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { PatientStats } from "@/components/dashboard/PatientStats";
import { PatientProfile } from "@/components/dashboard/PatientProfile";
import { UpcomingAppointments } from "@/components/dashboard/UpcomingAppointments";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { HealthSummary } from "@/components/dashboard/HealthSummary";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { Bell, Search, Settings, HelpCircle, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as motion from "motion/react-client"
import { fadeInUp, staggerContainer } from "@/lib/animations";


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
        include: {
          doctor: true
        },
        orderBy: {
          startTime: "desc"
        }
      }
    }
  });

  if (!patientData)
  {
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

  // Derived stats
  const upcomingAppointments = patientData.appointments.filter(app =>
    new Date(app.startTime) >= new Date() && ["SCHEDULED", "CONFIRMED"].includes(app.status)
  ).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  const completedCount = patientData.appointments.filter(app => app.status === "COMPLETED").length;
  const totalCount = patientData.appointments.length;

  // Recent activity mapping
  const activities: { id: string; type: 'APPOINTMENT' | 'MEDICAL_RECORD' | 'PROFILE_UPDATE'; title: string; description: string; date: Date }[] = patientData.appointments.slice(0, 5).map(app => ({
    id: app.id,
    type: 'APPOINTMENT' as const,
    title: `Cita con ${app.doctor.fullName}`,
    description: `${app.appointmentType.replace(/_/g, ' ')} - ${app.status}`,
    date: app.startTime,
  }));

  if (patientData.updatedAt)
  {
    activities.push({
      id: 'profile-update',
      type: 'PROFILE_UPDATE' as const,
      title: 'Perfil Actualizado',
      description: 'Se realizaron cambios en tu información personal.',
      date: patientData.updatedAt
    });
  }

  activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="min-h-screen bg-muted/40 dark:bg-background/95">
      {/* Dashboard Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Activity className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">AG Health</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex relative group">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="w-64 pl-8 bg-muted/50 border-none focus-visible:ring-2 focus-visible:ring-primary/20"
              />
            </div>
            <Button variant="ghost" size="icon" className="relative group">
              <Bell className="h-5 w-5 group-hover:text-primary transition-colors" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-background"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <motion.main
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="container p-4 md:p-8 space-y-8 max-w-7xl mx-auto"
      >
        {/* Welcome and Summary Section */}
        <motion.section variants={fadeInUp}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                Hola, {session.user.name}
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Bienvenido a tu centro de salud digital.
              </p>
            </div>
          </div>

          <PatientStats
            totalAppointments={totalCount}
            completedAppointments={completedCount}
            upcomingAppointments={upcomingAppointments.length}
          />
        </motion.section>

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Main Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Quick Actions */}
            <motion.div variants={fadeInUp}>
              <QuickActions />
            </motion.div>

            {/* Upcoming Appointments */}
            <motion.div variants={fadeInUp}>
              <UpcomingAppointments
                appointments={upcomingAppointments.slice(0, 3).map(app => ({
                  id: app.id,
                  startTime: app.startTime,
                  status: app.status,
                  doctor: {
                    fullName: app.doctor.fullName,
                    specialization: app.doctor.specialization
                  }
                }))}
              />
            </motion.div>

            {/* Recent Activity */}
            <motion.div variants={fadeInUp}>
              <RecentActivity activities={activities.slice(0, 5)} />
            </motion.div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Health Indicators */}
            <motion.div variants={fadeInUp}>
              <HealthSummary
                bloodType={patientData.bloodType}
                weight={patientData.weight}
                height={patientData.height}
              />
            </motion.div>

            {/* Personal Profile Summary */}
            <motion.div variants={fadeInUp}>
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
            </motion.div>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
