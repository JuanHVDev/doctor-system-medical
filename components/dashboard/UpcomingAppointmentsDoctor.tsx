"use client"

import { format } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar, Clock, ChevronRight, CheckCircle2, XCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { motion, AnimatePresence } from "motion/react"
import { fadeInUp, staggerContainer, listItem } from "@/lib/animations"

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
    <Card className="col-span-1 border-none shadow-xl bg-white/80 backdrop-blur-xl dark:bg-slate-900/80 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Citas Próximas
          </CardTitle>
          <CardDescription>Usted tiene {appointments.length} citas para el resto del día.</CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 transition-colors">
          Ver todas
        </Button>
      </CardHeader>
      <CardContent>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          {appointments.length > 0 ? (
            <AnimatePresence mode="popLayout">
              {appointments.map((appointment) => (
                <motion.div
                  key={appointment.id}
                  variants={listItem}
                  layout
                  whileHover={{ x: 5 }}
                  className="group relative flex items-center gap-4 p-4 rounded-2xl transition-all hover:bg-slate-100/80 dark:hover:bg-slate-800/80 border border-transparent hover:border-slate-200/50 dark:hover:border-slate-700/50 shadow-sm hover:shadow-md"
                >
                  <div className="flex flex-col items-center justify-center min-w-16 h-16 rounded-2xl bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <span className="text-lg font-bold">{format(new Date(appointment.startTime), "HH:mm")}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider">{format(new Date(appointment.startTime), "aaa")}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar className="h-8 w-8 border-2 border-white dark:border-slate-800 shadow-sm">
                        <AvatarImage src={appointment.patient.user.image || ""} />
                        <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                          {appointment.patient.user.fullName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <h4 className="font-bold text-slate-900 dark:text-white truncate">
                        {appointment.patient.user.fullName}
                      </h4>
                      <Badge variant="secondary" className="text-[10px] px-2 py-0 font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {appointment.appointmentType === "CONSULTA" ? "Consulta" : "Seguimiento"}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate font-medium">
                      {appointment.reason || "Sin motivo especificado"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button size="icon" variant="ghost" className="h-9 w-9 text-green-600 hover:bg-green-50 hover:text-green-700 rounded-xl">
                        <CheckCircle2 className="h-5 w-5" />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button size="icon" variant="ghost" className="h-9 w-9 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl">
                        <XCircle className="h-5 w-5" />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6 animate-pulse">
                <Clock className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">No tienes citas próximas</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium max-w-[200px]">
                ¡Tu agenda está libre por ahora! Tómate un respiro.
              </p>
            </motion.div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  )
}
