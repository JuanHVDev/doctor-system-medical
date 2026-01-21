import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Calendar, Droplets } from "lucide-react";
import { Gender, BloodType } from "../../generated/prisma/client";

interface PatientProfileProps
{
  patient: {
    fullName: string;
    email: string;
    image?: string | null;
    gender?: Gender | null;
    bloodType?: BloodType | null;
    phoneNumber?: string | null;
    address?: string | null;
    city?: string | null;
    country?: string;
    dateOfBirth?: Date | null;
  };
}

export function PatientProfile({ patient }: PatientProfileProps)
{
  const getInitials = (name: string) =>
  {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const formatDate = (date?: Date | null) =>
  {
    if (!date) return "No disponible";
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(new Date(date));
  };

  const infoItems = [
    { icon: Mail, label: "Correo", value: patient.email },
    { icon: Phone, label: "Teléfono", value: patient.phoneNumber || "No registrado" },
    { icon: Calendar, label: "Fecha de Nacimiento", value: formatDate(patient.dateOfBirth) },
    { icon: MapPin, label: "Dirección", value: patient.address ? `${patient.address}, ${patient.city || ""}` : "No registrada" },
  ];

  return (
    <Card className="h-full border-border/50 shadow-sm">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-20 w-20 border-2 border-primary/10">
          <AvatarImage src={patient.image || ""} alt={patient.fullName} />
          <AvatarFallback className="text-xl bg-primary/5 text-primary">
            {getInitials(patient.fullName)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-2xl">{patient.fullName}</CardTitle>
          <CardDescription className="flex gap-2 mt-1">
            <Badge variant="secondary" className="font-normal">Paciente</Badge>
            {patient.bloodType && (
              <Badge variant="outline" className="flex gap-1 items-center font-normal">
                <Droplets className="w-3 h-3 text-red-500" />
                {patient.bloodType.replace("_POSITIVE", "+").replace("_NEGATIVE", "-")}
              </Badge>
            )}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          {infoItems.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 group">
              <div className="p-2 rounded-md bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                <item.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{item.label}</p>
                <p className="text-sm font-semibold">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
