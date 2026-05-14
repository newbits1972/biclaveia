
import { useState } from 'react';
import { realizarTiradaTarot } from '../services/geminiService';
import { TiradaTarotSchema } from '../schemas/analisisSchema';
import { z } from 'zod';
import Button from '../components/ui/Button';
import { toast } from 'sonner';
import { RotateCcw, ChevronRight } from 'lucide-react';

type TiradaTarotResult = z.infer<typeof TiradaTarotSchema>;

interface Arcano {
  id: number;
  nombre: string;
  slug: string;
}

const ARCANOS_MAYORES: Arcano[] = [
  { id: 0, nombre: "El Loco", slug: "el-loco" },
  { id: 1, nombre: "El Mago", slug: "el-mago" },
  { id: 2, nombre: "La Papisa", slug: "la-papisa" },
  { id: 3, nombre: "La Emperatriz", slug: "la-emperatriz" },
  { id: 4, nombre: "El Emperador", slug: "el-emperador" },
  { id: 5, nombre: "El Papa", slug: "el-papa" },
  { id: 6, nombre: "El Enamorado", slug: "el-enamorado" },
  { id: 7, nombre: "El Carro", slug: "el-carro" },
  { id: 8, nombre: "La Justicia", slug: "la-justicia" },
  { id: 9, nombre: "El Ermitaño", slug: "el-ermitano" },
  { id: 10, nombre: "La Rueda de la Fortuna", slug: "la-rueda-de-la-fortuna" },
  { id: 11, nombre: "La Fuerza", slug: "la-fuerza" },
  { id: 12, nombre: "El Colgado", slug: "el-colgado" },
  { id: 13, nombre: "La Muerte", slug: "la-muerte" },
  { id: 14, nombre: "La Templanza", slug: "la-templanza" },
  { id: 15, nombre: "El Diablo", slug: "el-diablo" },
  { id: 16, nombre: "La Torre", slug: "la-torre" },
  { id: 17, nombre: "La Estrella", slug: "la-estrella" },
  { id: 18, nombre: "La Luna", slug: "la-luna" },
  { id: 19, nombre: "El Sol", slug: "el-sol" },
  { id: 20, nombre: "El Juicio", slug: "el-juicio" },
  { id: 21, nombre: "El Mundo", slug: "el-mundo" }
];

