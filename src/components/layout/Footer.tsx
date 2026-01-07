import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Sección principal del footer con diseño de rejilla */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* 1. Columna de la marca */}
          <div className="mb-6 md:mb-0">
            <Link to="/">
              <img src="/logo_blanco.png" alt="SentIA Logo" className="h-16" />
            </Link>
            <p className="text-sm text-gray-400 mt-4 max-w-sm">
              Explora la conexión entre tus emociones y síntomas físicos. Basado en el trabajo de especialistas en biodescodificación.
            </p>
          </div>

          {/* 2. Columna de Navegación */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-400 tracking-wider">Navegación</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="hover:text-white transition-colors">Inicio</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/mi-progreso" className="hover:text-white transition-colors">Mi Progreso</Link></li>
              <li><Link to="/diccionario" className="hover:text-white transition-colors">Diccionario</Link></li>
              <li><Link to="/profesionales" className="hover:text-white transition-colors">Profesionales</Link></li>
            </ul>
          </div>

          {/* 3. Columna de Información (antes Legal) */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-400 tracking-wider">Información</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/about" className="hover:text-white transition-colors">Sobre Nosotros</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contacto</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Términos de Servicio</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Política de Privacidad</Link></li>
            </ul>
          </div>

          {/* 4. Columna de Redes Sociales */}
          <div>
            <h3 className="text-sm font-semibold uppercase text-gray-400 tracking-wider">Conecta</h3>
            <div className="flex space-x-4 mt-4">
              <a href="/#" className="text-gray-400 hover:text-white transition-colors"><span className="sr-only">Facebook</span><Facebook size={20} /></a>
              <a href="/#" className="text-gray-400 hover:text-white transition-colors"><span className="sr-only">Twitter</span><Twitter size={20} /></a>
              <a href="/#" className="text-gray-400 hover:text-white transition-colors"><span className="sr-only">Instagram</span><Instagram size={20} /></a>
              <a href="/#" className="text-gray-400 hover:text-white transition-colors"><span className="sr-only">LinkedIn</span><Linkedin size={20} /></a>
            </div>
             <p className="text-xs text-gray-500 mt-4">Contacto: <a href="mailto:contacto@sentiaia.web.app" className="hover:text-white transition-colors">contacto@sentiaia.web.app</a></p>
          </div>

        </div>

        {/* Barra inferior del footer */}
        <hr className="my-8 border-gray-800" />
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
          <p className="text-gray-400">© {new Date().getFullYear()} SentIA. Todos los derechos reservados.</p>
          <p className="text-gray-500 text-xs mt-4 sm:mt-0 text-center sm:text-right max-w-md">
            ⚠️ Esta herramienta es un complemento informativo y no sustituye el diagnóstico, consejo o tratamiento médico o terapéutico profesional.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
