// firebase/client.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Web SDK
import { getFirestore } from "firebase/firestore"; // Web SDK

const firebaseConfig = {
  apiKey: "AIzaSyCXGaYvxnIlQVw3R-6ltqRsTvMERjJkE2I",
  authDomain: "smartmate-a0b04.firebaseapp.com",
  projectId: "smartmate-a0b04",
  storageBucket: "smartmate-a0b04.firebasestorage.app",
  messagingSenderId: "64746996211",
  appId: "1:64746996211:web:76451c207191b0c7795286",
  measurementId: "G-T7T8S5W5K0",
};

// Initialize Firebase app
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Auth & Firestore for client-side usage
export const auth = getAuth(app);
export const db = getFirestore(app);
