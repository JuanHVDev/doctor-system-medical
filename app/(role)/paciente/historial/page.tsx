import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import MedicalHistoryClient from "@/components/dashboard/MedicalHistoryClient";

export default async function HistorialMedicoPage()
{
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session)
  {
    redirect("/login");
  }

  // Ensure only patients can access this page
  if (session.user.role !== "PATIENT" && session.user.role !== "PACIENTE")
  {
    redirect("/forbidden");
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <MedicalHistoryClient />
    </div>
  );
}
