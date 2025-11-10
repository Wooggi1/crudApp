import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBNdHi0OeBHZrRyH3d5WyqL4virwXEK7PQ",
  authDomain: "banco-mobile-programacao.firebaseapp.com",
  projectId: "banco-mobile-programacao",
  storageBucket: "banco-mobile-programacao.firebasestorage.app",
  messagingSenderId: "954812622749",
  appId: "1:954812622749:web:da1516851f071baeddb174"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };