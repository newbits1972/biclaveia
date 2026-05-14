import React from 'react';
import { Repeat, Calendar, Users, AlertTriangle, BookOpen, Lightbulb } from 'lucide-react';

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
        ¿Has observado que ciertos eventos importantes, tanto felices como dramáticos, tienden a repetirse en tu familia a edades específicas? ¿O que en tu propia vida hay situaciones que reaparecen cada cierto número de años? No es casualidad. La biodescodificación llama a este fenómeno los <strong>Ciclos Biológicos Celulares Memorizados</strong>. Son programas inconscientes de tiempo que nos marcan y definen mucho más de lo que imaginamos.
      </p>

      <ArticleSection icon={<Repeat size={24} className="text-sky-500" />} title="¿Qué son los Ciclos Biológicos?">
        <p>
          Nuestro inconsciente no entiende el tiempo de forma lineal como lo hacemos nosotros. Para él, el tiempo es cíclico. Un evento con un alto impacto emocional (un "bioshock") queda grabado en nuestras células, creando un programa. La función de este programa es advertirnos: "¡Atención! Cuando se acerque una fecha o edad similar a aquella donde ocurrió el drama, prepárate porque algo parecido podría suceder". Es una especie de alarma biológica de supervivencia.
        </p>
      </ArticleSection>

      <ArticleSection icon={<Calendar size={24} className="text-red-500" />} title="Ciclos Verticales: La Afinidad por Fechas">
        <p>
          Estos son los ciclos más conocidos y se relacionan directamente con las fechas del árbol genealógico. Si un abuelo murió a los 45 años, es posible que sus nietos, al acercarse a esa edad, vivan un evento importante (una enfermedad, un accidente, una mudanza, un cambio de trabajo). El inconsciente familiar busca una forma de recordar y honrar el drama del ancestro. A esto se le llama ser "heredero" de un programa.
        </p>
      </ArticleSection>

      <ArticleSection icon={<Users size={24} className="text-teal-500" />} title="Ciclos Horizontales: Tu Propia Autobiografía">
        <p>
          Estos ciclos se manifiestan en tu propia vida. Se basan en divisiones de tu edad actual. Los más comunes son los ciclos de 2 (la mitad de tu vida), pero también existen otros. Por ejemplo:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Una persona de <strong>30 años</strong> puede estar repitiendo inconscientemente un conflicto que vivió a los <strong>15 años</strong>.</li>
          <li>Alguien de <strong>40</strong> podría estar "resonando" con un evento de sus <strong>20 años</strong>.</li>
        </ul>
        <p>
          Si a los 15 años viviste el divorcio conflictivo de tus padres (un bioshock), a los 30 podrías encontrarte en medio de una crisis de pareja muy similar, sin entender por qué.
        </p>
      </ArticleSection>

      <ArticleSection icon={<AlertTriangle size={24} className="text-amber-500" />} title="El Síndrome del Aniversario">
        <p>
          Este es un tipo de ciclo muy puntual. Se manifiesta como la aparición de un síntoma o la vivencia de un evento justo en la misma fecha (día y mes) en que ocurrió un drama en el pasado (propio o de un ancestro). Por ejemplo, cada 15 de abril, una persona sufre una crisis de ansiedad inexplicable. Al investigar, descubre que un 15 de abril de hace muchos años, su padre sufrió un grave accidente.
        </p>
      </ArticleSection>

      <ArticleSection icon={<BookOpen size={24} className="text-indigo-500" />} title="¿Cómo se Calculan y se Trabajan?">
        <p>
          El primer paso es investigar tu historia y la de tu familia, prestando especial atención a las edades y fechas en que ocurrieron los eventos importantes (nacimientos, muertes, bodas, enfermedades, mudanzas, etc.). Anotar todo en una línea de tiempo puede revelar patrones sorprendentes.
        </p>
      </ArticleSection>

      <ArticleSection icon={<Lightbulb size={24} className="text-purple-500" />} title="Tomar Conciencia para Desprogramar">
        <p>
          La clave, como siempre en biodescodificación, es la <strong>toma de conciencia</strong>. Cuando identificas un ciclo y comprendes de dónde viene, el programa pierde su poder sobre ti. Dejas de ser una víctima del piloto automático de tu inconsciente. Ponerle palabras al conflicto original ("Esto no es mío, esto es la lealtad que tengo con mi abuela" o "Estoy repitiendo el miedo que sentí a los 15") te permite diferenciar tu presente de aquel pasado y tomar decisiones nuevas y más libres.
        </p>
      </ArticleSection>

    </div>
  );
};

export default ArticleContent;
