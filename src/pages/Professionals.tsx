import { useState, useEffect } from 'react';
import { Star, MapPin, Calendar, MessageSquare, Mail, Loader2, Award, UserCheck, Briefcase, ArrowRight, AlertTriangle, Clock, Siren } from 'lucide-react';
import { getProfessionals, Professional } from '../services/professionalService';

// --- Componente de la Tarjeta de Profesional ---
const ProfessionalCard: React.FC<{ professional: Professional }> = ({ professional }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full transform hover:-translate-y-1 transition-transform duration-300">
      <div className="bg-gradient-to-br from-brand-purple to-brand-dark-blue p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-1 rounded-full w-20 h-20 flex-shrink-0">
            <img src={professional.imageUrl || undefined} alt={professional.name} className="rounded-full w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xl font-bold truncate">{professional.name}</h3>
            <p className="text-sm opacity-90 truncate">{professional.title}</p>
            {professional.rating > 0 && (
              <div className="flex items-center gap-1.5 mt-2 bg-white/20 text-yellow-300 px-2 py-0.5 rounded-full text-xs font-bold w-fit">
                <Star className="h-3.5 w-3.5" />
                <span>{professional.rating.toFixed(1)}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="p-6 flex-grow">
        <div className="space-y-5">
          {professional.specialties.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2 text-sm"><Briefcase size={16} className="text-gray-400"/> Especialidades</h4>
              <div className="flex flex-wrap gap-2">
                {professional.specialties.map(spec => (
                  <span key={spec} className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-1 rounded-full">{spec}</span>
                ))}
              </div>
            </div>
          )}
          {professional.certifications.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-2 flex items-center gap-2 text-sm"><Award size={16} className="text-gray-400"/> Certificaciones</h4>
              <ul className="space-y-1 text-sm text-gray-600 list-inside">
                {professional.certifications.map(cert => (
                  <li key={cert} className="flex items-start gap-2"><UserCheck className="h-4 w-4 mt-0.5 text-brand-purple flex-shrink-0" /><span>{cert}</span></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="p-6 bg-gray-50/70 border-t border-gray-100">
        <div className="space-y-3 text-sm text-gray-600 mb-4">
           {professional.location && <span className="flex items-center gap-2.5"><MapPin className="h-4 w-4 text-gray-400" /> {professional.location}</span>}
           {professional.hours && <span className="flex items-center gap-2.5"><Calendar className="h-4 w-4 text-gray-400" /> {professional.hours}</span>}
        </div>
        <div className="flex items-center gap-3">
            {professional.whatsappUrl && <a href={professional.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center bg-green-500 hover:bg-green-600 transition-colors px-4 py-2.5 rounded-lg font-semibold text-white flex items-center justify-center gap-2"><MessageSquare size={16} /> WhatsApp</a>}
            {professional.emailUrl && <a href={professional.emailUrl} className="flex-1 text-center bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2.5 rounded-lg font-semibold text-white flex items-center justify-center gap-2"><Mail size={16} /> Email</a>}
        </div>
      </div>
    </div>
  );
};

const Professionals = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        setIsLoading(true);
        const data = await getProfessionals();
        setProfessionals(data);
      } catch {
        setError('Ocurrió un error al cargar los profesionales. Intenta de nuevo más tarde.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfessionals();
  }, []);

  const renderContent = () => {
    if (isLoading) return <div className="flex justify-center p-10"><Loader2 className="animate-spin h-12 w-12 text-brand-purple" /></div>;
    if (error) return <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md"><h4 className="font-bold">Error</h4><p>{error}</p></div>;
    if (professionals.length === 0) return <div className="text-center p-10 bg-gray-100 rounded-lg"><h3 className="text-xl font-semibold text-gray-700">No hay profesionales disponibles</h3><p className="mt-2 text-gray-500">Aún no se han añadido perfiles. ¡Vuelve a consultar más tarde!</p></div>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {professionals.map(prof => (
                <ProfessionalCard key={prof.id} professional={prof} />
            ))}
        </div>
    );
  };

  return (
    <>
      <title>SentIA - Profesionales | Soporte en Biodescodificación</title>
      <meta name="description" content="Conecta con profesionales y terapeutas especializados en biodescodificación. Encuentra el acompañamiento que necesitas para profundizar en tu proceso de sanación." />
      <div className="bg-gray-50 min-h-screen -mx-4 sm:-mx-6 lg:-mx-8 -my-8 md:-my-12 px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto space-y-16">
          <section className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-brand-dark-blue">Soporte Profesional</h1>
            <p className="mt-2 max-w-2xl mx-auto text-lg text-gray-600">Conecta con profesionales especializados para acompañarte en tu proceso.</p>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              <div className="bg-white p-8 rounded-2xl shadow-md">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">¿Cuándo buscar apoyo profesional?</h3>
                  <ul className="space-y-4 text-gray-600">
                      <li className="flex items-start gap-3"><ArrowRight className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" /><span>Cuando necesites una perspectiva externa sobre tus conflictos emocionales</span></li>
                      <li className="flex items-start gap-3"><ArrowRight className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" /><span>Si quieres profundizar en técnicas específicas de biodescodificación</span></li>
                      <li className="flex items-start gap-3"><ArrowRight className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" /><span>Para obtener acompañamiento personalizado en tu proceso de sanación</span></li>
                      <li className="flex items-start gap-3"><ArrowRight className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" /><span>Cuando sientes que necesitas herramientas adicionales para tu crecimiento</span></li>
                  </ul>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300/50 p-8 rounded-2xl shadow-md flex items-center">
                <div>
                  <h3 className="text-2xl font-bold text-yellow-800 mb-4 flex items-center gap-3"><AlertTriangle className="h-7 w-7"/>Importante</h3>
                  <p className="text-yellow-900/80 leading-relaxed">
                      Los profesionales listados operan de forma independiente. Este directorio facilita el contacto pero cada profesional establece sus propios términos, tarifas y metodologías de trabajo.
                  </p>
                </div>
              </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-center text-brand-dark-blue mb-10">Profesionales Disponibles</h2>
            {renderContent()}
          </section>

          <section>
              <h2 className="text-3xl font-bold text-center text-brand-dark-blue mb-10">Guías para el Contacto</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white p-8 rounded-2xl shadow-md">
                      <div className="flex justify-center mb-4">
                          <div className="bg-purple-100 p-3 rounded-full"><MessageSquare className="h-6 w-6 text-purple-600" /></div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 text-center mb-4">WhatsApp</h3>
                      <ul className="space-y-3 text-gray-600 text-sm list-disc list-inside">
                          <li>Preséntate brevemente</li>
                          <li>Menciona que vienes del Diccionario de Biodescodificación</li>
                          <li>Describe qué tipo de apoyo buscas</li>
                          <li>Pregunta sobre disponibilidad y tarifas</li>
                      </ul>
                  </div>
                  <div className="bg-white p-8 rounded-2xl shadow-md">
                      <div className="flex justify-center mb-4">
                          <div className="bg-purple-100 p-3 rounded-full"><Mail className="h-6 w-6 text-purple-600" /></div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 text-center mb-4">Email</h3>
                      <ul className="space-y-3 text-gray-600 text-sm list-disc list-inside">
                          <li>Usa un asunto claro como: “Consulta sobre Biodescodificación”</li>
                          <li>Explica tu interés en el trabajo del profesional</li>
                          <li>Comparte brevemente tu situación actual</li>
                          <li>Solicita información sobre el proceso y metodología</li>
                      </ul>
                  </div>
                  <div className="bg-white p-8 rounded-2xl shadow-md">
                      <div className="flex justify-center mb-4">
                          <div className="bg-purple-100 p-3 rounded-full"><Clock className="h-6 w-6 text-purple-600" /></div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 text-center mb-4">Qué Esperar</h3>
                      <ul className="space-y-3 text-gray-600 text-sm list-disc list-inside">
                          <li>Respuesta en 24-48 horas laborales</li>
                          <li>Consulta inicial para conocerte mejor</li>
                          <li>Explicación de metodología y enfoque</li>
                          <li>Información sobre tarifas y modalidades</li>
                      </ul>
                  </div>
              </div>
          </section>

          <section className="max-w-4xl mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 md:p-8">
                  <h3 className="text-xl font-bold text-red-800 flex items-center gap-3">
                  <Siren className="h-6 w-6" />
                  ¿En Crisis o Emergencia Emocional?
                  </h3>
                  <p className="text-red-700/90 mt-4">
                  Si estás atravesando una crisis emocional o necesitas ayuda inmediata, por favor contacta con servicios de emergencia o líneas de ayuda especializadas en tu área. La biodescodificación es un complemento, no un sustituto de la atención médica o psicológica profesional.
                  </p>
                  <div className="mt-6 bg-white border border-red-200 rounded-lg p-4">
                      <p className="font-semibold text-red-600">Argentina</p>
                      <p className="text-gray-700 mt-1">
                          Línea telefónica nacional para atención en salud mental: <strong className="font-bold text-gray-900">0800 999 0091</strong>
                      </p>
                  </div>
              </div>
          </section>

        </div>
      </div>
    </>
  );
};

export default Professionals;
