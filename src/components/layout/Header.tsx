
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, LogIn } from 'lucide-react';

const Header = () => {
  const { isLoggedIn, logout, user } = useAuth();

  const activeLinkClass = "text-brand-purple font-semibold";
  const inactiveLinkClass = "text-gray-600 hover:text-brand-purple transition-colors";

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-32">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="SentIA Logo" className="h-28" />
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>Inicio</NavLink>
            <NavLink to="/diccionario" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>Diccionario IA</NavLink>
            <NavLink to="/tarot" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>Tarot</NavLink>
            <NavLink to="/blog" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>Blog</NavLink>
            {isLoggedIn && (
              <NavLink to="/mi-progreso" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>Mi Progreso</NavLink>
            )}
            <NavLink to="/profesionales" className={({ isActive }) => isActive ? activeLinkClass : inactiveLinkClass}>Profesionales</NavLink>
          </div>
          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 hidden sm:inline">Hola, {user?.email}</span>
                <button onClick={logout} className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-purple transition-colors">
                  <LogOut size={16} />
                  <span className="hidden sm:inline">Cerrar Sesión</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-brand-purple text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-all flex items-center gap-2">
                <LogIn size={16} />
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
