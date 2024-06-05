import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "import.meta.env.VITE_FIREBASE_API_KEY",
  authDomain: "hostme-application.firebaseapp.com",
  projectId: "hostme-application",
  storageBucket: "hostme-application.appspot.com",
  messagingSenderId: "95296191536",
  appId: "1:95296191536:web:139ea6056855c4f57bc1f5",
  measurementId: "G-11EJ07RGHH""
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
