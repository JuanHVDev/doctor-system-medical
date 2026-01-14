"use client"

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Shield, Award, ChevronRight } from "lucide-react"
import { heroData } from "@/lib/landing-data"
import { fadeInUp, slideInLeft, slideInRight, pulseIcon, floatAnimation } from "@/lib/animations"
import Link from "next/link"

export function HeroSection()
{
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          variants={floatAnimation}
          initial="hidden"
          animate="show"
          className="absolute top-20 left-20 w-32 h-32 bg-blue-200/20 dark:bg-blue-800/20 rounded-full blur-3xl"
        />
        <motion.div
          variants={floatAnimation}
          initial="hidden"
          animate="show"
          className="absolute bottom-20 right-20 w-48 h-48 bg-cyan-200/20 dark:bg-cyan-800/20 rounded-full blur-3xl"
          style={{ animationDelay: "1s" }}
        />
        <motion.div
          variants={floatAnimation}
          initial="hidden"
          animate="show"
          className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-200/20 dark:bg-purple-800/20 rounded-full blur-2xl"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">

          {/* Left Content */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate="show"
            className="text-center lg:text-left space-y-8"
          >
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {heroData.trustBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="show"
                  transition={{ delay: index * 0.2 + 0.5 }}
                >
                  <Badge variant="secondary" className="px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <badge.icon className={`w-4 h-4 mr-2 ${badge.color}`} />
                    {badge.text}
                  </Badge>
                </motion.div>
              ))}
            </div>

            {/* Main Headline */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                {heroData.title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl">
                {heroData.subtitle}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link href="/register">
                <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  {heroData.primaryCTA}
                  <ChevronRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            {/* Additional Trust Indicators */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.9 }}
              className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Medical Grade</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>24/7 Available</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Visual Elements */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="show"
            className="relative"
          >
            <div className="relative z-10">
              {/* Main Medical Icon/Graphic */}
              <motion.div
                variants={pulseIcon}
                initial="hidden"
                animate="show"
                className="w-full max-w-md mx-auto"
              >
                <div className="relative">
                  {/* Animated Medical Cross/Icon */}
                  <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl shadow-2xl flex items-center justify-center relative">
                    <Calendar className="w-16 h-16 text-white" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-50 animate-pulse" />
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    variants={floatAnimation}
                    initial="hidden"
                    animate="show"
                    className="absolute -top-8 -right-8 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl flex items-center justify-center"
                  >
                    <Shield className="w-10 h-10 text-white" />
                  </motion.div>

                  <motion.div
                    variants={floatAnimation}
                    initial="hidden"
                    animate="show"
                    className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-xl flex items-center justify-center"
                    style={{ animationDelay: "1s" }}
                  >
                    <Award className="w-8 h-8 text-white" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Background Graphic Elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-96 h-96 bg-gradient-to-br from-blue-100/20 to-cyan-100/20 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full blur-3xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" fill="currentColor" className="text-white dark:text-gray-900" />
        </svg>
      </div>
    </section>
  )
}