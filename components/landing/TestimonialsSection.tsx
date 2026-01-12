"use client"

import { motion } from "motion/react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star, MessageCircle } from "lucide-react"
import { testimonialsData } from "@/lib/landing-data"
import { fadeInUp } from "@/lib/animations"

export function TestimonialsSection()
{
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () =>
  {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length)
  }

  const prevTestimonial = () =>
  {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length)
  }

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900">
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
            Lo que Dicen Nuestros Usuarios
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Descubra por qué miles de pacientes y doctores confían en nuestra plataforma.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex"
            >
              {testimonialsData.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-white dark:bg-gray-800 border-0 shadow-xl">
                    <CardContent className="p-8 md:p-12">
                      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                        <Avatar className="w-20 h-20">
                          <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                            {testimonial.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-center md:text-left">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {testimonial.name}
                          </h3>
                          <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                            {testimonial.role}
                          </p>
                          <div className="flex items-center gap-1 mt-2">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <MessageCircle className="absolute -top-4 -left-4 w-8 h-8 text-blue-200 dark:text-blue-800" />
                        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-center md:text-left">
                          &quot;{testimonial.content}&quot;
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full w-12 h-12"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full w-12 h-12"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                  ? "bg-blue-600 dark:bg-blue-400 w-8"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-8 text-white">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="space-y-2"
              >
                <div className="text-4xl font-bold">50K+</div>
                <div className="text-blue-100">Pacientes Activos</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="space-y-2"
              >
                <div className="text-4xl font-bold">1,200+</div>
                <div className="text-blue-100">Médicos Certificados</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="space-y-2"
              >
                <div className="text-4xl font-bold">100K+</div>
                <div className="text-blue-100">Citas Agendadas</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="space-y-2"
              >
                <div className="text-4xl font-bold">99.9%</div>
                <div className="text-blue-100">Uptime Garantizado</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}