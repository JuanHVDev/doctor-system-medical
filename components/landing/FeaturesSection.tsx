"use client"

import { motion } from "motion/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { featuresData } from "@/lib/landing-data"
import { staggerContainer, fadeInUp, scaleIn } from "@/lib/animations"

export function FeaturesSection()
{
  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
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
            Todo lo que Necesita para su Salud
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Descubra cómo nuestra plataforma transforma la gestión de citas médicas con tecnología de vanguardia.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuresData.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-0 bg-white dark:bg-gray-800 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <motion.div
                    variants={scaleIn}
                    whileHover={{ scale: 1.1 }}
                    className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br p-4 rounded-2xl flex items-center justify-center"
                    style={{ backgroundImage: `linear-gradient(to bottom right, ${feature.color})` }}
                  >
                    <feature.icon className="w-10 h-10 text-white" />
                  </motion.div>
                  <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </CardDescription>

                  <div className="space-y-2">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r rounded-full"
                          style={{ backgroundImage: `linear-gradient(to right, ${feature.color})` }} />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Badge variant="secondary" className="px-6 py-3 text-lg bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
            ✨ Diseñado con la tecnología médica más avanzada
          </Badge>
        </motion.div>
      </div>
    </section>
  )
}