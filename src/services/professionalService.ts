import { collection, doc, addDoc, getDocs, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

// Estructura de un profesional (leída desde Firestore)
export interface Professional {
  id: string;
  name: string;
  title: string;
  rating: number;
  specialties: string[];
  certifications: string[];
  location: string;
  hours: string;
  imageUrl?: string;
  whatsappUrl?: string;
  emailUrl?: string;
  createdAt: Date; // O Timestamp, dependiendo de cómo lo manejes
}

// Datos para crear o actualizar un profesional (sin id ni createdAt)
export type ProfessionalData = Omit<Professional, 'id' | 'createdAt'>;

const professionalsCollection = collection(db, 'professionals');

const getDocRef = (id: string) => doc(db, 'professionals', id);

// --- FUNCIONES CRUD --- 

/**
 * Añade un nuevo profesional a la base de datos.
 */
export const addProfessional = async (professionalData: ProfessionalData) => {
  try {
    return await addDoc(professionalsCollection, {
      ...professionalData,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('Error al añadir el profesional:', error);
    throw new Error('No se pudo añadir el profesional.');
  }
};

/**
 * Obtiene todos los profesionales, ordenados por fecha de creación.
 */
export const getProfessionals = async (): Promise<Professional[]> => {
  try {
    const q = query(professionalsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        title: data.title,
        rating: data.rating || 0,
        specialties: Array.isArray(data.specialties) ? data.specialties : [],
        certifications: Array.isArray(data.certifications) ? data.certifications : [],
        location: data.location || '',
        hours: data.hours || '',
        imageUrl: data.imageUrl,
        whatsappUrl: data.whatsappUrl,
        emailUrl: data.emailUrl,
        createdAt: data.createdAt.toDate(),
      } as Professional;
    });
  } catch (error) {
    console.error('Error al obtener los profesionales:', error);
    throw new Error('No se pudieron obtener los profesionales.');
  }
};

/**
 * Actualiza los datos de un profesional existente.
 * @param id - El ID del documento del profesional a actualizar.
 * @param data - Un objeto con los campos a modificar.
 */
export const updateProfessional = async (id: string, data: Partial<ProfessionalData>) => {
  try {
    const docRef = getDocRef(id);
    return await updateDoc(docRef, data);
  } catch (error) {
    console.error('Error al actualizar el profesional:', error);
    throw new Error('No se pudo actualizar el profesional.');
  }
};

/**
 * Elimina a un profesional de la base de datos.
 * @param id - El ID del documento del profesional a eliminar.
 */
export const deleteProfessional = async (id: string) => {
  try {
    const docRef = getDocRef(id);
    return await deleteDoc(docRef);
  } catch (error) {
    console.error('Error al eliminar el profesional:', error);
    throw new Error('No se pudo eliminar el profesional.');
  }
};
