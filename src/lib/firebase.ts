import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1LpepOenoyCqoy0TfdCpR5J7HoTOGFJs",
  authDomain: "bidvault-c9bc3.firebaseapp.com",
  projectId: "bidvault-c9bc3",
  storageBucket: "bidvault-c9bc3.firebasestorage.app",
  messagingSenderId: "987726542955",
  appId: "1:987726542955:web:3adfd741097987cf91592e",
  measurementId: "G-5DQS4R73ZP"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Analytics safely (only supported in browser environments)
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, analytics };
