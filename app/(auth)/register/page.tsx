import RegisterForm from "@/components/auth/RegisterForm";
import { motion } from "framer-motion";
import { fadeInUp, fadeInDown, scaleIn } from "@/lib/animations";

export default function RegisterPage()
{
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-slate-50 dark:bg-slate-950">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-cyan-100/50 dark:bg-cyan-900/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial="hidden"
        animate="show"
        className="w-full max-w-md"
      >
        <motion.div
          variants={fadeInDown}
          className="flex flex-col items-center mb-6 space-y-2"
        >
          <motion.div
            variants={scaleIn}
            whileHover={{ rotate: -10, scale: 1.1 }}
            className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 mb-2 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white w-6 h-6"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </motion.div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Crea tu cuenta
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold tracking-wide uppercase text-[10px]">
            Únete a Doctor System Medical
          </p>
        </motion.div>

        <motion.div variants={fadeInUp} transition={{ delay: 0.2 }}>
          <RegisterForm />
        </motion.div>
      </motion.div>
    </main>
  )
}