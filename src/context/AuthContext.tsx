import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';
import { logOut } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean; // <-- Nuevo estado para el rol de administrador
  isLoggedIn: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  isLoggedIn: false,
  isLoading: true,
  logout: async () => { console.warn('logout function called outside of a AuthProvider'); },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Usuario ha iniciado sesión. Ahora verificamos sus permisos.
        try {
          // Forzamos la actualización del token para obtener los claims más recientes.
          const tokenResult = await currentUser.getIdTokenResult(true);
          // Verificamos si el claim 'admin' es true.
          const isAdminUser = tokenResult.claims.admin === true;
          setUser(currentUser);
          setIsAdmin(isAdminUser);
        } catch (error) {
          console.error('Error getting user token claims:', error);
          // Si hay un error, lo tratamos como un usuario no-admin.
          setUser(currentUser);
          setIsAdmin(false);
        }
      } else {
        // El usuario ha cerrado sesión.
        setUser(null);
        setIsAdmin(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    isAdmin,
    isLoggedIn: !!user,
    isLoading,
    logout: logOut,
  };

  // No renderizamos la app hasta que la verificación de auth esté completa.
  if (isLoading) {
    return <div className="flex justify-center items-center h-screen"><p>Verificando credenciales...</p></div>; // O un componente de spinner
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
