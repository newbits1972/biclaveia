import { CalendarDays, Heart, TrendingUp, Plus, BookOpen, Lightbulb, CheckCircle2 } from 'lucide-react';
import React from 'react';

// --- Type Definitions ---
interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
}

interface TipItemProps {
  children: React.ReactNode;
}

// --- Components ---

// Componente para las tarjetas de estadísticas
const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, color }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4 w-full">
      <div className={`rounded-lg p-3 ${color}`}>
        <Icon className="text-white" size={24} />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
};

// Componente para los consejos
const TipItem: React.FC<TipItemProps> = ({ children }) => (
  <li className="flex items-start gap-3">
    <CheckCircle2 className="text-green-500 mt-1 flex-shrink-0" size={16} />
    <span className="text-gray-600">{children}</span>
  </li>
);

const MyProgress = () => {
  return (
    <>
      <title>SentIA - Mi Progreso | Tu Diario Emocional</title>
      <meta name="description" content="Lleva un registro de tu evolución con el diario emocional de SentIA. Anota tus reflexiones, observa patrones y celebra tu crecimiento personal y sanación." />
      <div className="bg-gradient-to-b from-teal-50 to-white min-h-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Encabezado */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800">Mi Progreso Personal</h1>
            <p className="text-lg text-gray-600 mt-2">Bienvenido/a</p>
            <p className="text-md text-gray-500">Lleva un registro de tu evolución emocional y reflexiones</p>
          </div>

          {/* Tarjetas de Estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <StatCard icon={CalendarDays} label="Entradas totales" value={0} color="bg-purple-400" />
            <StatCard icon={Heart} label="Sesiones trabajadas" value={0} color="bg-pink-400" />
            <StatCard icon={TrendingUp} label="Sesiones de seguimiento" value={0} color="bg-green-400" />
          </div>

          {/* Botón de Nueva Entrada */}
          <div className="text-center mb-10">
            <button className="bg-brand-purple text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-opacity-90 transition-transform transform hover:scale-105 flex items-center gap-2 mx-auto">
              <Plus size={20} />
              Nueva Entrada del Diario
            </button>
          </div>

          {/* Diario Emocional - Estado Vacío */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-10">
            <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-3">
              <BookOpen className="text-brand-purple" />
              Tu Diario Emocional
            </h2>
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <BookOpen className="mx-auto text-gray-300" size={48} />
              <h3 className="mt-4 text-xl font-semibold text-gray-700">Aún no tienes entradas</h3>
              <p className="mt-1 text-gray-500">Comienza tu diario emocional registrando tus reflexiones y evolución personal.</p>
            </div>
          </div>

          {/* Consejos */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-3">
              <Lightbulb className="text-green-500" />
              Consejos para tu Diario Emocional
            </h2>
            <ul className="space-y-3">
              <TipItem>Escribe regularmente, incluso si son solo unas líneas</TipItem>
              <TipItem>Sé honesto/a contigo mismo/a sobre tus emociones</TipItem>
              <TipItem>Observa patrones en tus conflictos y resentires</TipItem>
              <TipItem>Celebra los pequeños progresos y cambios positivos</TipItem>
              <TipItem>Usa esta información para crecer y evolucionar emocionalmente</TipItem>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProgress;
