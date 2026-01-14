"use client"

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Users, Stethoscope, Shield, Zap } from "lucide-react"
import { fadeInUp, scaleIn } from "@/lib/animations"
import Link from "next/link"

export function FinalCTASection()
{
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="show"
          className="absolute top-10 right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="show"
          className="absolute bottom-10 left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center text-white max-w-4xl mx-auto"
        >
          {/* Trust Icons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
              <Shield className="w-4 h-4 mr-2" />
              100% Seguro
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Registro Rápido
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              50K+ Usuarios
            </Badge>
          </div>

          {/* Main Headline */}
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            ¿Listo para Transformar su
            <br />
            <span className="text-yellow-300">Experiencia Médica</span>?
          </h2>

          <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-2xl mx-auto">
            Únase a miles de pacientes y doctores que ya están disfrutando de una gestión médica más inteligente y segura.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/register">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4 font-semibold shadow-xl">
                  <Users className="mr-2 w-5 h-5" />
                  Registrarse
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Additional Benefits */}
          <div className="grid md:grid-cols-3 gap-6 text-white/80">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">2 Minutos</div>
              <div className="text-sm">Tiempo de Registro</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">24/7</div>
              <div className="text-sm">Soporte Disponible</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">Gratis</div>
              <div className="text-sm">Sin Costos Ocultos</div>
            </div>
          </div>
        </motion.div>
      </div >

      {/* Bottom Wave */}
      < div className="absolute bottom-0 left-0 right-0" >
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="currentColor" className="text-white" />
        </svg>
      </div >
    </section >
  )
}