"use client"

import { useState } from "react"
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Plus, MapPin } from "lucide-react"
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, startOfWeek, endOfWeek } from "date-fns"
import { es } from "date-fns/locale"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Appointment
{
  id: string
  startTime: string
  endTime: string
  appointmentType: string
  status: string
  patient: {
    user: {
      fullName: string
    }
  }
}

interface DoctorCalendarProps
{
  appointments: Appointment[]
}

export function DoctorCalendar({ appointments }: DoctorCalendarProps)
{
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate })

  const appointmentsForSelectedDate = appointments.filter(app =>
    isSameDay(new Date(app.startTime), selectedDate)
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      {/* Calendar Grid */}
      <Card className="lg:col-span-2 border-none shadow-xl bg-white dark:bg-slate-900 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b px-8 py-6">
          <CardTitle className="text-xl font-bold capitalize">
            {format(currentDate, "MMMM yyyy", { locale: es })}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevMonth} className="h-9 w-9">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
              Hoy
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth} className="h-9 w-9">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-7 border-b">
            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
              <div key={day} className="py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {calendarDays.map((day, idx) =>
            {
              const hasAppointments = appointments.some(app => isSameDay(new Date(app.startTime), day))
              const isSelected = isSameDay(day, selectedDate)
              const isToday = isSameDay(day, new Date())

              return (
                <div
                  key={idx}
                  onClick={() => setSelectedDate(day)}
                  className={cn(
                    "min-h-[100px] p-2 border-r border-b cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-slate-800",
                    !isSameMonth(day, monthStart) && "bg-slate-50/50 dark:bg-slate-900/50 text-slate-300",
                    isSelected && "ring-2 ring-primary ring-inset z-10 bg-primary/5 dark:bg-primary/10"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <span className={cn(
                      "text-sm font-semibold h-7 w-7 flex items-center justify-center rounded-full transition-colors",
                      isToday && !isSelected && "bg-primary text-white",
                      isSelected && "text-primary font-bold"
                    )}>
                      {format(day, "d")}
                    </span>
                    {hasAppointments && (
                      <div className="flex gap-0.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-sm shadow-primary/50"></div>
                      </div>
                    )}
                  </div>
                  {/* Mini appointment list in day */}
                  <div className="mt-2 space-y-1">
                    {appointments.filter(app => isSameDay(new Date(app.startTime), day)).slice(0, 2).map(app => (
                      <div key={app.id} className="text-[10px] p-1 bg-primary/10 text-primary truncate rounded border border-primary/20 font-medium">
                        {format(new Date(app.startTime), "HH:mm")} - {app.patient.user.fullName}
                      </div>
                    ))}
                    {appointments.filter(app => isSameDay(new Date(app.startTime), day)).length > 2 && (
                      <div className="text-[9px] text-slate-400 font-bold ml-1">
                        + {appointments.filter(app => isSameDay(new Date(app.startTime), day)).length - 2} más
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Side Details - Agenda for selected day */}
      <div className="space-y-6 flex flex-col h-full">
        <Card className="flex-1 border-none shadow-xl bg-white dark:bg-slate-900 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-bold">Agenda del Día</CardTitle>
                <CardDescription className="capitalize">
                  {format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}
                </CardDescription>
              </div>
              <Button size="icon" className="h-10 w-10 rounded-xl shadow-lg shadow-primary/20">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-y-auto custom-scrollbar">
            <div className="p-6 space-y-6">
              {appointmentsForSelectedDate.length > 0 ? (
                appointmentsForSelectedDate.map((app) => (
                  <div key={app.id} className="relative pl-6 border-l-2 border-primary/30 py-1 hover:border-primary transition-colors">
                    <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-primary border-4 border-white dark:border-slate-900 shadow-sm"></div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {format(new Date(app.startTime), "HH:mm")} - {format(new Date(app.endTime), "HH:mm")}
                        </span>
                        <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-tighter">
                          {app.status === "SCHEDULED" ? "Programada" : "Completada"}
                        </Badge>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{app.patient.user.fullName}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        Consultorio Principal
                      </p>
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="h-8 text-xs font-bold rounded-lg px-4 border-slate-200">
                          Detalles
                        </Button>
                        <Button size="sm" className="h-8 text-xs font-bold rounded-lg px-4 bg-slate-900 text-white hover:bg-slate-800">
                          Comenzar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
                  <CalendarIcon className="h-12 w-12 mb-4" />
                  <p className="font-bold text-slate-900 dark:text-white">Sin citas programadas</p>
                  <p className="text-xs text-slate-500 mt-1">Disfruta de tu tiempo libre.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Mini stats or reminder box */}
        <Card className="p-6 border-none shadow-lg bg-slate-900 text-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-2xl">
              <Clock className="h-6 w-6 text-primary-light" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Próxima Cita en</p>
              <p className="text-xl font-bold">45 Minutos</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
