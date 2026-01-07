import React from 'react';
import { Zap, Users, GitBranch } from 'lucide-react';

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
        Antes de nacer, no somos una página en blanco. Somos un proyecto, un sentido, un cúmulo de deseos, expectativas y emociones del mundo que nos espera. El <strong>"Proyecto Sentido Gestacional"</strong> es uno de los conceptos más profundos de la Biodescodificación, y se refiere a todo lo que nuestros padres (y el clan familiar) vivieron y sintieron desde antes de nuestra concepción hasta nuestros primeros años de vida.
      </p>

      <ArticleSection icon={<Zap size={24} className="text-teal-500" />} title="La Programación Inconsciente">
        <p>
          Durante la gestación, el bebé no tiene un filtro consciente. Es una esponja emocional que absorbe directamente el estado interior de la madre: sus miedos, sus alegrías, sus conflictos no resueltos, el estrés del ambiente, las tensiones con el padre. Todo esto se graba en nuestras células como un programa de supervivencia.
        </p>
        <p>
          El "sentido" de nuestra llegada puede ser muy variado:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Un hijo para "salvar" un matrimonio.</li>
          <li>Un hijo para reemplazar a alguien que falleció.</li>
          <li>Un hijo que no era esperado o que llegó "en el momento equivocado".</li>
          <li>Un hijo para cumplir los sueños no realizados de los padres.</li>
        </ul>
        <p>
         Inconscientemente, nuestra vida puede convertirse en un intento de cumplir con ese "proyecto" original. Por ejemplo, una persona concebida para "unir" a sus padres puede desarrollar una dependencia emocional extrema o un miedo atroz a la soledad.
        </p>
      </ArticleSection>

      <ArticleSection icon={<Users size={24} className="text-pink-500" />} title="¿Cómo Nos Afecta Hoy?">
        <p>
          Este programa inicial puede manifestarse en nuestra vida adulta como patrones repetitivos, elecciones de pareja, profesiones, e incluso síntomas físicos. Si la madre vivió un gran miedo al abandono durante el embarazo, el hijo podría nacer con problemas de piel (conflicto de separación) o desarrollar relaciones de codependencia. Si el ambiente era de escasez económica, la persona podría tener dificultades para generar prosperidad, sin entender por qué.
        </p>
        <blockquote className="border-l-4 border-purple-400 bg-purple-50 p-6 rounded-r-lg my-6">
          <p className="italic text-gray-800">
            Descubrir nuestro Proyecto Sentido no se trata de culpar a nuestros padres, quienes hicieron lo mejor que pudieron con su propia historia. Se trata de comprender, de traer luz a lo inconsciente para poder elegir con libertad nuestro propio camino.
          </p>
        </blockquote>
      </ArticleSection>

      <ArticleSection icon={<GitBranch size={24} className="text-sky-500" />} title="El Camino Hacia la Libertad">
        <p>
         La clave es la toma de conciencia. Al entender cuál fue el "contrato" inconsciente con el que llegamos, podemos decidir si queremos seguir cumpliéndolo o si preferimos escribir uno nuevo. Herramientas como BioClave IA pueden ofrecerte pistas valiosas al analizar tus síntomas, invitándote a reflexionar si su origen podría estar conectado con esta etapa tan temprana y fundamental de tu existencia.
        </p>
      </ArticleSection>

    </div>
  );
};

export default ArticleContent;
