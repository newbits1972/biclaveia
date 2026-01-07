import React from 'react';
import { MessageSquare, Shield, PersonStanding, Mic, Utensils, BrainCircuit, Search } from 'lucide-react';

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

      <p className="text-xl text-gray-600 leading-relaxed mb-12">
        Tu cuerpo habla un lenguaje propio, y los síntomas son sus palabras. Lejos de ser nuestros enemigos, los síntomas son mensajeros que nos traen información valiosa sobre un conflicto emocional no resuelto. La biodescodificación nos enseña a escuchar y a descifrar estos mensajes para comprender qué parte de nuestra vida necesita atención y sanación.
      </p>

      <ArticleSection icon={<MessageSquare size={24} className="text-sky-500" />} title="El Cuerpo como Metáfora">
        <p>
          El inconsciente utiliza el cuerpo para expresar lo que no podemos poner en palabras. Un síntoma aparece cuando vivimos un "bioshock" (un conflicto emocional intenso, vivido en soledad y sin solución aparente) y el cerebro, para asegurar nuestra supervivencia, lo desvía hacia un órgano específico. La elección de ese órgano no es al azar, sino que tiene una relación simbólica directa con la naturaleza del conflicto.
        </p>
      </ArticleSection>

      <ArticleSection icon={<Shield size={24} className="text-blue-500" />} title="La Piel: El Conflicto de Contacto y Separación">
        <p>
          La piel es nuestra frontera con el mundo exterior, representa la protección y el contacto. Los problemas de piel (dermatitis, psoriasis, eccemas) suelen hablar de conflictos de:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li><strong>Separación:</strong> Un contacto que se ha perdido y se anhela (la caricia de una madre, un abrazo de la pareja).</li>
          <li><strong>Contacto impuesto:</strong> Un contacto que se sufre y no se desea.</li>
          <li><strong>Mancilla u honor:</strong> Sentirse "manchado" o atacado en la propia integridad.</li>
        </ul>
      </ArticleSection>

      <ArticleSection icon={<PersonStanding size={24} className="text-orange-500" />} title="Las Rodillas: Orgullo y Sumisión">
        <p>
          Las rodillas simbolizan la flexibilidad, la capacidad de "doblegarse" y la dirección que tomamos en la vida. Un dolor o problema en las rodillas puede estar relacionado con:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Conflictos de orgullo: "No me arrodillo ante nadie".</li>
          <li>Sumisión forzada: Sentirse obligado a ceder en una situación en contra de nuestra voluntad.</li>
          <li>Dudas sobre el futuro: Incertidumbre sobre qué camino tomar en la vida.</li>
        </ul>
      </ArticleSection>

      <ArticleSection icon={<Mic size={24} className="text-teal-500" />} title="La Garganta: Lo que no se Dice">
        <p>
          La garganta es el centro de la expresión. Las afonías, faringitis o anginas a menudo se relacionan con palabras no dichas, secretos guardados o emociones que "tragamos" para no generar un conflicto.
        </p>
      </ArticleSection>

      <ArticleSection icon={<Utensils size={24} className="text-amber-500" />} title="El Estómago: Lo que no se Digiere">
        <p>
          El estómago digiere los alimentos, pero simbólicamente también digiere las situaciones de nuestra vida. La gastritis, la acidez o las úlceras pueden señalar una situación o persona que "no podemos tragar" o que nos resulta inaceptable e indigesta.
        </p>
      </ArticleSection>

      <ArticleSection icon={<BrainCircuit size={24} className="text-purple-500" />} title="Las Migrañas: Desvalorización Intelectual">
        <p>
          Las migrañas suelen estar ligadas a un intenso esfuerzo intelectual por resolver un problema sin encontrar la solución, a menudo acompañado de un sentimiento de desvalorización ("no soy lo suficientemente inteligente para resolver esto"). Es un conflicto que opone la lógica a la intuición.
        </p>
      </ArticleSection>

      <ArticleSection icon={<Search size={24} className="text-gray-500" />} title="Una Guía, no un Diccionario">
        <p>
          Es crucial entender que esto es una guía para empezar a hacerse preguntas, no un diccionario de verdades absolutas. El significado preciso de un síntoma siempre está ligado a la historia personalísima de cada individuo. El objetivo es iniciar un diálogo con tu cuerpo y preguntarte: ¿Qué situación viví justo antes de que apareciera este síntoma? ¿Qué emoción estoy reprimiendo? Escuchar la respuesta es el primer paso hacia la sanación.
        </p>
      </ArticleSection>

    </div>
  );
};

export default ArticleContent;
