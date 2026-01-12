"use client"

import { motion } from "motion/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { processSteps } from "@/lib/landing-data"
import { fadeInUp } from "@/lib/animations"
import Link from "next/link"

export function ProcessSection()
{
  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Cómo Funciona
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            En solo 4 pasos simples, puede estar listo para su primera cita médica.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-1/4 right-1/4 h-1 bg-gradient-to-r from-blue-200 via-blue-500 to-cyan-200 transform -translate-y-1/2" />

          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Step Number Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg"
                >
                  {step.step}
                </motion.div>
              </div>

              <Card className="h-full hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-800 pt-8">
                <CardHeader className="text-center pb-4">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl flex items-center justify-center"
                  >
                    <step.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Mobile Connection Line */}
              {index < processSteps.length - 1 && (
                <div className="lg:hidden absolute top-1/2 -right-4 w-8 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              ¿Listo para Empezar?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Únase a miles de pacientes que ya disfrutan de una gestión médica más inteligente y segura.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link href="/register" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Crear Cuenta Gratuita
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}