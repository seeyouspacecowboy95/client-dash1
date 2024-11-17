// Import the functions you need from the SDKs
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwb5v9FrGaEaRG86pHjxtPLwrKn1llB3s",
  authDomain: "zimako-backend.firebaseapp.com",
  projectId: "zimako-backend",
  storageBucket: "zimako-backend.firebasestorage.app",
  messagingSenderId: "833787391563",
  appId: "1:833787391563:web:ff4cb0f78d73ba15c667ce",
  measurementId: "G-YB7X3FBZE8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app); // Optional: If you use analytics
export const auth = getAuth(app); // Export the auth instance
export const db = getFirestore(app); // Export the Firestore instance
