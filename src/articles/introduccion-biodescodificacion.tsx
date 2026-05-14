import React from 'react';
import { Zap, Heart, GitBranch } from 'lucide-react';

// Componente reutilizable para cada sección del artículo
const ArticleSection: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <section className="mb-12">
    <h3 className="flex items-center text-2xl font-bold text-gray-800 mb-4">
      {icon}
      <span className="ml-3">{title}</span>
    </h3>
    <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
      {children}
    </div>
  </section>
);

const ArticleContent: React.FC = () => {
  return (
    <div className="max-w-none">

      {/* Párrafo de introducción con un estilo más destacado */}
      <p className="text-xl text-gray-600 leading-relaxed mb-12">
        La Biodescodificación es un enfoque revolucionario que nos invita a escuchar nuestro cuerpo de una manera diferente. Propone que detrás de cada síntoma o enfermedad, existe un conflicto emocional no resuelto, una historia no contada que busca ser sanada. Es el arte de descodificar los mensajes del alma que se manifiestan en la biología.
      </p>

      <ArticleSection icon={<Zap size={24} className="text-teal-500" />} title="El 'Bioshock': El Impacto que lo Inicia Todo">
        <p>
          La premisa central es que un síntoma aparece tras un "bioshock". No es un simple evento estresante, sino un impacto emocional que se vive de forma:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li><strong>Dramática e Inesperada:</strong> Nos toma por sorpresa, sin preparación.</li>
          <li><strong>Vivida en Soledad:</strong> No lo compartimos o sentimos que nadie puede entendernos.</li>
          <li><strong>Sin Solución Aparente:</strong> En el momento del shock, no vemos una salida o respuesta satisfactoria.</li>
        </ul>
        <p>
          Ante este impacto, el cerebro, en su infinita sabiduría de supervivencia, traslada el conflicto del plano psíquico al plano físico para "salvarnos". El síntoma es, por tanto, una solución de adaptación.
        </p>
      </ArticleSection>

      <ArticleSection icon={<Heart size={24} className="text-pink-500" />} title="El Resentir: La Emoción Oculta">
        <p>
          El "resentir" es la emoción o sentimiento profundo que queda grabado como consecuencia del bioshock. Es una emoción que se vuelve a sentir (re-sentir) constantemente a nivel inconsciente. La biodescodificación busca identificar y traer a la conciencia este resentir. Ponerle palabras, fecha y contexto es el primer paso para liberarlo y permitir que el cuerpo inicie su propio camino de curación.
        </p>
        <blockquote className="border-l-4 border-purple-400 bg-purple-50 p-6 rounded-r-lg my-6">
          <p className="italic text-gray-800">
            "La enfermedad es el esfuerzo que hace la naturaleza para curar al hombre. No hay que luchar contra ella, sino integrarla, comprenderla y trascenderla."
          </p>
          <cite className="block text-right text-gray-600 mt-2">- Carl G. Jung</cite>
        </blockquote>
      </ArticleSection>

      <ArticleSection icon={<GitBranch size={24} className="text-sky-500" />} title="No Estamos Solos en Nuestra Historia">
        <p>
          Este enfoque también considera la influencia de las historias de nuestros ancestros (lo Transgeneracional) y los eventos emocionales durante nuestra gestación (el Proyecto Sentido). Muchas veces, no solo cargamos con nuestros propios conflictos, sino que reparamos o repetimos lealtades familiares invisibles. Comprender esto nos abre a una liberación mucho más profunda.
        </p>
        <p>
          BioClave IA es una herramienta diseñada para ser tu compañera en esta exploración. Te ayuda a conectar las pistas, a formular las preguntas correctas y a descubrir el propósito y el mensaje que cada síntoma tiene para ti.
        </p>
      </ArticleSection>

    </div>
  );
};

export default ArticleContent;
