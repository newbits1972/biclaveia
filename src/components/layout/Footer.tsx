const Footer = () => {
  return (
    <footer className="bg-brand-dark-blue text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-lg font-bold">BioClave - Diccionario IA</h2>
            <p className="text-sm text-gray-400 mt-2 max-w-sm">Basado en el trabajo de Joan Marc Vilanova i Pujó, Louise Hay, Dr. Hamer, Enric Corbera y otros especialistas.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h3 className="text-sm font-semibold uppercase">Importante</h3>
              <p className="text-xs text-gray-400 mt-4">Esta herramienta no pretende diagnosticar, tratar, curar o sustituir las terapias, los libros o la formación oficial en biodescodificación o Bioneuroemoción.</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase">Contacto</h3>
               <p className="text-xs text-gray-400 mt-4">Para más información sobre biodescodificación: <a href="mailto:neurobiodezmarca@gmail.com" className="text-brand-blue hover:underline">neurobiodezmarca@gmail.com</a></p>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-700" />
        <div className="text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} BioClave. Todos los derechos reservados.</p>
          <p className="text-xs mt-2">⚠️ Esta app no reemplaza el diagnóstico médico profesional.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
