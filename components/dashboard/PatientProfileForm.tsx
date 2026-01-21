"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { User, Phone, MapPin, Heart, Shield, AlertCircle, Save, Calendar as CalendarIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

const profileSchema = z.object({
  fullName: z.string().min(3, "El nombre completo debe tener al menos 3 caracteres"),
  phoneNumber: z.string().optional().nullable(),
  dateOfBirth: z.date().optional().nullable(),
  gender: z.enum(["MALE", "FEMALE", "OTHER", "PREFER_NOT_TO_SAY"]).optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  country: z.string().default("Mexico"),
  bloodType: z.enum(["A_POSITIVE", "A_NEGATIVE", "B_POSITIVE", "B_NEGATIVE", "AB_POSITIVE", "AB_NEGATIVE", "O_POSITIVE", "O_NEGATIVE"]).optional().nullable(),
  allergies: z.string().optional().nullable(),
  medicalHistory: z.string().optional().nullable(),
  height: z.string().optional().nullable(),
  weight: z.string().optional().nullable(),
  emergencyContactName: z.string().optional().nullable(),
  emergencyContactPhone: z.string().optional().nullable(),
  emergencyContactRelation: z.string().optional().nullable(),
  primaryInsurance: z.string().optional().nullable(),
  insurancePolicyNumber: z.string().optional().nullable(),
  insuranceGroupNumber: z.string().optional().nullable(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

interface PatientProfileFormProps
{
  initialData: any;
}

export function PatientProfileForm({ initialData }: PatientProfileFormProps)
{
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: initialData?.fullName || "",
      phoneNumber: initialData?.phoneNumber || "",
      dateOfBirth: initialData?.dateOfBirth ? new Date(initialData.dateOfBirth) : null,
      gender: initialData?.gender || null,
      address: initialData?.address || "",
      city: initialData?.city || "",
      state: initialData?.state || "",
      zipCode: initialData?.zipCode || "",
      country: initialData?.country || "Mexico",
      bloodType: initialData?.bloodType || null,
      allergies: initialData?.allergies || "",
      medicalHistory: initialData?.medicalHistory || "",
      height: initialData?.height?.toString() || "",
      weight: initialData?.weight?.toString() || "",
      emergencyContactName: initialData?.emergencyContactName || "",
      emergencyContactPhone: initialData?.emergencyContactPhone || "",
      emergencyContactRelation: initialData?.emergencyContactRelation || "",
      primaryInsurance: initialData?.primaryInsurance || "",
      insurancePolicyNumber: initialData?.insurancePolicyNumber || "",
      insuranceGroupNumber: initialData?.insuranceGroupNumber || "",
    },
  })

  const onSubmit = async (values: ProfileFormValues) =>
  {
    setIsSubmitting(true)
    try
    {
      const response = await fetch("/api/patient/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      if (response.ok)
      {
        router.refresh()
        alert("¡Perfil actualizado con éxito!")
      } else
      {
        alert("Error al actualizar el perfil.")
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-20">
        {/* Información Personal */}
        <Card className="border-t-4 border-t-primary shadow-lg overflow-hidden">
          <CardHeader className="bg-muted/30">
            <div className="flex items-center gap-2 text-primary mb-1">
              <User className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider text-xs">Información Básica</span>
            </div>
            <CardTitle>Datos Personales</CardTitle>
            <CardDescription>Tu información básica de contacto e identificación.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Juan Pérez" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input {...field} value={field.value || ""} className="pl-9" placeholder="+52 55..." />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de Nacimiento</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal h-10",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP", { locale: es })
                          ) : (
                            <span>Seleccionar fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value || undefined}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        locale={es}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Género</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona género" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MALE">Masculino</SelectItem>
                      <SelectItem value="FEMALE">Femenino</SelectItem>
                      <SelectItem value="OTHER">Otro</SelectItem>
                      <SelectItem value="PREFER_NOT_TO_SAY">Prefiero no decirlo</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="lg:col-span-2">
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input {...field} value={field.value || ""} className="pl-9" placeholder="Calle, número, colonia..." />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Información Médica */}
        <Card className="border-t-4 border-t-rose-500 shadow-lg overflow-hidden">
          <CardHeader className="bg-muted/30">
            <div className="flex items-center gap-2 text-rose-500 mb-1">
              <Heart className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider text-xs">Salud</span>
            </div>
            <CardTitle>Información Médica</CardTitle>
            <CardDescription>Datos clave para tu atención médica profesional.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            <FormField
              control={form.control}
              name="bloodType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Sangre</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {["A_POSITIVE", "A_NEGATIVE", "B_POSITIVE", "B_NEGATIVE", "AB_POSITIVE", "AB_NEGATIVE", "O_POSITIVE", "O_NEGATIVE"].map(type => (
                        <SelectItem key={type} value={type}>{type.replace("_", " ")}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Altura (cm)</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} type="number" step="0.1" placeholder="175" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peso (kg)</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} type="number" step="0.1" placeholder="70.5" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="md:col-span-2 lg:col-span-4">
              <FormField
                control={form.control}
                name="allergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alergias</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        value={field.value || ""}
                        className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        placeholder="Ej: Penicilina, Polen, Maní..."
                      />
                    </FormControl>
                    <FormDescription>Si no tienes alergias conocidas, deja este campo en blanco.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contacto de Emergencia */}
        <Card className="border-t-4 border-t-orange-500 shadow-lg overflow-hidden">
          <CardHeader className="bg-muted/30">
            <div className="flex items-center gap-2 text-orange-500 mb-1">
              <AlertCircle className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider text-xs">Urgencias</span>
            </div>
            <CardTitle>Contacto de Emergencia</CardTitle>
            <CardDescription>A quién debemos contactar en caso de una situación crítica.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            <FormField
              control={form.control}
              name="emergencyContactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Contacto</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} placeholder="Nombre completo" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergencyContactPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono de Emergencia</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} placeholder="+52 ..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emergencyContactRelation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relación / Parentesco</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} placeholder="Ej: Esposo(a), Madre, Amigo" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Seguro Médico */}
        <Card className="border-t-4 border-t-blue-500 shadow-lg overflow-hidden">
          <CardHeader className="bg-muted/30">
            <div className="flex items-center gap-2 text-blue-500 mb-1">
              <Shield className="w-5 h-5" />
              <span className="font-bold uppercase tracking-wider text-xs">Financiamiento</span>
            </div>
            <CardTitle>Seguro Médico</CardTitle>
            <CardDescription>Detalles de tu proveedor de servicios de salud.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            <FormField
              control={form.control}
              name="primaryInsurance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compañía de Seguro</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} placeholder="Ej: AXA, GNP, MetLife..." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="insurancePolicyNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Póliza</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} placeholder="123456789" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="insuranceGroupNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Grupo (opcional)</FormLabel>
                  <FormControl>
                    <Input {...field} value={field.value || ""} placeholder="GRP-99" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="bg-muted/10 border-t flex justify-end p-6">
            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto gap-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Guardando cambios...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Guardar Perfil
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
