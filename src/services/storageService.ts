import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';

/**
 * Sube la imagen de un profesional a Firebase Storage.
 * @param imageFile - El archivo de imagen (obtenido de un input[type="file"]).
 * @returns La URL pública de la imagen una vez subida.
 */
export const uploadProfessionalImage = async (imageFile: File): Promise<string> => {
  if (!imageFile) {
    throw new Error('No se ha proporcionado ningún archivo de imagen.');
  }

  const uniqueFileName = `professional_${Date.now()}_${imageFile.name}`;
  const storageRef = ref(storage, `professional_images/${uniqueFileName}`);

  try {
    const snapshot = await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw new Error("La subida de la imagen falló.");
  }
};

/**
 * Elimina una imagen de Firebase Storage usando su URL de descarga.
 * @param imageUrl - La URL de descarga HTTPS de la imagen a eliminar.
 */
export const deleteProfessionalImage = async (imageUrl: string): Promise<void> => {
  if (!imageUrl.startsWith('https://firebasestorage.googleapis.com')) {
    console.log("No es una URL de Firebase Storage válida, se omite la eliminación:", imageUrl);
    return;
  }

  try {
    // Firebase Storage puede crear una referencia directamente desde la URL de descarga.
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
  } catch (err: unknown) {
    const error = err as { code?: string };
    if (error.code === 'storage/object-not-found') {
      console.warn(`Se intentó eliminar una imagen que ya no existe: ${imageUrl}`);
    } else {
      console.error("Error al eliminar la imagen de Storage:", error);
      throw new Error("No se pudo eliminar la imagen del almacenamiento.");
    }
  }
};
