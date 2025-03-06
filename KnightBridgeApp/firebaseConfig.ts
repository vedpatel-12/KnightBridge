import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD-OI8YYYcvH5QmOK7dr94oa-KytJlfByU",
    authDomain: "knightbridge-e6791.firebaseapp.com",
    projectId: "knightbridge-e6791",
    storageBucket: "knightbridge-e6791.firebasestorage.app",
    messagingSenderId: "731608857119",
    appId: "1:731608857119:web:d5f24e7b93a09f186ab32a",
    measurementId: "G-G0B0C383DQ"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
