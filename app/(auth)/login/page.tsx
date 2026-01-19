import LoginForm from "@/components/auth/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión | Doctor System",
  description: "Accede a tu cuenta en Doctor System",
};

export default function LoginPage()
{
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 overflow-hidden bg-slate-50">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl opacity-60 animate-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-3xl opacity-60 animate-pulse" />
      </div>

      <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center mb-8 space-y-2">
          <div className="h-12 w-12 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white w-7 h-7"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Bienvenido
          </h1>
          <p className="text-slate-500 font-medium">
            Doctor System Medical
          </p>
        </div>

        <LoginForm />

        <p className="mt-8 text-center text-xs text-slate-400 font-medium px-4">
          Al iniciar sesión, aceptas nuestros <a href="#" className="underline hover:text-slate-600">Términos de Servicio</a> y <a href="#" className="underline hover:text-slate-600">Política de Privacidad</a>.
        </p>
      </div>
    </main>
  );
}