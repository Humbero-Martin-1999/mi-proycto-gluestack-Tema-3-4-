import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Para el CRUD de contactos

const firebaseConfig = {
  // Asegúrate de usar tus credenciales reales aquí
  apiKey: "AIzaSyCfR0lNOziSW6pSgiSbOXdh61X1hetX5YY",
  authDomain: "fir-realtime-database-46e92.firebaseapp.com",
  projectId: "fir-realtime-database-46e92",
  storageBucket: "fir-realtime-database-46e92.firebasestorage.app",
  messagingSenderId: "191966386520", 
  appId: "1:191966386520:web:f7ce66d4b10bb4b7aded2d",
  databaseURL: "https://fir-realtime-database-46e92-default-rtdb.firebaseio.com" // Necesaria para RTDB
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Instancia de CLOUD FIRESTORE (para el CRUD de Contactos)
export const db = getFirestore(app); 

// Instancia de la App Base (para la PantallaRegistroFirebase con RTDB)
export const firebaseApp = app;