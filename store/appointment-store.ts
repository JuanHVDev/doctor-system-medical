import { create } from 'zustand';

export type AppointmentStatus = 'SCHEDULED' | 'CONFIRMED' | 'CHECKED_IN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
export type AppointmentType = 'ROUTINE_CHECKUP' | 'FOLLOW_UP' | 'URGENT' | 'SPECIALIST_REFERRAL' | 'VACCINATION' | 'LAB_RESULTS';

export interface Appointment
{
  id: string;
  patientId: string;
  doctorId: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  status: AppointmentStatus;
  appointmentType: AppointmentType;
  reason?: string | null;
  notes?: string | null;
  patient?: {
    fullName: string;
  };
  doctor?: {
    fullName: string;
    specialization?: string | null;
  };
}

interface AppointmentState
{
  appointments: Appointment[];
  selectedAppointment: Appointment | null;
  isLoading: boolean;
  filters: {
    status?: AppointmentStatus;
    type?: AppointmentType;
    date?: Date;
  };
  setAppointments: (appointments: Appointment[]) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;
  setSelectedAppointment: (appointment: Appointment | null) => void;
  setFilters: (filters: AppointmentState['filters']) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useAppointmentStore = create<AppointmentState>((set) => ({
  appointments: [],
  selectedAppointment: null,
  isLoading: false,
  filters: {},
  setAppointments: (appointments) => set({ appointments, isLoading: false }),
  addAppointment: (appointment) =>
    set((state) => ({ appointments: [appointment, ...state.appointments] })),
  updateAppointment: (id, updates) =>
    set((state) => ({
      appointments: state.appointments.map((a) =>
        a.id === id ? { ...a, ...updates } : a
      ),
      selectedAppointment:
        state.selectedAppointment?.id === id
          ? { ...state.selectedAppointment, ...updates }
          : state.selectedAppointment,
    })),
  deleteAppointment: (id) =>
    set((state) => ({
      appointments: state.appointments.filter((a) => a.id !== id),
      selectedAppointment:
        state.selectedAppointment?.id === id ? null : state.selectedAppointment,
    })),
  setSelectedAppointment: (appointment) => set({ selectedAppointment: appointment }),
  setFilters: (filters) => set({ filters }),
  setLoading: (isLoading) => set({ isLoading }),
}));
