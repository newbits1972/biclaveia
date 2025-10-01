import { useState } from 'react';
import { Search, Sparkles, FileText, Users, AlertCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import ErrorBoundary from '../components/ErrorBoundary';
import { runGeminiAnalysis, AnalysisResult } from '../services/geminiService';

const dictionaryFeatures = [
    {
        icon: <FileText className="text-red-500" size={24} />,
        tag: "IA Avanzada",
        tagColor: "bg-red-100 text-red-700",
        title: "Análisis Profundo",
        description: "La IA analiza tu consulta desde múltiples perspectivas: conflictos emocionales, memorias biológicas, programas de supervivencia de diferentes expertos."
    },
    {
        icon: <Users className="text-blue-500" size={24} />,
        tag: "Múltiples Fuentes",
        tagColor: "bg-blue-100 text-blue-700",
        title: "Expertos Consultados",
        description: "Incluye perspectivas de Joan Marc Vilanova, Louise Hay, Dr. Hamer, Enric Corbera, y otros especialistas en biodescodificación."
    },
    {
        icon: <Sparkles className="text-green-500" size={24} />,
        tag: "Recomendaciones",
        tagColor: "bg-green-100 text-green-700",
        title: "Soluciones Personalizadas",
        description: "Recibe recomendaciones específicas de sanación, incluyendo constelaciones alimentarias, y sistemas de transformación emocional."
    }
];

const Dictionary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [lastSearchedTerm, setLastSearchedTerm] = useState('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setIsLoading(true);
    setAnalysis(null);
    setError(null);
    setLastSearchedTerm(searchTerm);

    try {
      const result = await runGeminiAnalysis(searchTerm);
      setAnalysis(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-16">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark-blue">Análisis Inteligente de Biodescodificación</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
          Utiliza IA para obtener análisis profundos de biodescodificación. Nuestro sistema consulta como experto a diversos especialistas reconocidos en el campo.
        </p>
      </section>

      <section className="max-w-2xl mx-auto space-y-6">
        <div className="p-6 bg-gradient-to-r from-brand-blue to-brand-purple rounded-xl shadow-lg text-white text-center transform hover:scale-105 transition-transform duration-300">
            <Sparkles className="mx-auto h-8 w-8 mb-2" />
            <h2 className="text-2xl font-bold">Análisis de Biodescodificación IA</h2>
            <p className="opacity-90">Consulta a tu Terapeuta IA</p>
        </div>

        <div className="flex w-full shadow-sm rounded-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Describe tu síntoma o dolencia"
            className="w-full pl-4 py-3 border-2 border-gray-200 rounded-l-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch} 
            disabled={isLoading}
            className="bg-brand-purple text-white px-4 rounded-r-lg hover:bg-opacity-90 transition-colors flex items-center justify-center disabled:bg-opacity-70 w-20"
            aria-label="Buscar"
          >
            {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Search />}
          </button>
        </div>
      </section>

      <section>
        <div className="grid gap-8 md:grid-cols-3">
            {dictionaryFeatures.map((feature) => (
                <Card key={feature.title} className="bg-white/80 backdrop-blur-sm">
                    <div className="flex items-start justify-between">
                        <div className="p-3 bg-white rounded-lg shadow-md">
                            {feature.icon}
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${feature.tagColor}`}>
                            {feature.tag}
                        </span>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-brand-dark-blue">{feature.title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{feature.description}</p>
                </Card>
            ))}
        </div>
      </section>

      <section>
        <ErrorBoundary>
          {isLoading && (
            <div className="text-center py-12">
              <Sparkles className="mx-auto h-12 w-12 text-brand-purple animate-pulse" />
              <p className="mt-4 text-gray-600">La IA está procesando tu consulta...</p>
            </div>
          )}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error en el Análisis</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {analysis && (
            <Card className="bg-white space-y-6">
              <h2 className="text-2xl font-bold text-brand-dark-blue">Resultados del Análisis para "{lastSearchedTerm}"</h2>
              <div>
                <h3 className="font-semibold text-lg text-brand-purple">Conflicto Emocional</h3>
                <p className="mt-1 text-gray-700">{analysis.conflicto}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-brand-purple">Resentir Biológico</h3>
                <p className="mt-1 text-gray-700 italic">"{analysis.resentir}"</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-brand-purple">Perspectivas de Expertos</h3>
                <div className="mt-2 space-y-2 text-sm">
                  {Object.entries(analysis.expertos).map(([expert, perspective]) => (
                    <p key={expert}><strong className="text-gray-800">{expert}:</strong> {perspective}</p>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-brand-purple">Recomendaciones</h3>
                <p className="mt-1 text-gray-700">{analysis.recomendaciones}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-brand-purple">Cromoterapia Sugerida</h3>
                <p className="mt-1 text-gray-700">{analysis.cromoterapia}</p>
              </div>
            </Card>
          )}
        </ErrorBoundary>
      </section>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg text-sm text-yellow-700">
        <strong className="text-yellow-800">Descargo de Responsabilidad:</strong> Este análisis de IA es una herramienta de reflexión y autoconocimiento. No sustituye el diagnóstico médico profesional ni las terapias oficiales.
      </div>
    </div>
  );
};

export default Dictionary;
