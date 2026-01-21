"use client"

import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar, Clock, User, ChevronRight, CheckCircle2, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Appointment
{
  id: string
  startTime: string
  appointmentType: string
  status: string
  reason: string | null
  patient: {
    user: {
      fullName: string
      image: string | null
    }
  }
}

interface UpcomingAppointmentsDoctorProps
{
  appointments: Appointment[]
}

export function UpcomingAppointmentsDoctor({ appointments }: UpcomingAppointmentsDoctorProps)
{
  return (
    <Card className="col-span-1 border-none shadow-xl bg-white/50 backdrop-blur-xl dark:bg-slate-900/50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Citas Próximas
          </CardTitle>
          <CardDescription>Usted tiene {appointments.length} citas para el resto del día.</CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
          Ver todas
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="group relative flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-slate-100/50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
              >
                <div className="flex flex-col items-center justify-center min-w-16 h-16 rounded-xl bg-primary/10 text-primary border border-primary/20">
                  <span className="text-sm font-bold">{format(new Date(appointment.startTime), "HH:mm")}</span>
                  <span className="text-[10px] uppercase font-medium">{format(new Date(appointment.startTime), "aaa")}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar className="h-6 w-6 border-2 border-white dark:border-slate-800">
                      <AvatarImage src={appointment.patient.user.image || ""} />
                      <AvatarFallback className="bg-primary/20 text-primary text-[10px]">
                        {appointment.patient.user.fullName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h4 className="font-semibold text-slate-900 dark:text-white truncate">
                      {appointment.patient.user.fullName}
                    </h4>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                      {appointment.appointmentType === "CONSULTA" ? "Consulta" : "Seguimiento"}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                    {appointment.reason || "Sin motivo especificado"}
                  </p>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:bg-green-50">
                    <CheckCircle2 className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:bg-red-50">
                    <XCircle className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white">No tienes citas próximas</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">¡Tómate un descanso!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
