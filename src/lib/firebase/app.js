// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0uKW3M9Y0YCoohbt0LG0Oesbt5KugvoU",
  authDomain: "contacts-book-8f6a3.firebaseapp.com",
  projectId: "contacts-book-8f6a3",
  storageBucket: "contacts-book-8f6a3.firebasestorage.app",
  messagingSenderId: "203028448584",
  appId: "1:203028448584:web:b3107038e83c09c38c9f7d",
  measurementId: "G-VP11FXVLN0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
