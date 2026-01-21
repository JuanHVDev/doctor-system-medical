export const MEDICAL_SPECIALTIES = [
  { id: 'cardiologia', name: 'Cardiología', doctors: 5, icon: 'HeartPulse' },
  { id: 'pediatria', name: 'Pediatría', doctors: 3, icon: 'Baby' },
  { id: 'dermatologia', name: 'Dermatología', doctors: 4, icon: 'Sparkles' },
  { id: 'ginecologia', name: 'Ginecología', doctors: 4, icon: 'User' },
  { id: 'oftalmologia', name: 'Oftalmología', doctors: 2, icon: 'Eye' },
  { id: 'odontologia', name: 'Odontología', doctors: 6, icon: 'Smile' },
  { id: 'neurologia', name: 'Neurología', doctors: 2, icon: 'Brain' },
  { id: 'psiquiatria', name: 'Psiquiatría', doctors: 3, icon: 'MessageSquare' },
  { id: 'traumatologia', name: 'Traumatología', doctors: 4, icon: 'Activity' },
  { id: 'medicina-general', name: 'Medicina General', doctors: 10, icon: 'Stethoscope' },
] as const;

export type SpecialtyId = typeof MEDICAL_SPECIALTIES[number]['id'];
