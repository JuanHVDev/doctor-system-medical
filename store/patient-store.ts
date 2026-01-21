import { create } from 'zustand';

export interface Patient
{
  id: string;
  userId: string;
  fullName: string;
  dateOfBirth?: Date | null;
  gender?: string | null;
  phoneNumber?: string | null;
  email?: string | null;
  bloodType?: string | null;
  lastVisit?: Date | null;
  nextAppointment?: Date | null;
}

interface PatientState
{
  patients: Patient[];
  selectedPatient: Patient | null;
  searchQuery: string;
  isLoading: boolean;
  setPatients: (patients: Patient[]) => void;
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
  setSelectedPatient: (patient: Patient | null) => void;
  setSearchQuery: (query: string) => void;
  setLoading: (isLoading: boolean) => void;
}

export const usePatientStore = create<PatientState>((set) => ({
  patients: [],
  selectedPatient: null,
  searchQuery: '',
  isLoading: false,
  setPatients: (patients) => set({ patients, isLoading: false }),
  addPatient: (patient) =>
    set((state) => ({ patients: [patient, ...state.patients] })),
  updatePatient: (id, updates) =>
    set((state) => ({
      patients: state.patients.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      ),
      selectedPatient:
        state.selectedPatient?.id === id
          ? { ...state.selectedPatient, ...updates }
          : state.selectedPatient,
    })),
  setSelectedPatient: (patient) => set({ selectedPatient: patient }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setLoading: (isLoading) => set({ isLoading }),
}));
