import { 
  Calendar, 
  Shield, 
  Smartphone, 
  Clock, 
  Heart,
  Lock,
  FileCheck,
  Activity,
  UserPlus,
  Stethoscope,
  Award
} from "lucide-react"
import { slideInLeft, fadeInUp, slideInRight } from "./animations"

export const heroData = {
  title: "Citas Médicas Simples y Seguras",
  subtitle: "Gestione sus citas médicas con facilidad. Plataforma moderna y segura para pacientes y doctores.",
  primaryCTA: "Registrarse como Paciente",
  secondaryCTA: "Soy Doctor",
  trustBadges: [
    { icon: Shield, text: "100% Seguro", color: "text-green-600" },
    { icon: Lock, text: "HIPAA Cumple", color: "text-blue-600" },
    { icon: Award, text: "Certificado", color: "text-purple-600" }
  ]
}

export const featuresData = [
  {
    icon: Calendar,
    title: "Agende Fácilmente",
    description: "Reserve citas con sus médicos preferidos en segundos, desde cualquier dispositivo.",
    benefits: ["Disponible 24/7", "Sin esperas", "Recordatorios automáticos"],
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Smartphone,
    title: "Todo desde su Móvil",
    description: "Acceda a su historial médico, citas y resultados desde su teléfono.",
    benefits: ["App iOS y Android", "Notificaciones push", "Chat seguro"],
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Shield,
    title: "Seguridad Garantizada",
    description: "Sus datos médicos están protegidos con encriptación de nivel militar.",
    benefits: ["Encriptación AES-256", "Servidores seguros", "Cumplimiento HIPAA"],
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: Clock,
    title: "Ahorre Tiempo Valioso",
    description: "Evite filas y esperas innecesarias con agendamiento inteligente.",
    benefits: ["Atención rápida", "Priorización", "Cancelación fácil"],
    color: "from-orange-500 to-red-500"
  },
  {
    icon: Heart,
    title: "Atención Personalizada",
    description: "Conecte con médicos que realmente se preocupan por su salud.",
    benefits: ["Historial completo", "Seguimiento", "Cuidado continuo"],
    color: "from-rose-500 to-pink-500"
  },
  {
    icon: FileCheck,
    title: "Documentos Digitales",
    description: "Acceda a recetas, resultados y certificados cuando los necesite.",
    benefits: ["Descarga PDF", "Compartir seguro", "Archivos ilimitados"],
    color: "from-indigo-500 to-purple-500"
  }
]

export const processSteps = [
  {
    step: 1,
    title: "Crear Cuenta",
    description: "Regístrese gratis en menos de 2 minutos con información básica.",
    icon: UserPlus,
    animation: slideInLeft
  },
  {
    step: 2,
    title: "Buscar Médico",
    description: "Encuentre especialistas calificados cerca de su ubicación.",
    icon: Stethoscope,
    animation: fadeInUp
  },
  {
    step: 3,
    title: "Agendar Cita",
    description: "Seleccione fecha y hora convenientes con confirmación instantánea.",
    icon: Calendar,
    animation: fadeInUp
  },
  {
    step: 4,
    title: "Recibir Atención",
    description: "Asista a su cita o conéctese virtualmente con su médico.",
    icon: Activity,
    animation: slideInRight
  }
]

export const testimonialsData = [
  {
    id: 1,
    name: "María González",
    role: "Paciente",
    avatar: "MG",
    content: "Cambió completamente cómo gestiono mis citas médicas. Es increíblemente fácil y seguro.",
    rating: 5
  },
  {
    id: 2,
    name: "Dr. Carlos Rodríguez",
    role: "Cardiólogo",
    avatar: "CR",
    content: "Como médico, esta plataforma me ha ayudado a optimizar mi tiempo y ofrecer mejor servicio a mis pacientes.",
    rating: 5
  },
  {
    id: 3,
    name: "Ana Martínez",
    role: "Paciente",
    avatar: "AM",
    content: "Me encanta poder agendar citas desde mi teléfono y recibir recordatorios. ¡Muy práctico!",
    rating: 5
  }
]

export const securityFeatures = [
  {
    icon: Shield,
    title: "Encriptación de Extremo a Extremo",
    description: "Todos sus datos están encriptados usando protocolos militares."
  },
  {
    icon: Lock,
    title: "Autenticación de Dos Factores",
    description: "Proteja su cuenta con verificación biométrica y SMS."
  },
  {
    icon: FileCheck,
    title: "Cumplimiento HIPAA",
    description: "Cumplimos con todos los estándares de privacidad médica."
  },
  {
    icon: Activity,
    title: "Monitoreo 24/7",
    description: "Nuestros sistemas de seguridad trabajan sin descanso para protegerlo."
  }
]

export const statsData = [
  { number: "50K+", label: "Pacientes Activos" },
  { number: "1,200+", label: "Médicos Certificados" },
  { number: "100K+", label: "Citas Agendadas" },
  { number: "99.9%", label: "Uptime Garantizado" }
]