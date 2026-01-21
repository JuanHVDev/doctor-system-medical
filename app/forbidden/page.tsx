"use client";

import Link from "next/link";
import { ShieldAlert, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function ForbiddenPage()
{
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center space-y-8 z-10"
      >
        <div className="flex justify-center">
          <div className="p-4 bg-destructive/10 rounded-full ring-8 ring-destructive/5">
            <ShieldAlert className="w-16 h-16 text-destructive" strokeWidth={1.5} />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
            Acceso Denegado
          </h1>
          <p className="text-xl text-muted-foreground">
            Lo sentimos, no tienes los permisos necesarios para acceder a esta página.
          </p>
        </div>

        <div className="p-6 bg-card border border-border/50 rounded-2xl shadow-xl backdrop-blur-sm">
          <p className="text-sm text-muted-foreground mb-6">
            Si crees que esto es un error, por favor contacta con el administrador del sistema o intenta iniciar sesión con una cuenta diferente.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row justify-center">
            <Button asChild variant="default" size="lg" className="gap-2 px-8">
              <Link href="/">
                <Home className="w-4 h-4" />
                Ir al Inicio
              </Link>
            </Button>
            <Button onClick={() => window.history.back()} variant="outline" size="lg" className="gap-2 px-8">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>
          </div>
        </div>

        <div className="pt-4">
          <p className="text-xs text-muted-foreground/50 uppercase tracking-widest font-semibold">
            Error 403 • Forbidden
          </p>
        </div>
      </motion.div>
    </div>
  );
}
