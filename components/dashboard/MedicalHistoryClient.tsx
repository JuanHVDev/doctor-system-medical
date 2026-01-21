"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import
  {
    FileText,
    Pill,
    Beaker,
    Calendar as CalendarIcon,
    User,
    Download,
    ChevronRight,
    Search,
    PlusCircle,
    FileDown
  } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import
  {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
  } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Prescription
{
  id: string
  medication: string
  dosage: string
  frequency: string
  duration: string
  instructions: string | null
}

interface MedicalRecord
{
  id: string
  diagnosis: string
  treatment: string
  notes: string | null
  date: string
  doctor: {
    user: {
      fullName: string
    }
  }
  prescriptions: Prescription[]
}

interface LabResult
{
  id: string
  testName: string
  result: string
  category: string
  date: string
  attachmentUrl: string | null
}

export default function MedicalHistoryClient()
{
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([])
  const [labResults, setLabResults] = useState<LabResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() =>
  {
    const fetchHistory = async () =>
    {
      try
      {
        const response = await fetch("/api/patient/medical-history")
        if (response.ok)
        {
          const data = await response.json()
          setMedicalRecords(data.medicalRecords)
          setLabResults(data.labResults)
        }
      } catch (error)
      {
        console.error("Error fetching medical history:", error)
      } finally
      {
        setIsLoading(false)
      }
    }

    fetchHistory()
  }, [])

  const allPrescriptions = medicalRecords.flatMap(record =>
    record.prescriptions.map(p => ({
      ...p,
      date: record.date,
      doctorName: record.doctor.user.fullName
    }))
  )

  const filteredRecords = medicalRecords.filter(r =>
    r.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.doctor.user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredPrescriptions = allPrescriptions.filter(p =>
    p.medication.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredLabs = labResults.filter(l =>
    l.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading)
  {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Historial Médico</h1>
          <p className="text-muted-foreground">Consulta tus registros, recetas y resultados de laboratorio.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <FileDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="records" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="records" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden md:inline">Registros</span>
            <span className="inline md:hidden">Reg.</span>
          </TabsTrigger>
          <TabsTrigger value="prescriptions" className="flex items-center gap-2">
            <Pill className="h-4 w-4" />
            <span className="hidden md:inline">Recetas</span>
            <span className="inline md:hidden">Rec.</span>
          </TabsTrigger>
          <TabsTrigger value="labs" className="flex items-center gap-2">
            <Beaker className="h-4 w-4" />
            <span className="hidden md:inline">Laboratorio</span>
            <span className="inline md:hidden">Lab.</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="mt-6">
          <div className="grid gap-4">
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <Card key={record.id} className="overflow-hidden transition-all hover:shadow-md">
                  <div className="flex border-l-4 border-primary">
                    <CardHeader className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CalendarIcon className="h-4 w-4" />
                          {format(new Date(record.date), "PPP", { locale: es })}
                        </div>
                        <Badge variant="secondary">{record.doctor.user.fullName}</Badge>
                      </div>
                      <CardTitle className="text-xl">{record.diagnosis}</CardTitle>
                      <CardDescription className="line-clamp-2">{record.treatment}</CardDescription>
                    </CardHeader>
                    <div className="flex items-center justify-center p-6">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="h-5 w-5" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <div className="flex items-center gap-2 text-primary">
                              <FileText className="h-5 w-5" />
                              <span className="font-semibold uppercase tracking-wider text-xs">Registro Médico</span>
                            </div>
                            <DialogTitle className="text-2xl">{record.diagnosis}</DialogTitle>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-1">
                              <span className="flex items-center gap-1">
                                <CalendarIcon className="h-4 w-4" />
                                {format(new Date(record.date), "PPP", { locale: es })}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                Dr. {record.doctor.user.fullName}
                              </span>
                            </div>
                          </DialogHeader>

                          <div className="space-y-6 pt-4">
                            <div>
                              <h4 className="font-semibold mb-2">Tratamiento</h4>
                              <p className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                                {record.treatment}
                              </p>
                            </div>

                            {record.notes && (
                              <div>
                                <h4 className="font-semibold mb-2">Notas del Médico</h4>
                                <p className="text-sm text-muted-foreground italic">
                                  "{record.notes}"
                                </p>
                              </div>
                            )}

                            {record.prescriptions.length > 0 && (
                              <div>
                                <h4 className="font-semibold mb-3">Receta Adjunta</h4>
                                <div className="space-y-3">
                                  {record.prescriptions.map((p) => (
                                    <div key={p.id} className="flex flex-col gap-1 p-3 border rounded-lg bg-card">
                                      <div className="flex items-center justify-between">
                                        <span className="font-medium text-primary">{p.medication}</span>
                                        <Badge variant="outline">{p.duration}</Badge>
                                      </div>
                                      <div className="text-xs text-muted-foreground">
                                        {p.dosage} - {p.frequency}
                                      </div>
                                      {p.instructions && (
                                        <p className="text-xs mt-1 border-t pt-1">
                                          {p.instructions}
                                        </p>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex justify-end pt-4 border-t">
                              <Button variant="outline" className="gap-2">
                                <Download className="h-4 w-4" />
                                Descargar PDF
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/25 text-center">
                <FileText className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <h3 className="text-lg font-semibold">No hay registros</h3>
                <p className="text-sm text-muted-foreground">No se encontraron registros médicos para tu búsqueda.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="prescriptions" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPrescriptions.length > 0 ? (
              filteredPrescriptions.map((p) => (
                <Card key={p.id} className="relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <Pill className="h-8 w-8 text-primary/20" />
                  </div>
                  <CardHeader>
                    <div className="text-xs text-muted-foreground mb-1">
                      {format(new Date(p.date), "PPP", { locale: es })}
                    </div>
                    <CardTitle className="text-lg text-primary">{p.medication}</CardTitle>
                    <CardDescription>Indicada por Dr. {p.doctorName}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Dosis:</span>
                      <span className="font-medium">{p.dosage}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Frecuencia:</span>
                      <span className="font-medium">{p.frequency}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Duración:</span>
                      <span className="font-medium">{p.duration}</span>
                    </div>
                    <Separator />
                    {p.instructions && (
                      <p className="text-xs text-muted-foreground line-clamp-2 italic">
                        "{p.instructions}"
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full h-64 flex flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/25 text-center">
                <Pill className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <h3 className="text-lg font-semibold">No hay recetas</h3>
                <p className="text-sm text-muted-foreground">No se encontraron prescripciones activas o pasadas.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="labs" className="mt-6">
          <div className="space-y-4">
            {filteredLabs.length > 0 ? (
              filteredLabs.map((lab) => (
                <div key={lab.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Beaker className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="font-semibold">{lab.testName}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                        <span>{lab.category}</span>
                        <span>•</span>
                        <span>{format(new Date(lab.date), "PPP", { locale: es })}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={lab.result.toLowerCase().includes("normal") ? "outline" : "destructive"}>
                      {lab.result}
                    </Badge>
                    {lab.attachmentUrl ? (
                      <Button variant="ghost" size="icon" asChild>
                        <a href={lab.attachmentUrl} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4" />
                        </a>
                      </Button>
                    ) : (
                      <Button variant="ghost" size="icon" disabled title="No hay archivo adjunto">
                        <Download className="h-4 w-4 opacity-50" />
                      </Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/25 text-center">
                <Beaker className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <h3 className="text-lg font-semibold">No hay resultados</h3>
                <p className="text-sm text-muted-foreground">No se han cargado resultados de laboratorio recientemente.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