const TiradaTarot = () => {
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [pregunta, setPregunta] = useState('');
  const [step, setStep] = useState<'datos' | 'seleccion' | 'resultado'>('datos');
  const [mazo, setMazo] = useState<Arcano[]>([]);
  const [seleccionadas, setSeleccionadas] = useState<{ arcano: Arcano; index: number }[]>([]);
  const [resultado, setResultado] = useState<TiradaTarotResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const iniciarSeleccion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !fechaNacimiento.trim() || !pregunta.trim()) {
      toast.error('Completa los datos para la conexión.');
      return;
    }
    setMazo([...ARCANOS_MAYORES].sort(() => Math.random() - 0.5));
    setStep('seleccion');
  };

  const seleccionarCarta = (arcano: Arcano, index: number) => {
    if (seleccionadas.length >= 3 || seleccionadas.some(s => s.index === index)) return;
    const nuevas = [...seleccionadas, { arcano, index }];
    setSeleccionadas(nuevas);
    if (nuevas.length === 3) {
      setTimeout(() => obtenerInterpretacion(nuevas.map(s => s.arcano.nombre)), 1200);
    }
  };

  const obtenerInterpretacion = async (cartas: string[]) => {
    setIsLoading(true);
    try {
      const res = await realizarTiradaTarot(nombre, fechaNacimiento, pregunta, cartas);
      setResultado(res);
      setStep('resultado');
    } catch {
      toast.error('Error en la conexión mística.');
      setSeleccionadas([]);
    } finally {
      setIsLoading(false);
    }
  };

  const getImgPath = (slug: string) => `/assets/tarot/${slug}.png`;

  return (
    <div 
      className="w-full min-h-screen text-white overflow-x-hidden pb-20 relative bg-[#1a0b2e]"
      style={{ 
        background: `radial-gradient(circle at center, #4a2c7a 0%, #1a0b2e 100%)`,
      }}
    >
      {/* Capa de Ruido/Textura */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

        <header className="text-center pt-12 mb-4 animate-in fade-in duration-1000">
          <h1 className="text-4xl md:text-6xl font-serif font-bold bg-gradient-to-b from-amber-200 to-amber-500 bg-clip-text text-transparent tracking-tighter">
            Templo de Marsella
          </h1>
          <p className="text-amber-200/50 uppercase tracking-[0.3em] text-xs mt-2">Consulta Evolutiva con Inteligencia Artificial</p>
        </header>

        {step === 'datos' && (
          <div className="container mx-auto px-4 max-w-xl">
            <div className="bg-black/20 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl animate-in zoom-in-95 duration-500">
              <form onSubmit={iniciarSeleccion} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-amber-500">Nombre del Consultante</label>
                    <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} className="bg-transparent border-b border-white/20 p-2 outline-none focus:border-amber-500 transition-colors text-xl font-serif" placeholder="Tu nombre..." required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-amber-500">Fecha de Nacimiento</label>
                    <input type="date" value={fechaNacimiento} onChange={e => setFechaNacimiento(e.target.value)} className="bg-transparent border-b border-white/20 p-2 outline-none focus:border-amber-500 transition-colors invert" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-amber-500">Tu Intención o Pregunta</label>
                    <textarea value={pregunta} onChange={e => setPregunta(e.target.value)} className="bg-black/20 border border-white/10 rounded-xl p-4 h-32 outline-none focus:border-amber-500 transition-all resize-none font-serif text-lg" placeholder="¿Qué necesitas entender hoy?..." required />
                  </div>
                </div>
                <Button type="submit" className="w-full py-6 bg-amber-600 hover:bg-amber-500 text-black font-black uppercase tracking-tighter text-lg">
                  Comenzar Tirada <ChevronRight className="inline ml-1" />
                </Button>
              </form>
            </div>
          </div>
        )}

        {step === 'seleccion' && (
          <div className="flex flex-col items-center justify-start min-h-[80vh] pt-10 px-4">
            {/* SECCIÓN SUPERIOR - CARTAS SELECCIONADAS */}
            <div className="w-full max-w-2xl text-center z-20 mb-12">
               <p className="text-3xl font-serif italic text-amber-100 mb-8 animate-pulse">Elige 3 cartas, {nombre}...</p>
               <div className="flex gap-6 justify-center">
                     {[0,1,2].map(i => (
                    <div key={i} className={`relative w-20 h-[140px] rounded-xl border-2 transition-all duration-700 overflow-hidden ${seleccionadas[i] ? 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.6)] scale-110' : 'border-white/10 bg-black/40 backdrop-blur-md'}`}>
                      {seleccionadas[i] && <img src={getImgPath(seleccionadas[i].arcano.slug)} className="w-full h-full object-cover" alt="carta" />}
                      {!seleccionadas[i] && (
                          <div className="absolute inset-0 flex items-center justify-center">
                               <span className="text-[10px] font-bold text-white/10 uppercase tracking-[0.3em] rotate-[-90deg]">
                                  {i === 0 ? 'Pasado' : i === 1 ? 'Presente' : 'Futuro'}
                                </span>
                          </div>
                      )}
                    </div>
                  ))}
               </div>
            </div>

            {/* SECCIÓN INFERIOR - ABANICO DE CARTAS */}
            <div className="relative w-full h-[350px] flex justify-center items-end overflow-visible mt-4">

              {mazo.map((arcano, idx) => {
                const isSelected = seleccionadas.some(s => s.index === idx);
                const total = mazo.length;
                const range = 140; // Angulo total del abanico
                const angle = (idx - (total - 1) / 2) * (range / total);
                
                return (
                  <div 
                    key={idx}
                    onClick={() => seleccionarCarta(arcano, idx)}
                    style={{
                      position: 'absolute',
                      transformOrigin: '50% 150%',
                      transform: `rotate(${angle}deg) translateY(${isSelected ? '-300px' : '0'}) scale(${isSelected ? 0 : 1})`,
                      opacity: isSelected ? 0 : 1,
                      transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      zIndex: idx,
                      left: 'calc(50% - 48px)'
                    }}
                    className={`w-24 h-[160px] ${!isSelected && 'hover:-translate-y-12 cursor-pointer'} ${isLoading ? 'pointer-events-none' : ''}`}>

                    <div className="flip-card-inner">
                      <div className="flip-card-front bg-black/50 border-2 border-amber-900 shadow-2xl rounded-xl flex items-center justify-center overflow-hidden">
                         <img src="/assets/reverso-carta.jpg" className="w-full h-full object-cover" alt="Reverso de la carta" />
                      </div>
                      <div className="flip-card-back bg-white border-2 border-amber-500 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                        <img src={getImgPath(arcano.slug)} className="w-full h-full object-cover" alt={arcano.nombre} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === 'resultado' && resultado && (
          <div className="container mx-auto px-4 max-w-6xl animate-in fade-in slide-in-from-bottom-12 duration-1000">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
              {resultado.cartas.map((carta, index) => {
                const arcanoInfo = ARCANOS_MAYORES.find(a => a.nombre.toLowerCase() === carta.nombre.toLowerCase());
                const rotation = index === 0 ? -15 : index === 2 ? 15 : 0;
                const translateY = index === 1 ? -20 : 0;
                
                return (
                  <div 
                    key={index} 
                    className="flex flex-col items-center group transition-transform duration-700 hover:z-50"
                    style={{ transform: `rotate(${rotation}deg) translateY(${translateY}px)` }}
                  >
                    <div className="mb-4 text-[10px] font-black text-amber-500 uppercase tracking-[0.5em]">{carta.posicion}</div>
                    <div className="w-36 aspect-[327/640] relative rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)] border-4 border-amber-500/20 group-hover:border-amber-500 group-hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all duration-500 bg-black">
                      {arcanoInfo && <img src={getImgPath(arcanoInfo.slug)} className="w-full h-full object-cover" alt={carta.nombre} />}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 inset-x-0 text-center text-lg font-serif font-bold tracking-tight text-amber-100">{carta.nombre}</div>
                    </div>
                    <div className="mt-8 bg-black/40 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center italic text-amber-50/90 leading-relaxed min-h-[120px] flex items-center shadow-xl max-w-[280px]">
                      "{carta.significado}"
                    </div>
                  </div>
                );

              })}
            </div>

            <div className="bg-gradient-to-br from-amber-900/40 to-black/40 border border-amber-500/20 rounded-[3rem] p-12 shadow-3xl text-center mb-16 relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-amber-500"></div>
              <h2 className="text-3xl font-serif font-bold text-amber-200 mb-6 uppercase tracking-widest">El Consejo de los Arcanos</h2>
              <p className="text-2xl text-white font-medium leading-relaxed max-w-4xl mx-auto italic font-serif">
                "{resultado.conclusionGeneral}"
              </p>
            </div>

            <div className="flex justify-center">
              <button onClick={() => setStep('datos')} className="flex items-center gap-2 text-amber-500 font-bold hover:text-amber-400 transition-colors uppercase tracking-widest text-xs border border-amber-500/20 px-8 py-4 rounded-full bg-black/20 backdrop-blur-sm">
                <RotateCcw size={16} /> Nueva Consulta Sagrada
              </button>
            </div>
          </div>
        )}

      {isLoading && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex flex-col items-center justify-center">
          <div className="w-32 h-32 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-8"></div>
          <p className="text-3xl font-serif italic text-amber-200 animate-pulse">Los Arcanos están revelando tu camino...</p>
        </div>
      )}
    </div>
  );
};

export default TiradaTarot;

