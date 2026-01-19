"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Field, FieldLabel, FieldError, FieldGroup } from "../ui/field";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().min(1, "El correo electrónico es obligatorio").email("Formato de correo inválido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
})

type LoginSchema = z.infer<typeof loginSchema>

export default function LoginForm()
{
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const onSubmit = async (data: LoginSchema) =>
  {
    setError(null);
    const { email, password } = data;

    await signIn.email({
      email,
      password,
      callbackURL: "/",
    }, {
      onRequest: () =>
      {
        // Loading state is handled by form.formState.isSubmitting
      },
      onSuccess: async () =>
      {
        form.reset();
        router.push("/");
        router.refresh();
      },
      onError: (ctx) =>
      {
        // Better Auth normally returns generic errors, but we can customize or interpret them
        if (ctx.error.status === 401 || ctx.error.code === "INVALID_EMAIL_OR_PASSWORD")
        {
          setError("Correo electrónico o contraseña incorrectos");
        } else
        {
          setError(ctx.error.message || "Ocurrió un error inesperado");
        }
      }
    });
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <Card className="shadow-lg border-none bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Iniciar Sesión
          </CardTitle>
          <CardDescription>
            Introduce tus credenciales para acceder a tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg mb-6 text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
              <span className="font-medium">{error}</span>
            </div>
          )}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FieldGroup className="space-y-4">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <FieldLabel htmlFor="email" className="text-sm font-medium">
                      Correo Electrónico
                    </FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="usuario@ejemplo.com"
                      className="h-11"
                      {...field}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError className="text-xs font-medium text-destructive">
                        {fieldState.error?.message}
                      </FieldError>
                    )}
                  </div>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor="password" className="text-sm font-medium">
                        Contraseña
                      </FieldLabel>
                      <Link
                        href="/forgot-password"
                        className="text-xs font-medium text-primary hover:underline underline-offset-4"
                      >
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="h-11"
                      {...field}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError className="text-xs font-medium text-destructive">
                        {fieldState.error?.message}
                      </FieldError>
                    )}
                  </div>
                )}
              />
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full h-11 text-base font-semibold transition-all hover:scale-[1.01]"
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : null}
                {form.formState.isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
              </Button>
            </FieldGroup>
          </form>
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">¿No tienes una cuenta? </span>
            <Link
              href="/register"
              className="font-semibold text-primary hover:underline underline-offset-4"
            >
              Regístrate aquí
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
