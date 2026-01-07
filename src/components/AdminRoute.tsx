import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

interface AdminRouteProps {
  children: React.ReactElement;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isLoggedIn, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    // Muestra un estado de carga mientras se verifica la autenticación y los permisos.
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-700">Verificando Acceso...</h2>
          <p className="text-gray-500">Por favor, espera un momento.</p>
          {/* Aquí podrías incluir un spinner o un indicador de carga más elaborado */}
        </div>
      </div>
    );
  }

  if (!isLoggedIn || !isAdmin) {
    // Si el usuario no ha iniciado sesión o no es administrador, redirige a una página de acceso denegado.
    // Podrías redirigirlo a la página de inicio ('/') o a una página específica de 'acceso-denegado'.
    return <Navigate to="/" replace />;
    // Alternativamente, podrías mostrar un componente de Acceso Denegado aquí mismo.
    // return <AccessDeniedPage />;
  }

  // Si el usuario es un administrador autenticado, renderiza el contenido protegido.
  return children;
};

export default AdminRoute;
