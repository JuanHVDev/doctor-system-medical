import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión | Doctor System",
  description: "Accede a tu cuenta en Doctor System",
};

import { motion } from "motion/react";
import { fadeInUp, fadeInDown, scaleIn } from "@/lib/animations";

export default function LoginPage()
{
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        className="w-full max-w-md"
      >
        <motion.div
          variants={fadeInDown}
          className="flex flex-col items-center mb-8 space-y-2"
        >
          <motion.div
            variants={scaleIn}
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="h-14 w-14 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 mb-2 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white w-8 h-8"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </motion.div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Bienvenido
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold tracking-wide uppercase text-xs">
            Doctor System Medical
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} transition={{ delay: 0.2 }}>
          <LoginForm />
        </motion.div>

        <motion.p
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center text-xs text-slate-400 font-medium px-4"
        >
          Al iniciar sesión, aceptas nuestros <a href="#" className="underline hover:text-slate-600 dark:hover:text-slate-200 transition-colors">Términos de Servicio</a> y <a href="#" className="underline hover:text-slate-600 dark:hover:text-slate-200 transition-colors">Política de Privacidad</a>.
        </motion.p>
      </motion.div>
    </main>
  );
}
