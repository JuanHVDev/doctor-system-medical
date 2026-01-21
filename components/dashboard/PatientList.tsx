"use client"

import { useState } from "react"
import
  {
    Search,
    User,
    Phone,
    Mail,
    ChevronRight,
    MoreHorizontal,
    FileText,
    Calendar,
    Filter
  } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import
  {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

interface Patient
{
  id: string
  user: {
    fullName: string
    email: string | null
    image: string | null
  }
  bloodType: string | null
  lastVisit?: string
}

interface PatientListProps
{
  patients: Patient[]
}

export function PatientList({ patients }: PatientListProps)
{
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPatients = patients.filter(patient =>
    patient.user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (patient.user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o correo..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Agenda
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <Card key={patient.id} className="group hover:shadow-lg transition-all border-slate-200 dark:border-slate-800">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-white dark:border-slate-800 shadow-sm">
                    <AvatarImage src={patient.user.image || ""} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {patient.user.fullName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base font-bold group-hover:text-primary transition-colors">
                      {patient.user.fullName}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">{patient.user.email || "Sin correo"}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                    <DropdownMenuItem className="gap-2">
                      <User className="h-4 w-4" /> Ver Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <FileText className="h-4 w-4" /> Historial Clínico
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 text-primary font-medium">
                      <Calendar className="h-4 w-4" /> Agendar Cita
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex items-center justify-between mt-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Tipo de Sangre</span>
                    <Badge variant="secondary" className="mt-1 w-fit font-bold">
                      {patient.bloodType || "N/A"}
                    </Badge>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Última Visita</span>
                    <span className="text-sm font-medium mt-1">
                      {patient.lastVisit ? patient.lastVisit : "Ninguna aún"}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" className="w-full mt-6 gap-2 group/btn" asChild>
                  <a href={`/doctor/pacientes/${patient.id}`}>
                    Ver detalles completos
                    <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-12 flex flex-col items-center justify-center border-2 border-dashed rounded-3xl border-slate-200 dark:border-slate-800">
            <Users className="h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold">No se encontraron pacientes</h3>
            <p className="text-sm text-slate-500">Intente con otro término de búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
