// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId

};
/* VITE_apiKey "AIzaSyDHuxUX7u3a-tFCeAA_8TnwQWURU2cRTq0",
    VITE_authDomain "bistro-boss-8543b.firebaseapp.com",
    VITE_projectId "bistro-boss-8543b",
    VITE_storageBucket "bistro-boss-8543b.firebasestorage.app",
    VITE_messagingSenderId "1033178005768",
    VITE_appId "1:1033178005768:web:47e7bba17a11c1f08d6cbd", */
// Initialize Firebase
export const app = initializeApp(firebaseConfig);