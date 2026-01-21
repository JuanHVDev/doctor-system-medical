import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ExternalLink } from "lucide-react";

interface Appointment
{
  id: string;
  startTime: Date;
  status: string;
  doctor: {
    fullName: string;
    specialization: string | null;
  };
}

interface UpcomingAppointmentsProps
{
  appointments: Appointment[];
}

export function UpcomingAppointments({ appointments }: UpcomingAppointmentsProps)
{
  const getStatusColor = (status: string) =>
  {
    switch (status)
    {
      case "SCHEDULED": return "bg-blue-500/10 text-blue-500 border-blue-200";
      case "CONFIRMED": return "bg-emerald-500/10 text-emerald-500 border-emerald-200";
      case "CANCELLED": return "bg-destructive/10 text-destructive border-destructive-200";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const formatDate = (date: Date) =>
  {
    return new Intl.DateTimeFormat("es-ES", {
      weekday: "short",
      day: "numeric",
      month: "short"
    }).format(new Date(date));
  };

  const formatTime = (date: Date) =>
  {
    return new Intl.DateTimeFormat("es-ES", {
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(date));
  };

  return (
    <Card className="h-full border-border/50 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Próximas Citas</CardTitle>
          <CardDescription>Tienes {appointments.length} citas programadas</CardDescription>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          Ver todas
          <ExternalLink className="w-3 h-3" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto" />
              <p className="text-muted-foreground italic">No tienes citas próximas</p>
              <Button size="sm">Agendar Cita</Button>
            </div>
          ) : (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-transparent hover:border-border hover:bg-muted/50 transition-all"
              >
                <div className="flex gap-4 items-center">
                  <div className="flex flex-col items-center justify-center p-2 min-w-[60px] rounded-lg bg-primary/5 text-primary border border-primary/10">
                    <span className="text-xs font-bold uppercase">{formatDate(appointment.startTime).split(" ")[0]}</span>
                    <span className="text-xl font-bold">{formatDate(appointment.startTime).split(" ")[1]}</span>
                  </div>
                  <div>
                    <h4 className="font-bold flex items-center gap-2">
                      Dr. {appointment.doctor.fullName}
                      <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${getStatusColor(appointment.status)}`}>
                        {appointment.status === "SCHEDULED" ? "Programada" : "Confirmada"}
                      </Badge>
                    </h4>
                    <p className="text-sm text-muted-foreground">{appointment.doctor.specialization || "Medicina General"}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1 font-medium text-foreground">
                        <Clock className="w-3 h-3 text-primary" />
                        {formatTime(appointment.startTime)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 flex gap-2 w-full sm:w-auto">
                  <Button variant="ghost" size="sm" className="grow sm:grow-0">Detalles</Button>
                  <Button variant="outline" size="sm" className="grow sm:grow-0 hover:bg-destructive/5 hover:text-destructive hover:border-destructive/30">Cancelar</Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
