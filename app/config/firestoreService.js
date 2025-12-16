// app/contacts/index.tsx (ejemplo)

// Sube de 'contacts/' (..) y entra en 'config/'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebaseConfig';

const contactsCollection = collection(db, 'contacts');

// R - Leer (Escucha en tiempo real)
export const getContactsStream = (callback) => {
  return onSnapshot(contactsCollection, (snapshot) => {
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
    await addDoc(contactsCollection, contactData);
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