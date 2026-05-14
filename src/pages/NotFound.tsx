import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="text-center py-24">
      <AlertTriangle className="mx-auto h-16 w-16 text-yellow-400" />
      <h1 className="mt-4 text-4xl font-bold tracking-tight text-brand-dark-blue sm:text-5xl">Página no encontrada</h1>
      <p className="mt-6 text-base leading-7 text-gray-600">Lo sentimos, no pudimos encontrar la página que estás buscando.</p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          to="/"
          className="rounded-md bg-brand-purple px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
