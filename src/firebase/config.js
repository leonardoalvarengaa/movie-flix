import { initializeApp, getApps, getApp } from "firebase/app"; // 1. Importe getApps e getApp
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJ-m9ik5DHGYM1JPTloxoSFMhRQ2LQRRc",
  authDomain: "movieflix-app-ea381.firebaseapp.com",
  projectId: "movieflix-app-ea381",
  storageBucket: "movieflix-app-ea381.firebasestorage.app",
  messagingSenderId: "889238636151",
  appId: "1:889238636151:web:e69b3628f9de8238b3e872",
  measurementId: "G-HPHCZ1H6YC"
};

// Inicializa o Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Inicializa o serviço de autenticação e o exporta
export const auth = getAuth(app);
