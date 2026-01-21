"use client"

import { useState } from "react"
import { format, isBefore } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar, Clock, User, MapPin, MoreVertical, XCircle, AlertTriangle, CheckCircle2, History } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface Appointment
{
  id: string;
  startTime: Date;
  endTime: Date;
  status: string;
  appointmentType: string;
  reason: string | null;
  doctor: {
    fullName: string;
    specialization: string | null;
    officeLocation: string | null;
  };
}

interface AppointmentsClientProps
{
  appointments: Appointment[];
}

export function AppointmentsClient({ appointments }: AppointmentsClientProps)
{
  const [isCancelling, setIsCancelling] = useState<string | null>(null)
  const router = useRouter()

  const upcoming = appointments.filter(app =>
    new Date(app.startTime) >= new Date() && ["SCHEDULED", "CONFIRMED"].includes(app.status)
  ).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  const history = appointments.filter(app =>
    new Date(app.startTime) < new Date() || ["CANCELLED", "COMPLETED", "NO_SHOW"].includes(app.status)
  ).sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());

  const handleCancel = async (id: string) =>
  {
    if (!confirm("¿Estás seguro de que deseas cancelar esta cita? Esta acción no se puede deshacer.")) return;

    setIsCancelling(id)
    try
    {
      const response = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELLED" }),
      })

      if (response.ok)
      {
        router.refresh()
      } else
      {
        alert("No se pudo cancelar la cita. Por favor intenta de nuevo.")
      }
    } catch (error)
    {
      console.error(error)
    } finally
    {
      setIsCancelling(null)
    }
  }

  const getStatusBadge = (status: string) =>
  {
    switch (status)
    {
      case "SCHEDULED": return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 uppercase text-[10px]">Programada</Badge>;
      case "CONFIRMED": return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 uppercase text-[10px]">Confirmada</Badge>;
      case "COMPLETED": return <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 uppercase text-[10px]">Completada</Badge>;
      case "CANCELLED": return <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200 uppercase text-[10px]">Cancelada</Badge>;
      default: return <Badge variant="outline" className="uppercase text-[10px]">{status}</Badge>;
    }
  }

  return (
    <Tabs defaultValue="upcoming" className="w-full">
      <div className="flex items-center justify-between mb-6">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Próximas ({upcoming.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="w-4 h-4" />
            Historial
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="upcoming" className="space-y-4 animate-in fade-in slide-in-from-left-4">
        {upcoming.length === 0 ? (
          <Card className="border-dashed py-12">
            <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="p-4 bg-muted rounded-full">
                <Calendar className="w-10 h-10 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="font-bold">No tienes citas próximas</p>
                <p className="text-sm text-muted-foreground">Cuando agendes una cita, aparecerá aquí.</p>
              </div>
              <Button asChild>
                <a href="/paciente/agendar">Agendar mi primera cita</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcoming.map((app) => (
              <Card key={app.id} className="overflow-hidden border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      {getStatusBadge(app.status)}
                      <CardTitle className="text-lg pt-1">{app.appointmentType.replace(/_/g, ' ')}</CardTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="text-rose-600 focus:text-rose-600" onClick={() => handleCancel(app.id)} disabled={isCancelling === app.id}>
                          <XCircle className="w-4 h-4 mr-2" />
                          {isCancelling === app.id ? "Cancelando..." : "Cancelar Cita"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 font-bold px-3 py-1.5 bg-muted rounded-lg">
                      <Calendar className="w-4 h-4 text-primary" />
                      {format(new Date(app.startTime), "d 'de' MMMM", { locale: es })}
                    </div>
                    <div className="flex items-center gap-2 font-bold px-3 py-1.5 bg-muted rounded-lg">
                      <Clock className="w-4 h-4 text-primary" />
                      {format(new Date(app.startTime), "HH:mm")}
                    </div>
                  </div>

                  <div className="space-y-2 border-t pt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Médico Especialista</p>
                        <p className="text-sm font-bold">{app.doctor.fullName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Ubicación</p>
                        <p className="text-sm">{app.doctor.officeLocation || "Centro Médico AG Health"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="history" className="space-y-4 animate-in fade-in slide-in-from-right-4">
        <div className="rounded-md border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Fecha</th>
                <th className="px-4 py-3 text-left font-medium">Médico</th>
                <th className="px-4 py-3 text-left font-medium">Servicio</th>
                <th className="px-4 py-3 text-left font-medium">Estado</th>
                <th className="px-4 py-3 text-right font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {history.map((app) => (
                <tr key={app.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-medium whitespace-nowrap">
                      {format(new Date(app.startTime), "dd/MM/yyyy")}
                    </div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      {format(new Date(app.startTime), "HH:mm")} hrs
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="font-medium">{app.doctor.fullName}</div>
                    <div className="text-xs text-muted-foreground">{app.doctor.specialization}</div>
                  </td>
                  <td className="px-4 py-4 uppercase text-[10px] font-bold tracking-wider">
                    {app.appointmentType.replace(/_/g, ' ')}
                  </td>
                  <td className="px-4 py-4">
                    {getStatusBadge(app.status)}
                  </td>
                  <td className="px-4 py-4 text-right">
                    <Button variant="ghost" size="sm">Ver Resumen</Button>
                  </td>
                </tr>
              ))}
              {history.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                    No hay registros anteriores.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </TabsContent>
    </Tabs>
  )
}
