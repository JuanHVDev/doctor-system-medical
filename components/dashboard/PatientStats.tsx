import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ClipboardList, Activity, Clock } from "lucide-react";

interface PatientStatsProps
{
  totalAppointments: number;
  completedAppointments: number;
  upcomingAppointments: number;
}

export function PatientStats({ totalAppointments, completedAppointments, upcomingAppointments }: PatientStatsProps)
{
  const stats = [
    {
      title: "Citas Totales",
      value: totalAppointments,
      icon: Calendar,
      description: "Historial completo",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Próximas Citas",
      value: upcomingAppointments,
      icon: Clock,
      description: "Pendientes por asistir",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "Citas Completadas",
      value: completedAppointments,
      icon: ClipboardList,
      description: "Visitas finalizadas",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Nivel de Salud",
      value: "Excelente",
      icon: Activity,
      description: "Según tu historial",
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-border/50 shadow-sm overflow-hidden relative group transition-all hover:shadow-md hover:border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`p-2 rounded-lg ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
              <stat.icon className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
