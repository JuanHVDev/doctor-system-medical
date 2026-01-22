import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthSyncProvider } from "@/components/auth/auth-sync-provider";
import { Toaster } from "sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema de Citas Médicas | Gestión de Citas para Pacientes y Doctores",
  description: "Plataforma segura y moderna para gestionar citas médicas. Fácil para pacientes, eficiente para doctores. Cumple con HIPAA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthSyncProvider>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </AuthSyncProvider>
      </body>
    </html>
  );
}
