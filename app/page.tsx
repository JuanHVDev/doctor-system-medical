"use client"

import { Navigation } from "@/components/landing/Navigation"
import { HeroSection } from "@/components/landing/HeroSection"
import { FeaturesSection } from "@/components/landing/FeaturesSection"
import { ProcessSection } from "@/components/landing/ProcessSection"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"
import { SecuritySection } from "@/components/landing/SecuritySection"
import { FinalCTASection } from "@/components/landing/FinalCTASection"
import { motion } from "motion/react"
import { staggerContainer, fadeInUp } from "@/lib/animations"

export default function Home()
{
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <motion.main
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <HeroSection />
        <FeaturesSection />
        <ProcessSection />
        <TestimonialsSection />
        <SecuritySection />
        <FinalCTASection />
      </motion.main>

      {/* Footer */}
      <motion.footer
        variants={fadeInUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="bg-gray-900 text-white py-12"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <span className="text-xl font-bold">MedApp</span>
              </div>
              <p className="text-gray-400">
                La plataforma más segura y moderna para gestionar sus citas médicas.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Características</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">Cómo Funciona</a></li>
                <li><a href="#security" className="hover:text-white transition-colors">Seguridad</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Servicio</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Soporte 24/7</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HIPAA</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 MedApp. Todos los derechos reservados.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
