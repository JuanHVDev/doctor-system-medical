import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { prisma } from "@/lib/prisma"
import { DoctorStats } from "@/components/dashboard/DoctorStats"
import { UpcomingAppointmentsDoctor } from "@/components/dashboard/UpcomingAppointmentsDoctor"
import { Bell, Search, Settings, HelpCircle, Activity, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { format, startOfDay, endOfDay } from "date-fns"

export default async function DoctorPage()
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

  // Fetch doctor profile
  const doctor = await prisma.doctor.findUnique({
    where: { userId: session.user.id },
    include: {
      user: true,
      appointments: {
        where: {
          startTime: {
            gte: startOfDay(new Date()),
            lte: endOfDay(new Date()),
          },
        },
        include: {
          patient: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          startTime: "asc",
        },
      },
    }
  })

  if (!doctor)
  {
    redirect("/onboarding/doctor") // Or some page to complete profile
  }

  // Calculate stats
  const appointmentsToday = doctor.appointments.length

  // Get total unique patients
  const totalPatientsCount = await prisma.appointment.groupBy({
    by: ['patientId'],
    where: {
      doctorId: doctor.id
    },
    _count: true
  })

  // Pending appointments (not today, just in general with status SCHEDULED)
  const pendingCount = await prisma.appointment.count({
    where: {
      doctorId: doctor.id,
      status: "SCHEDULED",
      startTime: {
        gt: endOfDay(new Date())
      }
    }
  })

  const stats = {
    appointmentsToday,
    totalPatients: totalPatientsCount.length,
    newResults: 0, // Placeholder for now
    pendingAppointments: pendingCount,
  }

  const serializedAppointments = doctor.appointments.map(app => ({
    ...app,
    startTime: app.startTime.toISOString(),
    endTime: app.endTime.toISOString(),
  }))

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-slate-950 overflow-hidden font-inter">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10 transition-colors">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-96 hidden md:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Buscar pacientes, citas, resultados..."
                className="pl-10 bg-slate-100/50 border-transparent focus:bg-white focus:border-primary/20 transition-all rounded-xl"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
              <Bell className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
              <Settings className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </Button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {/* Welcome Area */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                Hola, Dr. {doctor.user.fullName.split(" ")[0]} 👋
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium">
                Hoy es {format(new Date(), "EEEE, d 'de' MMMM", { locale: es })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button className="bg-primary hover:bg-primary/90 text-white gap-2 shadow-lg shadow-primary/20 rounded-xl px-6 h-11 transition-all hover:scale-[1.02]">
                <Activity className="h-4 w-4" />
                Nueva Consulta
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <DoctorStats stats={stats} />

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Appointments */}
            <div className="lg:col-span-2 space-y-8">
              <UpcomingAppointmentsDoctor appointments={serializedAppointments as any} />

              {/* Additional sections like Recent Patients or Quick Notes could go here */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 border-none shadow-lg bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                  <div className="flex flex-col h-full justify-between gap-4">
                    <div>
                      <Calendar className="h-8 w-8 mb-4 opacity-80" />
                      <h3 className="text-xl font-bold">Resumen de Agenda</h3>
                      <p className="text-blue-100 text-sm mt-1">Usted tiene {pendingCount} citas próximas esta semana.</p>
                    </div>
                    <Button variant="secondary" className="w-full bg-white/20 hover:bg-white/30 border-none text-white backdrop-blur-sm transition-colors">
                      Ver Calendario Completo
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 border-none shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                  <div className="flex flex-col h-full justify-between gap-4">
                    <div>
                      <Users className="h-8 w-8 mb-4 opacity-80" />
                      <h3 className="text-xl font-bold">Nuevos Pacientes</h3>
                      <p className="text-emerald-500 text-sm mt-1">
                        <span className="bg-white/90 text-emerald-600 px-2 py-0.5 rounded-full font-bold mr-1">
                          +12%
                        </span>
                        <span className="text-white">este mes</span>
                      </p>
                    </div>
                    <Button variant="secondary" className="w-full bg-white/20 hover:bg-white/30 border-none text-white backdrop-blur-sm transition-colors">
                      Ver Base de Datos
                    </Button>
                  </div>
                </Card>
              </div>
            </div>

            {/* Right Column - Secondary Info */}
            <div className="space-y-8">
              {/* Quick Actions / Shortcuts */}
              <Card className="p-6 border-none shadow-xl bg-white dark:bg-slate-900">
                <h3 className="text-lg font-bold mb-4">Acciones Rápidas</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Prescripción", icon: Activity, color: "text-blue-500", bg: "bg-blue-50" },
                    { label: "Resultados", icon: FileText, color: "text-purple-500", bg: "bg-purple-50" },
                    { label: "Pacientes", icon: Users, color: "text-green-500", bg: "bg-green-50" },
                    { label: "Soporte", icon: HelpCircle, color: "text-amber-500", bg: "bg-amber-50" },
                  ].map((item, i) => (
                    <button
                      key={i}
                      className="flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border border-slate-100 dark:border-slate-800 group"
                    >
                      <div className={`p-3 rounded-xl ${item.bg} dark:bg-slate-800 group-hover:scale-110 transition-transform`}>
                        <item.icon className={`h-5 w-5 ${item.color}`} />
                      </div>
                      <span className="mt-2 text-xs font-semibold text-slate-600 dark:text-slate-400">{item.label}</span>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Today's Schedule Mini-view */}
              <Card className="p-6 border-none shadow-xl bg-white dark:bg-slate-900 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Estado de Horario</h3>
                  <Badge className="bg-green-500">Activo</Badge>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Inicio:</span>
                    <span className="font-semibold">{doctor.startTime || "09:00"}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">Cierre:</span>
                    <span className="font-semibold">{doctor.endTime || "17:00"}</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-primary w-2/3 rounded-full"></div>
                  </div>
                  <p className="text-[10px] text-slate-400 text-center uppercase tracking-wider font-bold">
                    65% de la jornada completada
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}