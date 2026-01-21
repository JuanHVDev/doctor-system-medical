"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Calendar, Clock, AlertCircle } from "lucide-react"

interface Activity
{
  id: string;
  type: 'APPOINTMENT' | 'MEDICAL_RECORD' | 'PROFILE_UPDATE';
  title: string;
  description: string;
  date: Date;
  status?: string;
}

interface RecentActivityProps
{
  activities: Activity[];
}

export function RecentActivity({ activities }: RecentActivityProps)
{
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Clock className="w-12 h-12 text-muted-foreground/20 mb-2" />
              <p className="text-muted-foreground text-sm">No hay actividad reciente para mostrar.</p>
            </div>
          ) : (
            <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent dark:before:via-slate-800">
              {activities.map((activity) => (
                <div key={activity.id} className="relative flex items-start gap-4">
                  <div className="absolute left-0 flex h-10 w-10 items-center justify-center rounded-full bg-background ring-2 ring-muted border shadow-sm">
                    {activity.type === 'APPOINTMENT' && <Calendar className="w-4 h-4 text-blue-500" />}
                    {activity.type === 'MEDICAL_RECORD' && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                    {activity.type === 'PROFILE_UPDATE' && <AlertCircle className="w-4 h-4 text-orange-500" />}
                  </div>
                  <div className="ml-12 pt-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white">{activity.title}</h4>
                      <time className="text-[10px] font-medium text-muted-foreground whitespace-nowrap">
                        {new Date(activity.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
                      </time>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
