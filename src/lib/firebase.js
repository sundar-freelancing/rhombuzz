import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUYbnAgP_AYbYVjj9UZLIhnvopeXSVDXY",
  authDomain: "rhombuzz-6d1e7.firebaseapp.com",
  projectId: "rhombuzz-6d1e7",
  storageBucket: "rhombuzz-6d1e7.firebasestorage.app",
  messagingSenderId: "909976428068",
  appId: "1:909976428068:web:d3f244d66be5f89bacc2b1",
  measurementId: "G-B96XCL5SRH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
