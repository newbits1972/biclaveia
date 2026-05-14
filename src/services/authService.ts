import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from '../firebase';

// Tipos para las credenciales
interface EmailPasswordCredentials {
  email: string;
  pass: string;
}

/**
 * Registra un nuevo usuario con email y contraseña.
 */
export const signUpWithEmailPassword = async ({ email, pass }: EmailPasswordCredentials) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    console.log("Usuario registrado exitosamente:", userCredential.user);
    return { user: userCredential.user };
  } catch (error) {
    console.error("Error en el registro:", error);
    return { error };
  }
};

/**
 * Inicia sesión de un usuario con email y contraseña.
 */
export const signInWithEmailPassword = async ({ email, pass }: EmailPasswordCredentials) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    console.log("Usuario ha iniciado sesión exitosamente:", userCredential.user);
    return { user: userCredential.user };
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return { error };
  }
};


/**
 * Cierra la sesión del usuario actual.
 */
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("Sesión cerrada exitosamente.");
  } catch (error) { 
    console.error("Error al cerrar la sesión:", error);
  }
};
