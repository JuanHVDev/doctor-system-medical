"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format, addDays, startOfDay, isBefore, isAfter, setHours, setMinutes, isSameDay } from "date-fns"
import { es } from "date-fns/locale"
import { Calendar as CalendarIcon, Clock, User, ChevronRight, ChevronLeft, CheckCircle2, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MEDICAL_SPECIALTIES } from "@/lib/data/specialties"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

const bookingSchema = z.object({
  specialty: z.string().min(1, "Selecciona una especialidad"),
  doctorId: z.string().min(1, "Selecciona un médico"),
  date: z.date({
    required_error: "Selecciona una fecha para tu cita",
  }),
  timeSlot: z.string().min(1, "Selecciona un horario"),
  reason: z.string().min(5, "Cuéntanos brevemente el motivo de tu consulta (mín. 5 caracteres)"),
})

type BookingFormValues = z.infer<typeof bookingSchema>

interface Doctor
{
  id: string;
  fullName: string;
  specialization: string;
  availableDays: string[];
  startTime: string;
  endTime: string;
}

interface BookingFormProps
{
  doctors: Doctor[];
  patientId: string;
}

export function BookingForm({ doctors, patientId }: BookingFormProps)
{
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      specialty: "",
      doctorId: "",
      timeSlot: "",
      reason: "",
    },
  })

  const selectedSpecialty = form.watch("specialty")
  const selectedDoctorId = form.watch("doctorId")
  const selectedDate = form.watch("date")
  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId)

  const filteredDoctors = doctors.filter(
    (d) => d.specialization.toLowerCase() === selectedSpecialty.toLowerCase()
  )

  const generateTimeSlots = (doctor: Doctor, date: Date) =>
  {
    if (!doctor.startTime || !doctor.endTime) return []

    const [startH, startM] = doctor.startTime.split(":").map(Number)
    const [endH, endM] = doctor.endTime.split(":").map(Number)

    const slots = []
    let current = setMinutes(setHours(startOfDay(date), startH), startM)
    const end = setMinutes(setHours(startOfDay(date), endH), endM)

    while (isBefore(current, end))
    {
      slots.push(format(current, "HH:mm"))
      current = addMinutes(current, 30)
    }

    return slots
  }

  const addMinutes = (date: Date, minutes: number) =>
  {
    return new Date(date.getTime() + minutes * 60000)
  }

  const onSubmit = async (values: BookingFormValues) =>
  {
    setIsSubmitting(true)
    try
    {
      const [hours, minutes] = values.timeSlot.split(":").map(Number)
      const startTime = setMinutes(setHours(new Date(values.date), hours), minutes)
      const endTime = addMinutes(startTime, 30)

      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId,
          doctorId: values.doctorId,
          startTime,
          endTime,
          reason: values.reason,
          appointmentType: "ROUTINE_CHECKUP",
        }),
      })

      if (response.ok)
      {
        setStep(4) // Success step
      } else
      {
        alert("Error al agendar la cita. Por favor intente de nuevo.")
      }
    } catch (error)
    {
      console.error(error)
      alert("Ocurrió un error inesperado.")
    } finally
    {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  return (
    <Card className="max-w-4xl mx-auto shadow-xl border-t-4 border-t-primary">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-primary">
            <CalendarIcon className="w-5 h-5" />
            <span className="font-bold uppercase tracking-wider text-xs">Agendamiento de Cita</span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-1.5 w-8 rounded-full transition-all",
                  step >= s ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>
        <CardTitle className="text-2xl">
          {step === 1 && "Selecciona Especialidad y Médico"}
          {step === 2 && "Elige Fecha y Horario"}
          {step === 3 && "Confirma los Detalles"}
          {step === 4 && "¡Cita Confirmada!"}
        </CardTitle>
        <CardDescription>
          {step === 1 && "Comienza eligiendo el tipo de atención que necesitas."}
          {step === 2 && "Busca un espacio disponible que se acomode a tu agenda."}
          {step === 3 && "Revisa la información antes de finalizar la reserva."}
          {step === 4 && "Hemos recibido tu solicitud correctamente."}
        </CardDescription>
      </CardHeader>
      <CardContent className="min-h-[400px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-right-4">
                <FormField
                  control={form.control}
                  name="specialty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Especialidad</FormLabel>
                      <Select
                        onValueChange={(val) =>
                        {
                          field.onChange(val)
                          form.setValue("doctorId", "")
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Selecciona una especialidad" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {MEDICAL_SPECIALTIES.map((spec) => (
                            <SelectItem key={spec.id} value={spec.id}>
                              {spec.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="doctorId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Médico Especialista</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedSpecialty}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder={!selectedSpecialty ? "Elige una especialidad primero" : "Busca a tu médico"} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {filteredDoctors.map((doc) => (
                            <SelectItem key={doc.id} value={doc.id}>
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <span>{doc.fullName}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Motivo de la Consulta</FormLabel>
                        <FormControl>
                          <textarea
                            {...field}
                            className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Ej: Control de rutina, dolor persistente en rodilla derecha..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-right-4">
                <div className="space-y-4">
                  <FormLabel>Fecha de la Cita</FormLabel>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => form.setValue("date", date as Date)}
                    disabled={(date) =>
                      isBefore(date, startOfDay(new Date())) ||
                      (selectedDoctor && !selectedDoctor.availableDays.includes(format(date, "EEEE", { locale: es }).charAt(0).toUpperCase() + format(date, "EEEE", { locale: es }).slice(1))) ||
                      false
                    }
                    initialFocus
                    className="rounded-md border shadow-sm"
                    locale={es}
                  />
                </div>

                <div className="space-y-4">
                  <FormLabel>Horario Disponible</FormLabel>
                  {!selectedDate ? (
                    <div className="h-[300px] flex flex-col items-center justify-center text-center p-6 bg-muted/30 rounded-lg border-2 border-dashed">
                      <Clock className="w-10 h-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Selecciona una fecha para ver los horarios disponibles con {selectedDoctor?.fullName}</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto p-1">
                      {selectedDoctor && generateTimeSlots(selectedDoctor, selectedDate).map((slot) => (
                        <Button
                          key={slot}
                          type="button"
                          variant={form.watch("timeSlot") === slot ? "default" : "outline"}
                          className={cn(
                            "h-10 text-xs",
                            form.watch("timeSlot") === slot && "ring-2 ring-primary ring-offset-2"
                          )}
                          onClick={() => form.setValue("timeSlot", slot)}
                        >
                          {slot}
                        </Button>
                      ))}
                    </div>
                  )}
                  <FormMessage name="timeSlot" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in zoom-in-95">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-4 rounded-xl space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Médico</p>
                    <p className="font-bold flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-primary" />
                      {selectedDoctor?.fullName}
                    </p>
                    <p className="text-sm text-muted-foreground">{selectedDoctor?.specialization}</p>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-xl space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Fecha y Hora</p>
                    <p className="font-bold flex items-center gap-2">
                      <CalendarIcon className="w-4 h-4 text-primary" />
                      {selectedDate && format(selectedDate, "PPP", { locale: es })}
                    </p>
                    <p className="text-sm font-medium">A las {form.watch("timeSlot")} hrs</p>
                  </div>
                  <div className="md:col-span-2 bg-muted/30 p-4 rounded-xl space-y-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Motivo de Consulta</p>
                    <p className="text-sm italic">"{form.watch("reason")}"</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl text-sm text-blue-700 dark:text-blue-300">
                  <p className="font-bold mb-1">Nota importante:</p>
                  <p>Por favor, llega 15 minutos antes de tu cita para completar el registro en recepción. Si necesitas cancelar, hazlo con al menos 24 horas de anticipación.</p>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col items-center justify-center text-center space-y-6 py-12 animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-bold">¡Todo listo!</h3>
                  <p className="text-muted-foreground max-w-md">
                    Tu cita ha sido agendada con éxito. Te hemos enviado un correo electrónico con los detalles y un recordatorio para tu calendario.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button asChild variant="outline">
                    <Link href="/paciente">Volver al Panel</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/paciente/citas">Ver Mis Citas</Link>
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
      {step < 4 && (
        <CardFooter className="flex justify-between border-t border-muted/50 pt-6">
          <Button
            variant="ghost"
            onClick={prevStep}
            disabled={step === 1 || isSubmitting}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </Button>

          {step < 3 ? (
            <Button
              onClick={nextStep}
              disabled={
                (step === 1 && (!selectedSpecialty || !selectedDoctorId || form.getValues("reason").length < 5)) ||
                (step === 2 && (!selectedDate || !form.watch("timeSlot")))
              }
              className="flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              Siguiente
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/20"
            >
              {isSubmitting ? "Agendando..." : "Confirmar Reserva"}
              <CheckCircle2 className="w-4 h-4" />
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
