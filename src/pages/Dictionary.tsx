
import { useState } from 'react';
import { Search, Sparkles, FileText, Users, AlertCircle, BookOpen, Bot, ChevronsRight, Brain, HeartHandshake, Puzzle, Goal, ListChecks, Book, Bike, SearchCheck } from 'lucide-react';
import Card from '../components/ui/Card';
import ErrorBoundary from '../components/ErrorBoundary';
import { runFullAnalysis, AnalysisResult } from '../services/geminiService';

const dictionaryFeatures = [
    {
        icon: <HeartHandshake className="text-red-500" size={24} />,
        tag: "Visión Unificada",
        tagColor: "bg-red-100 text-red-700",
        title: "Perspectiva Integral",
        description: "La IA conecta los puntos entre tu consulta y su significado profundo, ofreciéndote un mensaje central y un simbolismo revelador."
    },
    {
        icon: <Puzzle className="text-blue-500" size={24} />,
        tag: "Múltiples Enfoques",
        tagColor: "bg-blue-100 text-blue-700",
        title: "Desglose por Disciplinas",
        description: "Recibe análisis desde la Biodescodificación, Constelaciones Familiares, Coaching, Mental Healing y la sabiduría arquetípica del Tarot Sistémico."
    },
    {
        icon: <Goal className="text-green-500" size={24} />,
        tag: "Pasos Claros",
        tagColor: "bg-green-100 text-green-700",
        title: "Plan de Acción Consciente",
        description: "Obtén pasos prácticos y recursos sugeridos (libros, ejercicios) para integrar el aprendizaje y tomar las riendas de tu bienestar."
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
      const result = await runFullAnalysis(searchTerm);
      setAnalysis(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Error al procesar la respuesta de la IA: ${err.message}. Es posible que la respuesta no tenga el formato JSON esperado.`);
      } else {
        setError("Ocurrió un error inesperado.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <title>SentIA - Tu Guía Holística IA | Análisis Integral</title>
      <meta name="description" content="Utiliza nuestra IA para un análisis integral de tus síntomas, emociones o situaciones. Recibe perspectivas desde la biodescodificación, constelaciones familiares, coaching y más." />
      <div className="max-w-7xl mx-auto space-y-16 px-4">
        <section className="text-center pt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark-blue">Tu Guía Holística con IA</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Explora el significado profundo de tus síntomas, emociones y situaciones vitales con un análisis integral que abarca múltiples disciplinas de sanación.
          </p>
        </section>

        <section className="max-w-2xl mx-auto space-y-6">
          <div className="p-6 bg-gradient-to-r from-brand-blue to-brand-purple rounded-xl shadow-lg text-white text-center transform hover:scale-105 transition-transform duration-300">
              <Bot className="mx-auto h-8 w-8 mb-2" />
              <h2 className="text-2xl font-bold">Tu Mentora de Bienestar IA</h2>
              <p className="opacity-90">Describe un síntoma, emoción o situación</p>
          </div>

          <div className="flex w-full shadow-sm rounded-lg">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ej: Miedo a hablar en público, conflicto con mi madre, insomnio..."
              className="w-full pl-4 py-3 border-2 border-gray-200 rounded-l-lg focus:ring-2 focus:ring-brand-purple focus:border-transparent transition-all"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={handleSearch} 
              disabled={isLoading}
              className="bg-brand-purple text-white px-4 rounded-r-lg hover:bg-opacity-90 transition-colors flex items-center justify-center disabled:bg-opacity-70 w-24"
              aria-label="Buscar"
            >
              {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <ChevronsRight size={28} />}
            </button>
          </div>
        </section>

        {!isLoading && !analysis && !error && (
          <section>
            <div className="grid gap-8 md:grid-cols-3">
                {dictionaryFeatures.map((feature) => (
                    <Card key={feature.title} className="bg-white/80 backdrop-blur-sm flex flex-col">
                        <div className="flex items-start justify-between">
                            <div className="p-3 bg-white rounded-lg shadow-md">
                                {feature.icon}
                            </div>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${feature.tagColor}`}>
                                {feature.tag}
                            </span>
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-brand-dark-blue">{feature.title}</h3>
                        <p className="mt-1 text-sm text-gray-600 flex-grow">{feature.description}</p>
                    </Card>
                ))}
            </div>
          </section>
        )}

        <section>
          <ErrorBoundary>
            {isLoading && (
              <div className="text-center py-12">
                <Sparkles className="mx-auto h-12 w-12 text-brand-purple animate-pulse" />
                <p className="mt-4 text-gray-600">Tu guía IA está conectando sabiduría para ti... Esto puede tardar unos segundos.</p>
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
               <div className="space-y-10">
                  <div className="text-center">
                    <p className='text-brand-purple font-semibold'>Análisis Integral para:</p>
                    <h2 className="text-3xl font-bold text-brand-dark-blue">
                      "{lastSearchedTerm}"
                    </h2>
                  </div>

                  {/* 1. Perspectiva Integral */}
                  <Card className="bg-gradient-to-br from-brand-blue/90 to-brand-purple/90 text-white shadow-xl">
                      <h3 className="flex items-center text-2xl font-semibold border-b border-white/30 pb-3 mb-4"><HeartHandshake className="mr-3"/>Perspectiva Integral</h3>
                      <div className="space-y-4">
                          <div>
                              <h4 className="font-bold text-lg opacity-90">{analysis.perspectivaIntegral.tituloImpactante}</h4>
                              <p className="mt-2 whitespace-pre-wrap text-lg">{analysis.perspectivaIntegral.mensajeCentral}</p>
                          </div>
                           <div>
                              <h4 className="font-bold text-lg opacity-90">Simbolismo Profundo</h4>
                              <p className="mt-2 whitespace-pre-wrap">{analysis.perspectivaIntegral.simbolismoProfundo}</p>
                          </div>
                      </div>
                  </Card>

                  {/* 2. Desglose por Disciplinas */}
                  <div>
                      <h3 className="flex items-center text-2xl font-semibold text-brand-dark-blue mb-6"><Puzzle className="mr-3 text-brand-purple"/>Desglose por Disciplinas</h3>
                      <div className="grid md:grid-cols-2 gap-6">
                          <Card className="bg-white flex flex-col">
                              <h4 className="font-bold text-brand-dark-blue flex items-center mb-2"><FileText className="mr-2 text-red-500"/>Biodescodificación</h4>
                              <p className='text-gray-700 mt-2'><strong className='text-gray-800'>Conflicto Emocional:</strong> {analysis.desglosePorDisciplinas.biodescodificacion.conflictoEmocional}</p>
                              <p className='text-gray-700 mt-2'><strong className='text-gray-800'>Utilidad Biológica:</strong> {analysis.desglosePorDisciplinas.biodescodificacion.utilidadBiologica}</p>
                          </Card>
                          <Card className="bg-white flex flex-col">
                              <h4 className="font-bold text-brand-dark-blue flex items-center mb-2"><Users className="mr-2 text-blue-500"/>Constelaciones Familiares</h4>
                               <p className='text-gray-700 mt-2'><strong className='text-gray-800'>Implicancia Sistémica:</strong> {analysis.desglosePorDisciplinas.constelacionesFamiliares.implicanciaSistemica}</p>
                              <p className='text-gray-700 mt-4 italic bg-blue-50 p-3 rounded-lg'><strong className='text-gray-800 not-italic'>Pregunta Sanadora:</strong> "{analysis.desglosePorDisciplinas.constelacionesFamiliares.preguntaSanadora}"</p>
                          </Card>
                          <Card className="bg-white flex flex-col col-span-1 md:col-span-2">
                              <h4 className="font-bold text-brand-dark-blue flex items-center mb-2"><Brain className="mr-2 text-green-500"/>Coaching y Mental Healing</h4>
                               <div className='mt-2'>
                                <strong className='text-gray-800'>Creencias Limitantes:</strong>
                                <ul className='list-disc list-inside mt-1 space-y-1 text-gray-700'>
                                  {analysis.desglosePorDisciplinas.coachingYMentalHealing.creenciasLimitantes.map((creencia, i) => <li key={i}>{creencia}</li>)}
                                </ul>
                               </div>
                               <div className='mt-4'>
                                <strong className='text-gray-800'>Preguntas de Coaching:</strong>
                                <ul className='list-disc list-inside mt-1 space-y-1 text-gray-700'>
                                  {analysis.desglosePorDisciplinas.coachingYMentalHealing.preguntasDeCoaching.map((pregunta, i) => <li key={i}>{pregunta}</li>)}
                                </ul>
                               </div>
                               <p className="mt-4 p-3 bg-green-100 text-green-800 rounded-md italic"><strong className="text-green-900 not-italic">Afirmación Empoderadora:</strong> "{analysis.desglosePorDisciplinas.coachingYMentalHealing.afirmacionEmpoderadora}"</p>
                          </Card>
                          <Card className="bg-white flex flex-col">
                              <h4 className="font-bold text-brand-dark-blue flex items-center mb-2"><Sparkles className="mr-2 text-purple-500"/>Tarot Sistémico</h4>
                              <p className='text-gray-700 mt-2'><strong className='text-gray-800'>Arquetipo Principal:</strong> {analysis.desglosePorDisciplinas.tarotSistemico.arquetipoPrincipal}</p>
                              <p className='text-gray-700 mt-2'><strong className='text-gray-800'>Consejo del Tarot:</strong> {analysis.desglosePorDisciplinas.tarotSistemico.consejoDelTarot}</p>
                          </Card>
                      </div>
                  </div>

                  {/* 3. Plan de Acción Consciente */}
                  <Card className="bg-white">
                      <h3 className="flex items-center text-2xl font-semibold text-brand-purple border-b pb-2 mb-4"><Goal className="mr-3"/>Plan de Acción Consciente</h3>
                      <div className="space-y-6 md:flex md:space-y-0 md:space-x-8">
                          <div className='flex-1'>
                              <h4 className="font-bold text-lg text-brand-dark-blue flex items-center mb-2"><ListChecks className='mr-2'/>Pasos para la Toma de Conciencia</h4>
                              <ul className='list-decimal list-inside space-y-2 text-gray-700'>
                                {analysis.planDeAccionConsciente.pasosParaLaTomaDeConciencia.map((paso, i) => <li key={i}>{paso}</li>)}
                              </ul>
                          </div>
                          <div className='flex-1 border-t md:border-t-0 md:border-l md:pl-8 pt-6 md:pt-0'>
                              <h4 className="font-bold text-lg text-brand-dark-blue flex items-center mb-2"><BookOpen className='mr-2'/>Recursos Sugeridos</h4>
                              <div className='space-y-3 text-sm'>
                                  <p><strong className='flex items-center'><Book className='mr-2 text-amber-600'/>Lecturas:</strong> {analysis.planDeAccionConsciente.recursosSugeridos.lecturas.join(', ')}</p>
                                  <p><strong className='flex items-center'><Bike className='mr-2 text-cyan-600'/>Prácticas:</strong> {analysis.planDeAccionConsciente.recursosSugeridos.practicas.join(', ')}</p>
                                  <p><strong className='flex items-center'><SearchCheck className='mr-2 text-indigo-600'/>Profundización:</strong> {analysis.planDeAccionConsciente.recursosSugeridos.profundizacion.join(', ')}</p>
                              </div>
                          </div>
                      </div>
                  </Card>
              </div>
            )}
          </ErrorBoundary>
        </section>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg text-sm text-yellow-700 my-12">
          <strong className="text-yellow-800">Descargo de Responsabilidad:</strong> Este análisis de IA es una herramienta de reflexión, autoconocimiento y empoderamiento. No sustituye el diagnóstico, consejo o tratamiento de un profesional de la salud física o mental.
        </div>
      </div>
    </>
  );
};

export default Dictionary;
