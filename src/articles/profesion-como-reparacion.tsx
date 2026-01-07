import React from 'react';
import { Briefcase, Link, Heart, HardHat, Stethoscope, Scale, Lightbulb, Users, Paintbrush } from 'lucide-react';

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
        ¿Crees que elegiste tu profesión de forma 100% libre y consciente? La biodescodificación nos revela una capa más profunda: a menudo, nuestra vocación y nuestra carrera profesional están íntimamente ligadas a la historia de nuestro árbol genealógico. Inconscientemente, elegimos una profesión para "reparar" un drama, una falta o una injusticia vivida por nuestros ancestros. Es un acto de amor y lealtad invisible hacia el clan.
      </p>

      <ArticleSection icon={<Briefcase size={24} className="text-sky-500" />} title="La Lógica de la Reparación">
        <p>
          El inconsciente familiar siempre busca el equilibrio. Si en una generación hubo un drama (una ruina económica, una enfermedad devastadora, una gran injusticia), en las generaciones siguientes aparecerá alguien cuya vida o profesión intentará simbólicamente saldar esa deuda. No es un castigo, sino un mecanismo de supervivencia del clan para cerrar heridas abiertas.
        </p>
      </ArticleSection>

      <ArticleSection icon={<Link size={24} className="text-red-500" />} title="Yaciente, Heredero y Afinidad">
        <p>
          Esta conexión es especialmente fuerte si eres "doble" de un ancestro (por fechas de nacimiento o defunción). Si un abuelo murió de una enfermedad cardíaca y tú naces en el aniversario de su muerte, podrías sentir una inclinación inexplicable a ser cardiólogo. Estás en "afinidad" con su historia y tu profesión se convierte en una forma de intentar salvarlo simbólicamente.
        </p>
      </ArticleSection>

      <ArticleSection icon={<Heart size={24} className="text-pink-500" />} title="Profesiones de Ayuda y Sanación">
        <p>
          Las profesiones sanitarias (médicos, enfermeros, terapeutas) suelen estar directamente relacionadas con la reparación de enfermedades o muertes dramáticas en la familia. Si hubo muchas muertes por cáncer, alguien podría convertirse en oncólogo. Si un niño murió ahogado, un descendiente podría ser socorrista. Es una forma de decir: "A ti no te pude salvar, pero ahora salvaré a otros en tu nombre".
        </p>
      </ArticleSection>

      <ArticleSection icon={<HardHat size={24} className="text-orange-500" />} title="Profesiones de Construcción y Ruina">
        <p>
          Los arquitectos, ingenieros o constructores a menudo reparan historias de ruina económica, pérdida de la casa familiar o ancestros que vivieron en la precariedad. Construir casas sólidas y seguras es una forma de darle al clan el hogar y la estabilidad que no tuvo.
        </p>
      </ArticleSection>

      <ArticleSection icon={<Users size={24} className="text-green-500" />} title="Profesiones de Comunicación y Secretos">
        <p>
          Los abogados, periodistas, escritores o psicólogos pueden estar reparando grandes secretos familiares. Su profesión se centra en sacar a la luz la verdad, en defender a los injustamente acusados o en dar voz a quienes no la tuvieron. Si en el clan hubo una herencia mal repartida, un hijo no reconocido o una estafa, alguien podría sentirse llamado a estudiar derecho para "hacer justicia".
        </p>
      </ArticleSection>
      
      <ArticleSection icon={<Paintbrush size={24} className="text-indigo-500" />} title="Profesiones Artísticas y Duelos no Hechos">
        <p>
          El arte es un canal directo al inconsciente. Los actores, pintores o músicos a menudo expresan las emociones que fueron prohibidas o no pudieron ser lloradas en el clan. Un payaso puede estar reparando una profunda tristeza familiar, llevando la alegría que faltó.
        </p>
      </ArticleSection>

      <ArticleSection icon={<Lightbulb size={24} className="text-purple-500" />} title="¿Cómo Saber si tu Profesión Repara?">
        <p>
          El primer paso es mirar tu árbol genealógico y preguntarte: ¿Qué dramas hubo? ¿Qué faltó? ¿Qué injusticias se cometieron? Y luego, mira tu profesión y pregúntate honestamente: ¿Qué estoy intentando solucionar en el mundo con mi trabajo? La respuesta puede sorprenderte y darte una nueva y profunda dimensión de propósito a tu labor diaria. Tomar conciencia de esto no significa que debas cambiar de trabajo, sino que puedes vivirlo desde un lugar de mayor libertad, honrando a tus ancestros sin estar atado ciegamente a su destino.
        </p>
      </ArticleSection>

    </div>
  );
};

export default ArticleContent;
