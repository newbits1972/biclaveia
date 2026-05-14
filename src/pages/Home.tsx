import {
  Heart,
  Users,
  BrainCircuit,
  Search,
  AlertTriangle,
  Zap, // Para "Describe"
  GitBranch, // Para "Analiza"
  Lightbulb, // Para "Descubre"
} from "lucide-react";
import { Link } from "react-router-dom";

// --- Componentes Reutilizables ---

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  linkTo: string;
  linkLabel: string;
  bgColor: string;
  iconColor: string;
  buttonClasses: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, linkTo, linkLabel, bgColor, iconColor, buttonClasses }) => (
  <div className={`rounded-3xl p-8 text-center flex flex-col items-center shadow-lg ${bgColor} transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2`}>
    <div className={`flex items-center justify-center h-20 w-20 rounded-full bg-white shadow-md mb-6 ${iconColor}`}>
        <Icon size={36} />
    </div>
    <h3 className={`text-xl font-bold ${iconColor} mb-3`}>{title}</h3>
    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{description}</p>
    <Link to={linkTo} className={`mt-auto inline-block bg-white rounded-full py-2 px-8 font-semibold shadow-md transition-all duration-300 ${buttonClasses}`}>
      {linkLabel}
    </Link>
  </div>
);

interface StepCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ icon: Icon, title, description }) => (
    <div className="flex flex-col items-center text-center">
        <div className="bg-teal-500 text-white rounded-full p-4 mb-4">
            <Icon size={32}/>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 max-w-xs">{description}</p>
    </div>
);

// --- Componente Principal de la Página de Inicio ---

