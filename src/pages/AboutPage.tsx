import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto mt-10 p-4 max-w-4xl text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center">Sobre SentIA</h1>
      
      <div className="space-y-6 text-lg">
        <p>
          SentIA nació de la fascinación por el profundo vínculo que existe entre nuestras emociones y nuestra biología. Nuestra misión es ofrecer una herramienta innovadora que sirva como puente para explorar y comprender el lenguaje simbólico del cuerpo a través de los principios de la biodescodificación.
        </p>
        <p>
          Creemos que cada síntoma, cada dolencia, cuenta una historia. Es un mensaje que, si se descifra, puede revelar conflictos emocionales no resueltos, patrones heredados de nuestro árbol genealógico (transgeneracional) o programaciones inconscientes del "Proyecto Sentido Gestacional".
        </p>
        <p>
          Nuestra inteligencia artificial ha sido entrenada para analizar estos elementos, ofreciendo una perspectiva integral que va más allá de la simple descripción del síntoma. Exploramos el conflicto emocional, la lateralidad, la cromoterapia y los ciclos biológicos para darte un mapa detallado que te invite a la introspección y al autoconocimiento.
        </p>
        <p className="font-bold mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500">
          <strong>Aviso Importante:</strong> La información proporcionada por SentIA es de carácter puramente informativo y para el autoconocimiento. No constituye un diagnóstico médico ni reemplaza en ningún caso la consulta, el consejo o el tratamiento de un profesional de la salud cualificado.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;