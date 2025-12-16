// RUTA CORREGIDA: Accede a firebaseConfig en el mismo directorio (./)
import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const getContactsCollection = () => {
    if (!db) {
        throw new Error("Firestore DB no está inicializada.");
    }
    return collection(db, 'contacts');
};

// R - Leer (Escucha en tiempo real)
export const getContactsStream = (callback) => {
  return onSnapshot(getContactsCollection(), (snapshot) => {
    const contacts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(contacts);
  }, (error) => {
    console.error("Error al obtener contactos: ", error);
  });
};

// C - Crear
export const createContact = async (contactData) => {
  try {
    await addDoc(getContactsCollection(), contactData);
  } catch (e) {
    console.error("Error al crear contacto: ", e);
  }
};

// U - Actualizar
export const updateContact = async (id, contactData) => {
  try {
    const contactRef = doc(db, 'contacts', id);
    await updateDoc(contactRef, contactData);
  } catch (e) {
    console.error("Error al actualizar contacto: ", e);
  }
};

// D - Borrar
export const deleteContact = async (id) => {
  try {
    const contactRef = doc(db, 'contacts', id);
    await deleteDoc(contactRef);
  } catch (e) {
    console.error("Error al eliminar contacto: ", e);
  }
};
// NUEVA FUNCIÓN: Escuchar un solo contacto en tiempo real
export const getContactById = (id, callback) => {
    const docRef = doc(db, 'contacts', id);
    // onSnapshot escucha cambios en vivo de ese documento específico
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
            callback({ id: docSnap.id, ...docSnap.data() });
        } else {
            callback(null); // El contacto fue eliminado o no existe
        }
    });
    return unsubscribe;
};