import { Shield, CheckCircle2, User, Star, MapPin, Calendar, MessageSquare, Mail, Clock, AlertTriangle, Phone } from 'lucide-react';
import Card from '../components/ui/Card';

const featuredProfessional = {
  name: 'Alejandro Ortiz',
  title: 'Especialista en Biodescodificación',
  rating: 4.9,
  specialties: ['Bioneuroemoción Coaching', 'Especialidad Terapeuta Personal', 'Constelaciones'],
  certifications: [
    'Certificado Argentino',
    'Bioneuroemoción BTQ, Psicoconsciencia',
    'Terapeuta: Biodescodificación, Gestalmemoria Familiar, Coaching',
  ],
  location: 'Madrid, España',
  hours: 'Lunes a viernes de 09:00 h a 21:00 PM',
};

const contactGuides = [
  {
    icon: MessageSquare,
    title: 'WhatsApp',
    color: 'green',
    points: [
      'Primera sesión gratuita',
      'Mensaje que viene del Diccionario de Biodescodificación',
      'Describe brevemente tu situación',
      'Pregunta sobre disponibilidad y tarifas',
    ],
  },
  {
    icon: Mail,
    title: 'Email',
    color: 'blue',
    points: [
      "Usa un asunto claro: 'Consulta sobre biodescodificación'",
      'Completa formulario de consulta disponible',
      'Tiempo información inicial sobre tu situación',
      'Solicita información sobre el proceso',
    ],
  },
  {
    icon: Clock,
    title: 'Qué Esperar',
    color: 'purple',
    points: [
      'Respuesta en 24-48 horas laborables',
      'Consulta inicial para conocer tu situación',
      'Explicación de metodología y enfoque',
      'Información sobre tarifas y disponibilidad',
    ],
  },
];

const whenToSeekHelp = [
  'Cuando sientes que no puedes manejar tus conflictos emocionales',
  'Si quieres profundizar en técnicas específicas de biodescodificación',
  'Para obtener acompañamiento personalizado en tu proceso de sanación',
  'Cuando necesitas herramientas adicionales para tu crecimiento',
];

const Professionals = () => {
  return (
    <div className="bg-gradient-page-background -mx-4 sm:-mx-6 lg:-mx-8 -my-8 md:-my-12 px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="max-w-5xl mx-auto space-y-16">
        
        <section className="text-center space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-brand-dark-blue">Soporte Profesional</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Conecta con profesionales especializados en biodescodificación
            </p>
          </div>
          <div className="max-w-3xl mx-auto bg-teal-50 border-l-4 border-teal-300 p-4 rounded-r-lg text-left flex items-center gap-4">
            <Shield className="text-teal-500 h-8 w-8 flex-shrink-0" />
            <p className="text-sm text-teal-800">
              Los PROFESIONALES trabajan de forma independiente. Solo ofrecemos recursos en el contexto para que profesionales en biodescodificación o técnicas similares, puedan permitir una metodología que pueda ayudar en técnico.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-center text-brand-dark-blue mb-6">¿Cuándo buscar apoyo profesional?</h2>
          <Card className="max-w-2xl mx-auto">
            <ul className="space-y-3">
              {whenToSeekHelp.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-center text-brand-dark-blue mb-6">Profesionales Disponibles</h2>
          <div className="bg-gradient-professional-card text-white rounded-2xl shadow-2xl p-8">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <div className="bg-white/20 p-4 rounded-full">
                  <User className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-bold mt-4">{featuredProfessional.name}</h3>
                <p className="opacity-80">{featuredProfessional.title}</p>
                <div className="flex items-center gap-1 mt-2 bg-yellow-400/20 text-yellow-300 px-2 py-1 rounded-full text-sm">
                  <Star className="h-4 w-4" />
                  <span>{featuredProfessional.rating}</span>
                </div>
              </div>
              <div className="md:col-span-2 grid sm:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-3">Especialidades:</h4>
                  <div className="flex flex-wrap gap-2">
                    {featuredProfessional.specialties.map(spec => (
                      <span key={spec} className="bg-white/20 text-xs font-medium px-2.5 py-1 rounded-full">{spec}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Certificaciones:</h4>
                  <ul className="space-y-2 text-sm opacity-90">
                    {featuredProfessional.certifications.map(cert => (
                      <li key={cert} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 mt-1 flex-shrink-0" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="border-t border-white/20 my-6"></div>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2"><MapPin className="h-4 w-4 opacity-80" /> {featuredProfessional.location}</span>
                <span className="flex items-center gap-2"><Calendar className="h-4 w-4 opacity-80" /> {featuredProfessional.hours}</span>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <a href="#" className="flex-1 text-center bg-green-500 hover:bg-green-600 transition-colors p-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                  <MessageSquare className="h-5 w-5" /> WhatsApp
                </a>
                <a href="#" className="flex-1 text-center bg-blue-500 hover:bg-blue-600 transition-colors p-3 rounded-lg font-semibold flex items-center justify-center gap-2">
                  <Mail className="h-5 w-5" /> Email
                </a>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-center text-brand-dark-blue mb-6">Guías para el Contacto</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {contactGuides.map((guide) => (
              <Card key={guide.title} className={`bg-${guide.color}-50/50 border border-${guide.color}-200`}>
                <div className="flex flex-col items-center text-center">
                  <div className={`bg-white p-3 rounded-full shadow-md`}>
                    <guide.icon className={`h-6 w-6 text-${guide.color}-500`} />
                  </div>
                  <h3 className={`mt-4 text-lg font-semibold text-${guide.color}-800`}>{guide.title}</h3>
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  {guide.points.map(point => (
                    <li key={point} className="flex items-start gap-2 text-gray-600">
                      <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 text-${guide.color}-400`} />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <h3 className="text-lg font-bold text-red-800">¿En Crisis o Emergencia Emocional?</h3>
            </div>
            <p className="text-sm text-red-700 mt-2">
              Si sientes que necesitas una crisis emocional o ayudas inmediatas por favor contacta con servicios de emergencia.
            </p>
            <div className="mt-3">
              <p className="font-semibold text-red-800 text-sm">Argentina:</p>
              <a href="tel:08009990091" className="inline-flex items-center gap-2 font-bold text-red-700 hover:underline">
                <Phone size={14} /> Línea nacional para atención en salud mental: 0800 999 0091
              </a>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-300 p-6 rounded-r-lg">
            <h3 className="text-lg font-bold text-blue-800">Recordatorio Final</h3>
            <p className="text-sm text-blue-700 mt-2">
              La biodescodificación es una herramienta complementaria que busca el crecimiento personal y la reflexión. Estos profesionales pueden ayudarte a profundizar en tu proceso, pero siempre escucha en un enfoque integral, y cuando sea necesario, buscarán atención médica y psicológica convencional.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Professionals;
