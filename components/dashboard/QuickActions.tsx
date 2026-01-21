"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarPlus, UserCircle, FileText, Activity } from "lucide-react"
import Link from "next/link"

const actions = [
  {
    title: "Agendar Cita",
    description: "Reserva un espacio con un especialista",
    icon: CalendarPlus,
    href: "/paciente/agendar",
    color: "bg-blue-500",
  },
  {
    title: "Mi Perfil",
    description: "Actualiza tu información personal",
    icon: UserCircle,
    href: "/paciente/perfil",
    color: "bg-purple-500",
  },
  {
    title: "Historial Médico",
    description: "Ver diagnósticos y tratamientos",
    icon: FileText,
    href: "/paciente/historial",
    color: "bg-green-500",
  },
  {
    title: "Indicadores",
    description: "Ver tus estadísticas de salud",
    icon: Activity,
    href: "/paciente/indicadores",
    color: "bg-rose-500",
  },
]

export function QuickActions()
{
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action) => (
          <Button
            key={action.title}
            variant="outline"
            asChild
            className="h-auto p-4 flex items-start justify-start gap-4 hover:bg-muted/50 transition-all border-2 hover:border-primary/20"
          >
            <Link href={action.href}>
              <div className={`${action.color} p-2 rounded-lg text-white shadow-sm`}>
                <action.icon className="w-5 h-5" />
              </div>
              <div className="flex flex-col items-start overflow-hidden">
                <span className="font-bold text-sm">{action.title}</span>
                <span className="text-[10px] text-muted-foreground truncate w-full">
                  {action.description}
                </span>
              </div>
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
