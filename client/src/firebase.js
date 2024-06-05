import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "import.meta.env.VITE_FIREBASE_API_KEY",
  authDomain: "hostme-425319.firebaseapp.com",
  projectId: "hostme-425319",
  storageBucket: "hostme-425319.appspot.com",
  messagingSenderId: "15627436739",
  appId: "1:15627436739:web:47d6f6bcc5b8963b661876",
  measurementId: "G-639MS27LZV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
