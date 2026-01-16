// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI4LVB1O8d5-ZzFnC2lwHbRHShek2r1_Q",
  authDomain: "seong-jun-kang.firebaseapp.com",
  projectId: "seong-jun-kang",
  storageBucket: "seong-jun-kang.firebasestorage.app",
  messagingSenderId: "30927302144",
  appId: "1:30927302144:web:a7b556a3aacfda22bd32e5",
  measurementId: "G-9G9B2KDCJV"
};

// Initialize Firebase (prevent duplicate initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Analytics (only in browser)
let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };








