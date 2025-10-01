import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, Dna, LogIn } from 'lucide-react';

const Header = () => {
  const { isLoggedIn, logout, login, user } = useAuth();

  const activeLinkClass = "text-brand-purple font-semibold";
  const inactiveLinkClass = "text-gray-600 hover:text-brand-purple transition-colors";

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <Dna className="text-brand-purple" />
            <span className="text-gray-800">BioClave</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>Inicio</NavLink>
            <NavLink to="/diccionario" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>Diccionario IA</NavLink>
            {isLoggedIn && (
              <NavLink to="/mi-progreso" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>Mi Progreso</NavLink>
            )}
            <NavLink to="/profesionales" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>Profesionales</NavLink>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 hidden sm:inline">Hola, {user?.displayName?.split(' ')[0]}</span>
                <button onClick={logout} className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-purple transition-colors">
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Cerrar Sesión</span>
                </button>
              </div>
            ) : (
              <button onClick={login} className="bg-brand-purple text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-all flex items-center gap-2">
                <LogIn size={16} />
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
