"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Users, FileText, Activity } from "lucide-react"

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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat, index) => (
        <Card key={index} className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
