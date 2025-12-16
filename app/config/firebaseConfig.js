// config/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <-- ¡CAMBIO AQUÍ!

const firebaseConfig = {
  // Tus credenciales
  apiKey: "AIzaSyCfR0lNOziSW6pSgiSbOXdh61X1hetX5YY",
  authDomain: "fir-realtime-database-46e92.firebaseapp.com",
  projectId: "fir-realtime-database-46e92",
  storageBucket: "fir-realtime-database-46e92.firebasestorage.app",
  messagingSenderId: "191966386520", 
  appId: "1:191966386520:web:f7ce66d4b10bb4b7aded2d",
  // La línea databaseURL ya no es necesaria para Firestore, pero no molesta
  databaseURL: "https://fir-realtime-database-46e92-default-rtdb.firebaseio.com" 
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar CLOUD FIRESTORE
export const db = getFirestore(app); // <-- ¡CAMBIO AQUÍ!
export const firebaseApp = app; // <-- Exportar la App base