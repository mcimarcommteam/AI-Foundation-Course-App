
import { db, isFirebaseConfigured } from './firebase';
// @ts-ignore
import { doc, setDoc, getDoc, collection, onSnapshot, updateDoc } from "firebase/firestore";

const USERS_COLLECTION = 'students';
const LOCAL_STORAGE_KEY = 'ai_course_users';

export const dbService = {
    
    // Check mode
    isOnline: () => isFirebaseConfigured(),

    // --- WRITE OPERATIONS ---

    async saveUser(email: string, data: any) {
        if (this.isOnline()) {
            try {
                await setDoc(doc(db, USERS_COLLECTION, email), data, { merge: true });
            } catch (e) {
                console.error("DB Save Error:", e);
            }
        } else {
            // Fallback to LocalStorage
            const users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
            users[email] = { ...users[email], ...data };
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
        }
    },

    async updateProgress(email: string, progressData: any) {
        if (this.isOnline()) {
            try {
                // Merge progress into existing document
                await setDoc(doc(db, USERS_COLLECTION, email), { progress: progressData }, { merge: true });
            } catch (e) {
                console.error("DB Update Error:", e);
            }
        } else {
            const users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
            if (users[email]) {
                users[email].progress = { ...users[email].progress, ...progressData };
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
            }
        }
    },

    async saveFeedback(email: string, feedbackData: any) {
        if (this.isOnline()) {
             await setDoc(doc(db, USERS_COLLECTION, email), { feedback: feedbackData }, { merge: true });
        } else {
            const users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
            if (users[email]) {
                users[email].feedback = feedbackData;
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
            }
        }
    },

    // --- READ OPERATIONS ---

    async getUser(email: string) {
        if (this.isOnline()) {
            try {
                const docRef = doc(db, USERS_COLLECTION, email);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    return docSnap.data();
                }
                return null;
            } catch (e) {
                console.error("DB Read Error:", e);
                return null;
            }
        } else {
            const users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
            return users[email] || null;
        }
    },

    // --- REAL-TIME LISTENERS (Admin) ---

    subscribeToAllStudents(callback: (students: any[]) => void) {
        if (this.isOnline()) {
            // Real-time Firestore Listener
            const unsubscribe = onSnapshot(collection(db, USERS_COLLECTION), (snapshot: any) => {
                const students = snapshot.docs.map((d: any) => ({ id: d.id, ...d.data() }));
                callback(students);
            });
            return unsubscribe; // Return cleanup function
        } else {
            // Pseudo-realtime for LocalStorage (Polling)
            const fetchLocal = () => {
                const users = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
                const students = Object.keys(users).map(email => ({ id: email, ...users[email] }));
                callback(students);
            };
            
            fetchLocal(); // Initial load
            const interval = setInterval(fetchLocal, 2000); // Poll every 2s
            return () => clearInterval(interval);
        }
    }
};
