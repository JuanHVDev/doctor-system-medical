"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplet, Scale, Ruler, HeartPulse } from "lucide-react"

interface HealthSummaryProps
{
  bloodType: string | null;
  weight: number | null;
  height: number | null;
}

export function HealthSummary({ bloodType, weight, height }: HealthSummaryProps)
{
  const metrics = [
    {
      label: "Grupo Sanguíneo",
      value: bloodType || "No registrado",
      icon: Droplet,
      color: "text-rose-500",
      bg: "bg-rose-50",
    },
    {
      label: "Peso",
      value: weight ? `${weight} kg` : "No registrado",
      icon: Scale,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Altura",
      value: height ? `${height} cm` : "No registrado",
      icon: Ruler,
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      label: "IMC",
      value: weight && height ? (weight / Math.pow(height / 100, 2)).toFixed(1) : "N/A",
      icon: HeartPulse,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Resumen de Salud</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col gap-2 p-3 rounded-xl border border-muted-foreground/10 bg-muted/5">
              <div className="flex items-center gap-2">
                <div className={`${metric.bg} ${metric.color} p-1.5 rounded-lg`}>
                  <metric.icon className="w-4 h-4" />
                </div>
                <span className="text-xs text-muted-foreground font-medium">{metric.label}</span>
              </div>
              <span className="text-lg font-bold tracking-tight">{metric.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
