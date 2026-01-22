"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, FileText, Activity } from "lucide-react"
import { motion } from "motion/react"
import { fadeInUp, staggerContainer } from "@/lib/animations"

interface DoctorStatsProps
{
  stats: {
    appointmentsToday: number
    totalPatients: number
    newResults: number
    pendingAppointments: number
  }
}

export function DoctorStats({ stats }: DoctorStatsProps)
{
  const statCards = [
    {
      title: "Citas Hoy",
      value: stats.appointmentsToday,
      icon: Calendar,
      description: "Pacientes programados para hoy",
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Pacientes Totales",
      value: stats.totalPatients,
      icon: Users,
      description: "Pacientes registrados con usted",
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Resultados Nuevos",
      value: stats.newResults,
      icon: FileText,
      description: "Resultados de lab. por revisar",
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      title: "Pendientes",
      value: stats.pendingAppointments,
      icon: Activity,
      description: "Citas por confirmar",
      color: "text-amber-600",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
    },
  ]

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
    >
      {statCards.map((stat, index) => (
        <motion.div
          key={index}
          variants={fadeInUp}
          whileHover="hover"
          whileTap="tap"
          custom={index}
        >
          <Card className="overflow-hidden transition-all hover:shadow-lg border-none shadow-md bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</CardTitle>
              <div className={`p-2 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  {stat.value}
                </motion.span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">{stat.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}
