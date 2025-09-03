// Import Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUCwd3IYH3FhYuC3_kf4u1_oHXODN5KCw",
  authDomain: "libro-app-64a77.firebaseapp.com",
  projectId: "libro-app-64a77",
  storageBucket: "libro-app-64a77.firebasestorage.app",
  messagingSenderId: "17430685657",
  appId: "1:17430685657:web:d584a6ace7a9ad30c31bc8"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore Database
export const db = getFirestore(app);