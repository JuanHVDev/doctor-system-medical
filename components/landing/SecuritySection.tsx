"use client"

import { motion } from "motion/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { securityFeatures } from "@/lib/landing-data"
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animations"

export function SecuritySection()
{
  return (
    <section id="security" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">

        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="px-6 py-2 mb-6 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
            🔒 Seguridad Nivel Médico
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Protegemos sus Datos Médicos
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Cumplimos con los estándares más estrictos de seguridad médica y privacidad de datos.
          </p>
        </motion.div>

        {/* Security Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={index % 2 === 0 ? slideInLeft : slideInRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="h-full border-2 border-green-200 dark:border-green-800 hover:border-green-400 dark:hover:border-green-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                <CardHeader className="text-center pb-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center"
                  >
                    <feature.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Compliance Badges */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Certificaciones y Cumplimiento
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Nuestra plataforma cumple con todas las regulaciones médicas internacionales.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">HIPAA</span>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">HIPAA Cumple</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Cumplimiento total con HIPAA para protección de datos médicos en Estados Unidos.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-green-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">GDPR</span>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">GDPR Alineado</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Cumplimiento con regulaciones europeas de protección de datos personales.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-600 rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">ISO</span>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">ISO 27001</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Certificación internacional en gestión de seguridad de la información.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}