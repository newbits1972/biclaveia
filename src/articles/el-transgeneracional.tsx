import React from 'react';
import { GitBranch, Users, Key, HeartCrack, Sparkles } from 'lucide-react';

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
        ¿Alguna vez has sentido que repites patrones de conducta que no comprendes? ¿O que cargas con una tristeza, un miedo o una ansiedad que no parecen tener un origen claro en tu propia vida? La biodescodificación nos ofrece una perspectiva fascinante: no solo somos individuos, sino también el resultado de una larga historia familiar. Somos un eslabón en una cadena de lealtades, secretos y dramas no resueltos. Esto es el <strong>transgeneracional</strong>.
      </p>

      <ArticleSection icon={<GitBranch size={24} className="text-sky-500" />} title="¿Qué es el Legado Transgeneracional?">
        <p>
          El transgeneracional es la información inconsciente que se transmite de generación en generación y que acaba manifestándose en nuestra vida. No hablamos de herencia genética, sino de una herencia emocional y psicológica. Secretos familiares, muertes trágicas o prematuras, abortos, injusticias, ruinas económicas, enfermedades... todo lo que fue un drama y no se pudo expresar o sanar, queda "congelado" en el inconsciente familiar, buscando una salida.
        </p>
      </ArticleSection>

      <ArticleSection icon={<Users size={24} className="text-teal-500" />} title="Lealtades Familiares Invisibles">
        <p>
          Para pertenecer a nuestro clan, un requisito fundamental para la supervivencia, desarrollamos "lealtades invisibles". De forma inconsciente, prometemos fidelidad a nuestros ancestros y a sus destinos. Esto puede llevarnos a:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li><strong>Repetir una historia:</strong> "Mi abuela fue abandonada por su marido, y yo siempre elijo parejas que me abandonan".</li>
          <li><strong>Reparar una historia:</strong> "Mi abuelo se arruinó, así que yo me convierto en un adicto al trabajo para generar una fortuna, aunque eso me cueste la salud y la felicidad".</li>
          <li><strong>Cargar con una emoción:</strong> Sentir una profunda melancolía sin motivo aparente, que resulta ser la tristeza no expresada de una bisabuela que perdió un hijo.</li>
        </ul>
        <p>
          No lo hacemos por masoquismo, sino por amor ciego y por un profundo sentido de pertenencia. El inconsciente no distingue el tiempo; para él, el drama del ancestro sigue activo y necesita ser visto.
        </p>
      </ArticleSection>

      <ArticleSection icon={<Key size={24} className="text-amber-500" />} title="Los 'Doble Yaciente' y los Fantasmas">
        <p>
          Un concepto clave es el de ser "doble" de un ancestro. Esto ocurre cuando nacemos en la misma fecha (o en fechas cercanas) que la de nacimiento o muerte de un familiar. Inconscientemente, el clan nos asigna la tarea de "reemplazar" o "representar" a esa persona. Si el ancestro tuvo una vida trágica, podemos sentirnos bloqueados, como si no tuviéramos permiso para vivir nuestra propia vida plenamente.
        </p>
      </ArticleSection>

      <ArticleSection icon={<HeartCrack size={24} className="text-red-500" />} title="Los Secretos: El Veneno del Árbol">
        <p>
          Lo que no se habla, se actúa. Los secretos familiares (hijos ilegítimos, estafas, enfermedades vergonzosas, crímenes) son la energía más tóxica para un árbol genealógico. El secreto siempre busca salir a la luz y puede manifestarse en las generaciones futuras a través de síntomas físicos, enfermedades mentales o destinos inexplicables.
        </p>
      </ArticleSection>

      <ArticleSection icon={<Sparkles size={24} className="text-purple-500" />} title="¿Cómo Sanar el Transgeneracional?">
        <p>
          El primer paso es la <strong>toma de conciencia</strong>. Estudiar tu árbol genealógico, conocer las historias, las fechas y los dramas es un acto de amor que empieza a traer luz a la oscuridad.
        </p>
        <p>
          Comprender que esa enfermedad, ese patrón o esa limitación no es "tuya" sino que te "habla de" una historia más grande, te permite desidentificarte de ella. Al darle un lugar a ese ancestro y a su dolor, honrando su destino sin sentir la necesidad de repetirlo, inicias un proceso de liberación. No se trata de culpar, sino de comprender y agradecer. Al sanar tú, no solo te liberas a ti mismo, sino que también liberas a las generaciones futuras.
        </p>
      </ArticleSection>

    </div>
  );
};

export default ArticleContent;
