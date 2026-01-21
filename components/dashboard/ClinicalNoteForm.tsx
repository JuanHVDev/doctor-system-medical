"use client"

import { useState } from "react"
import { Plus, Trash2, Save, X, Pill, Stethoscope, ClipboardList } from "lucide-react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import
  {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

const prescriptionSchema = z.object({
  medication: z.string().min(1, "El medicamento es requerido"),
  dosage: z.string().min(1, "La dosis es requerida"),
  frequency: z.string().min(1, "La frecuencia es requerida"),
  duration: z.string().min(1, "La duración es requerida"),
  instructions: z.string().optional(),
})

const medicalRecordSchema = z.object({
  diagnosis: z.string().min(3, "El diagnóstico es requerido"),
  treatment: z.string().min(3, "El tratamiento es requerido"),
  notes: z.string().optional(),
  prescriptions: z.array(prescriptionSchema),
})

type MedicalRecordValues = z.infer<typeof medicalRecordSchema>

interface ClinicalNoteFormProps
{
  patientId: string
  appointmentId?: string
  patientName: string
  onClose: () => void
  onSuccess?: () => void
}

export function ClinicalNoteForm({
  patientId,
  appointmentId,
  patientName,
  onClose,
  onSuccess
}: ClinicalNoteFormProps)
{
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<MedicalRecordValues>({
    resolver: zodResolver(medicalRecordSchema),
    defaultValues: {
      diagnosis: "",
      treatment: "",
      notes: "",
      prescriptions: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: "prescriptions",
    control: form.control,
  })

  async function onSubmit(data: MedicalRecordValues)
  {
    setIsSubmitting(true)
    try
    {
      const response = await fetch("/api/doctor/medical-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          patientId,
          appointmentId,
        }),
      })

      if (response.ok)
      {
        toast.success("Registro médico creado con éxito")
        if (onSuccess) onSuccess()
        onClose()
      } else
      {
        toast.error("Error al crear el registro médico")
      }
    } catch (error)
    {
      console.error("Error submitting medical record:", error)
      toast.error("Ocurrió un error inesperado")
    } finally
    {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 max-h-[85vh] overflow-y-auto pr-2 custom-scrollbar">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Stethoscope className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Nota Clínica</h2>
            <p className="text-sm text-muted-foreground">Paciente: <span className="font-semibold text-foreground">{patientName}</span></p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-6">
            <FormField
              control={form.control}
              name="diagnosis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <ClipboardList className="h-4 w-4 text-blue-500" />
                    Diagnóstico Principal
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Ej. Hipertensión esencial, Gripe común..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="treatment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plan de Tratamiento</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describa el plan de acción, recomendaciones dieta/ejercicio..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observaciones / Notas Adicionales</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Alguna observación relevante de la consulta..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pill className="h-5 w-5 text-purple-500" />
                <h3 className="text-lg font-bold">Prescripciones</h3>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => append({ medication: "", dosage: "", frequency: "", duration: "", instructions: "" })}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Agregar Medicamento
              </Button>
            </div>

            {fields.length > 0 ? (
              <div className="grid gap-4">
                {fields.map((field, index) => (
                  <Card key={field.id} className="bg-slate-50 dark:bg-slate-900 border-none shadow-sm overflow-hidden">
                    <CardHeader className="py-3 bg-slate-100 dark:bg-slate-800 flex flex-row items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-white dark:bg-slate-900 font-bold">#{index + 1}</Badge>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Receta Médica</span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name={`prescriptions.${index}.medication`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Nombre del Medicamento</FormLabel>
                              <FormControl>
                                <Input placeholder="Ej. Paracetamol 500mg" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name={`prescriptions.${index}.dosage`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Dosis</FormLabel>
                            <FormControl>
                              <Input placeholder="Ej. 1 tableta" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`prescriptions.${index}.frequency`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Frecuencia</FormLabel>
                            <FormControl>
                              <Input placeholder="Ej. Cada 8 horas" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`prescriptions.${index}.duration`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs">Duración</FormLabel>
                            <FormControl>
                              <Input placeholder="Ej. Por 5 días" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name={`prescriptions.${index}.instructions`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs">Instrucciones Especiales</FormLabel>
                              <FormControl>
                                <Input placeholder="Ej. Tomar después de las comidas" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center border-2 border-dashed rounded-2xl opacity-50">
                <p className="text-sm font-medium">No se han añadido medicamentos a esta receta.</p>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t sticky bottom-0 bg-white dark:bg-slate-950 pb-2 z-10 mt-auto">
            <Button variant="outline" type="button" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" className="gap-2 px-8" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : (
                <>
                  <Save className="h-4 w-4" />
                  Finalizar Consulta
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
