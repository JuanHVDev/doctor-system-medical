"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectGroup, SelectTrigger, SelectValue, SelectItem } from "../ui/select";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type userType = "doctor" | "paciente"

const registerSchema = z.object({
  userType: z.enum(["doctor", "paciente"]),
  fullName: z.string().min(3, "El nombre debe de ser completo"),
  email: z.string().min(1, "El correo electrónico es obligatorio").email("Formato de correo invalido"),
  password: z.string().min(8, "La contraseña debe de tener al menos 8 caracteres"),
  confirmPassword: z.string().min(8, "La contraseña debe de tener al menos 8 caracteres"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"]
})

type RegisterSchema = z.infer<typeof registerSchema>

export default function RegisterForm()
{
  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      userType: "paciente",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  })
  const onSubmit = (data: z.infer<typeof registerSchema>) =>
  {
    const userValidated = registerSchema.safeParse(data)
    console.log(userValidated)
    if (!userValidated.success)
    {
      return
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 text-black">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle>
            Registro
          </CardTitle>
          <CardDescription>
            Crea tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <FieldGroup>
                <Controller
                  name="userType"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        Tipo de Usuario
                      </FieldLabel>
                      <Select name={field.name} value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger id="userType" aria-invalid={fieldState.invalid}>
                          <SelectValue placeholder="Selecciona un tipo de usuario" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="doctor">
                            Doctor
                          </SelectItem>
                          <SelectItem value="paciente">
                            Paciente
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {fieldState.invalid && (
                        <FieldError>
                          {fieldState.error?.message}
                        </FieldError>
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="fullName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        Nombre Completo
                      </FieldLabel>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Introduce tu nombre completo"
                        {...field}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError>
                          {fieldState.error?.message}
                        </FieldError>
                      )}
                    </Field>
                  )}
                ></Controller>
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        Correo Electronico
                      </FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Introduce tu correo electronico"
                        {...field}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError>
                          {fieldState.error?.message}
                        </FieldError>
                      )}
                    </Field>
                  )}
                ></Controller>
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        Contraseña
                      </FieldLabel>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Introduce tu contraseña"
                        {...field}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError>
                          {fieldState.error?.message}
                        </FieldError>
                      )}
                    </Field>
                  )}
                ></Controller>
                <Controller
                  name="confirmPassword"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>
                        Confirmar Contraseña
                      </FieldLabel>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirmar Contraseña"
                        {...field}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError>
                          {fieldState.error?.message}
                        </FieldError>
                      )}
                    </Field>
                  )}
                ></Controller>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full"
                >
                  {form.formState.isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Registrarse
                </Button>
              </FieldGroup>
            </div>
          </form>
        </CardContent>
      </Card>
    </div >
  )
}