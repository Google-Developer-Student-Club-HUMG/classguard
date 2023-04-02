import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { connectStorageEmulator, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBC-rZAPSohVSqRjn1SuiPVrgie_rs-CPM",
  authDomain: "solutionchallengehumg2023.firebaseapp.com",
  projectId: "solutionchallengehumg2023",
  storageBucket: "solutionchallengehumg2023.appspot.com",
  messagingSenderId: "96138120905",
  appId: "1:96138120905:web:4bc37ee867773c1dc9c718",
  measurementId: "G-8M2WG24JF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage();
// firebaseEmulator
// connectAuthEmulator(auth, "http://localhost:9099");
// if (window.location.hostname === 'localhost') {
//   connectFirestoreEmulator(db, 'localhost', 8085);
// }
export { auth, db, storage }