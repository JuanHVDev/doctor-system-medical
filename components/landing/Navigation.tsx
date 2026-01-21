"use client"

import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Menu, X, Calendar, Shield, User, LogOut, LayoutDashboard, CalendarDays, UserCircle, Loader2 } from "lucide-react"
import { useState } from "react"
import { fadeInDown } from "@/lib/animations"
import Link from "next/link"
import { useAuthStore } from "@/store/auth-store"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export function Navigation()
{
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, isLoading, clearAuth } = useAuthStore()
  const router = useRouter()

  const handleLogout = async () =>
  {
    await authClient.signOut()
    clearAuth()
    router.push("/")
    setIsOpen(false)
  }

  const getDashboardLink = () =>
  {
    if (!user) return "/login"
    if (user.role === "DOCTOR") return "/doctor"
    if (user.role === "PATIENT" || user.role === "PACIENTE") return "/paciente"
    return "/dashboard"
  }

  return (
    <motion.nav
      variants={fadeInDown}
      initial="hidden"
      animate="show"
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            <Link href="/" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer mx-8">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                AG Health
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Características
            </Link>
            <Link href="/#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Cómo Funciona
            </Link>
            <Link href="/#security" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Seguridad
            </Link>
            {isAuthenticated && (
              <Link href={getDashboardLink()} className="text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
                <LayoutDashboard className="w-4 h-4" />
                Panel
              </Link>
            )}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isLoading ? (
              <div className="flex items-center gap-2 text-muted-foreground px-4">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Cargando...</span>
              </div>
            ) : isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-gray-900 dark:text-white leading-none">
                    {user?.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    {user?.role}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Salir
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Entrar
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 flex items-center gap-2 shadow-md shadow-blue-500/20">
                    <User className="w-4 h-4" />
                    Súmate
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-700"
          >
            <div className="py-4 space-y-3">
              {isAuthenticated && (
                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 mb-2">
                  <p className="font-bold text-gray-900 dark:text-white">{user?.name}</p>
                  <p className="text-xs text-muted-foreground uppercase">{user?.role}</p>
                </div>
              )}
              <Link
                href="/#features"
                className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setIsOpen(false)}
              >
                Características
              </Link>
              <Link
                href="/#how-it-works"
                className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => setIsOpen(false)}
              >
                Cómo Funciona
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    href={getDashboardLink()}
                    className="flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Mi Panel
                  </Link>
                  <Link
                    href={user?.role === "DOCTOR" ? "/doctor/agenda" : "/paciente/citas"}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <CalendarDays className="w-4 h-4" />
                    {user?.role === "DOCTOR" ? "Mi Agenda" : "Mis Citas"}
                  </Link>
                  <Link
                    href={user?.role === "DOCTOR" ? "/doctor/perfil" : "/paciente/perfil"}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <UserCircle className="w-4 h-4" />
                    Mi Perfil
                  </Link>
                  <div className="pt-2">
                    <Button
                      variant="destructive"
                      className="w-full justify-start gap-2"
                      onClick={handleLogout}
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar Sesión
                    </Button>
                  </div>
                </>
              ) : (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <Link href="/login">
                    <Button variant="ghost" className="w-full justify-start" onClick={() => setIsOpen(false)}>
                      <Shield className="w-4 h-4 mr-2" />
                      Entrar
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700" onClick={() => setIsOpen(false)}>
                      <User className="w-4 h-4 mr-2" />
                      Súmate
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
