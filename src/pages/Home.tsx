import { Heart, BrainCircuit, BookOpen } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const features = [
  {
    icon: <Heart className="text-pink-500" size={32} />,
    title: 'Seguimiento Personal',
    description: 'Lleva un registro de tu evolución emocional y corporal para un progreso diario con nuestro diario emocional integrado.',
    link: '/mi-progreso',
    buttonText: 'Mi Progreso',
    color: 'bg-pink-50'
  },
  {
    icon: <BrainCircuit className="text-blue-500" size={32} />,
    title: 'Soporte Profesional',
    description: 'Conecta con profesionales especializados en biodescodificación para obtener apoyo personalizado.',
    link: '/profesionales',
    buttonText: 'Obtener Soporte',
    color: 'bg-blue-50'
  },
  {
    icon: <BookOpen className="text-purple-500" size={32} />,
    title: 'Diccionario IA',
    description: 'Consulta directamente con inteligencia artificial para obtener análisis personalizados sobre cualquier dolencia o síntoma.',
    link: '/diccionario',
    buttonText: 'Consultar Ahora',
    color: 'bg-purple-50'
  },
];

const Home = () => {
  return (
    <div className="space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="text-center py-16 md:py-24 bg-gradient-hero rounded-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-brand-dark-blue">
          BioClave - Diccionario IA
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          Consulta directamente con inteligencia artificial para obtener análisis personalizados sobre la relación entre emociones y dolencias físicas.
        </p>
        <div className="mt-8">
          <Button to="/diccionario" variant="primary">Explorar Diccionario IA</Button>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center text-brand-dark-blue">Características Principales</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className={`text-center ${feature.color}`}>
              <div className="mx-auto bg-white rounded-full p-4 w-fit shadow-md">{feature.icon}</div>
              <h3 className="mt-6 text-xl font-semibold text-brand-dark-blue">{feature.title}</h3>
              <p className="mt-2 text-gray-600 text-sm">{feature.description}</p>
              <div className="mt-6">
                 <Button to={feature.link} variant="secondary">{feature.buttonText}</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto">
        <Card className="bg-white">
          <h2 className="text-3xl font-bold text-brand-dark-blue">Sobre BioClave</h2>
          <p className="mt-4 text-gray-600">
            La biodescodificación es una disciplina que estudia la relación entre las emociones, los conflictos psicológicos y las manifestaciones físicas en el cuerpo humano. Esta herramienta está basada en el trabajo de Joan Marc Vilanova i Pujó y pretende ser una guía para la reflexión y el autoconocimiento, facilitando la comprensión de los "resentires" y conflictos emocionales.
          </p>
          <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <h4 className="font-bold text-yellow-800">⚠️ Importante</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Esta aplicación no pretende diagnosticar, tratar, curar o sustituir las terapias. Es solo una herramienta más para el crecimiento personal y no reemplaza el diagnóstico médico profesional.
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Home;
