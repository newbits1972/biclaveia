import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto mt-10 p-4 max-w-4xl text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center">Contacto</h1>
      
      <div className="space-y-6 text-lg text-center">
        <p>
          ¿Tienes preguntas, sugerencias o quieres saber más sobre el proyecto? Tu opinión es muy importante para nosotros.
        </p>
        <p>
          Puedes ponerte en contacto directamente a través de la siguiente dirección de correo electrónico:
        </p>
        <p>
          <a href="mailto:contacto@sentiaia.web.app" className="text-blue-600 hover:underline font-bold text-xl">
            contacto@sentiaia.web.app
          </a>
        </p>
         <p className="font-bold mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500">
          <strong>Aviso Importante:</strong> Por favor, no envíes información médica personal o consultas sobre síntomas específicos a través de este correo. Esta vía es para asuntos generales del sitio. Para análisis de síntomas, por favor, utiliza la herramienta principal.
        </p>
      </div>
    </div>
  );
};

export default ContactPage;