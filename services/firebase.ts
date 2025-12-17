
// @ts-ignore
import { initializeApp } from "firebase/app";
// @ts-ignore
import { getFirestore } from "firebase/firestore";

// --- FIREBASE CONFIGURATION ---
// These keys connect your app to the "ai-foundation-course" project.
// This enables real-time student tracking across different devices.

const firebaseConfig = {
  apiKey: "AIzaSyDMNCus7wbwkP_C09PUDQJapp2x3EUjbrA",
  authDomain: "ai-foundation-course.firebaseapp.com",
  projectId: "ai-foundation-course",
  storageBucket: "ai-foundation-course.firebasestorage.app",
  messagingSenderId: "173889394268",
  appId: "1:173889394268:web:42ccf1368bd1f519e83899",
  measurementId: "G-CTC107DZD2"
};

// Check if config is filled
export const isFirebaseConfigured = () => {
    return firebaseConfig.apiKey.length > 0;
};

let app;
let db: any;

if (isFirebaseConfigured()) {
    try {
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        console.log("🔥 Firebase Connected: Real-time Database Active");
    } catch (e) {
        console.error("Firebase Init Error:", e);
    }
} else {
    console.warn("⚠️ Firebase keys missing. App running in OFFLINE MODE (LocalStorage). Admin dashboard will not see other students.");
}

export { db };