const Home = () => {
  return (
    <>
      <title>SentIA: Descodifica el Lenguaje de tus Síntomas</title>
      <meta name="description" content="Utiliza nuestra IA para explorar la conexión emocional detrás de tus síntomas físicos y patrones de vida, basándote en los principios de la biodescodificación." />
      
      <div className="bg-white">

        {/* --- Sección Hero --- */}
        <section className="relative overflow-hidden bg-gradient-to-br from-green-100/60 via-purple-50/50 to-purple-200/60 pt-20 pb-24 sm:pt-24 sm:pb-32 lg:pt-28 lg:pb-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 tracking-tight">
              <span className="block">SentIA:</span>
              <span className="text-3xl sm:text-4xl lg:text-5xl">Descodifica el Lenguaje de tus Síntomas</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg lg:text-xl text-gray-600">
              Utiliza nuestra inteligencia artificial para explorar la conexión emocional detrás de tus síntomas físicos y patrones de vida, basándote en los principios de la biodescodificación.
            </p>
            <div className="mt-10">
              <Link to="/diccionario" className="inline-flex items-center justify-center gap-3 bg-teal-500 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-600 transition-transform transform hover:scale-105 shadow-lg">
                <Search size={20} /> Iniciar Autodescubrimiento
              </Link>
            </div>
          </div>
        </section>

        {/* --- NUEVA Sección ¿Cómo Funciona? --- */} 
        <section className="py-20 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">¿Cómo Funciona?</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">En tres simples pasos, obtén una nueva perspectiva sobre tu bienestar.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    <StepCard 
                        icon={Zap}
                        title="1. Describe"
                        description="Introduce un síntoma, dolencia, emoción o situación que estés experimentando en nuestro buscador inteligente."
                    />
                    <StepCard 
                        icon={GitBranch}
                        title="2. Analiza"
                        description="Nuestra IA consulta una base de conocimiento especializada para analizar el conflicto emocional, el resentir y la historia transgeneracional asociada."
                    />
                    <StepCard 
                        icon={Lightbulb}
                        title="3. Descubre"
                        description="Recibe un análisis completo que te invita a la reflexión, ayudándote a conectar los puntos y a comprender el mensaje de tu cuerpo."
                    />
                </div>
            </div>
        </section>

        {/* --- Sección de Características (Existente y sin cambios) --- */}
        <section className="bg-gray-50/50 py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Una Herramienta Completa para tu Crecimiento</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
               <FeatureCard 
                icon={BrainCircuit} 
                title="Diccionario IA Avanzado" 
                description="Análisis profundos que conectan síntomas con conflictos, lateralidad, cromoterapia y proyecto sentido gestacional." 
                linkTo="/diccionario" 
                linkLabel="Consultar Ahora"
                bgColor="bg-purple-50/70"
                iconColor="text-purple-500"
                buttonClasses="text-purple-600 border border-purple-200 hover:bg-purple-100/50"
              />
              <FeatureCard 
                icon={Heart} 
                title="Seguimiento Personal" 
                description="Un diario emocional para registrar tus consultas, reflexiones y seguir tu progreso en el camino del autoconocimiento."
                linkTo="/mi-progreso" 
                linkLabel="Mi Progreso"
                bgColor="bg-pink-50/70"
                iconColor="text-pink-500"
                buttonClasses="text-pink-600 border border-pink-200 hover:bg-pink-100/50"
              />
              <FeatureCard 
                icon={Users} 
                title="Conecta con Profesionales" 
                description="Encuentra terapeutas y especialistas en biodescodificación que pueden guiarte en tu proceso de sanación."
                linkTo="/profesionales" 
                linkLabel="Ver Profesionales"
                bgColor="bg-sky-50/70"
                iconColor="text-sky-500"
                buttonClasses="text-sky-600 border border-sky-200 hover:bg-sky-100/50"
              />
            </div>
          </div>
        </section>

        {/* --- Sección Sobre Biodescodificación (AMPLIADA) --- */}
        <section className="py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
              <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-gray-100">
                  <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">¿Qué es la Biodescodificación?</h2>
                  <div className="text-gray-700 space-y-5 text-lg leading-relaxed">
                      <p>
                      La Biodescodificación es un enfoque complementario y no médico que busca comprender el origen emocional y simbólico de los síntomas o enfermedades. Su premisa fundamental es que cada dolencia física (el "bioshock") está intrínsecamente ligada a un conflicto emocional que ha sido vivido en soledad, de forma inesperada y sin una solución aparente.
                      </p>
                       <p>
                      Esta disciplina propone que la enfermedad es en realidad una solución biológica de adaptación que el cerebro pone en marcha para ayudarnos a sobrevivir a un impacto emocional. El síntoma, por tanto, no es el problema, sino una pista. Es un lenguaje codificado que nos habla de un "resentir", una emoción oculta y no procesada que necesita ser expresada y comprendida.
                      </p>
                      <p>
                      SentIA se inspira en estos principios, analizando conceptos como el <strong>Proyecto Sentido Gestacional</strong> (la influencia emocional del entorno durante la gestación), el <strong>Transgeneracional</strong> (las memorias y conflictos heredados de nuestros ancestros) y los <strong>Ciclos Biológicos Memorizados</strong> para ofrecerte un mapa de posibles significados. Es una invitación a mirar más allá del síntoma y a explorar tu propia historia.
                      </p>
                  </div>
                  <div className="mt-10 bg-yellow-100 border-l-8 border-yellow-500 p-6 rounded-r-lg">
                      <div className="flex items-start gap-4">
                          <AlertTriangle className="h-8 w-8 text-yellow-600 flex-shrink-0 mt-1" />
                          <div>
                              <h3 className="text-lg font-bold text-yellow-900">Aviso de Responsabilidad</h3>
                              <p className="mt-2 text-yellow-800 leading-relaxed">
                              Esta herramienta es un recurso para la introspección y el desarrollo personal. No diagnostica, trata ni cura ninguna enfermedad y no reemplaza en absoluto el consejo, diagnóstico o tratamiento de un médico, psicólogo o terapeuta cualificado. Consulta siempre a un profesional de la salud.
                              </p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
