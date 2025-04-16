import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // 👈 import this

const firebaseConfig = {
  apiKey: "AIzaSyD-OI8YYYcvH5QmOK7dr94oa-KytJlfByU",
  authDomain: "knightbridge-e6791.firebaseapp.com",
  databaseURL: "https://knightbridge-e6791-default-rtdb.firebaseio.com", // 👈 make sure this line is here
  projectId: "knightbridge-e6791",
  storageBucket: "knightbridge-e6791.appspot.com", // fixed `.app` typo
  messagingSenderId: "731608857119",
  appId: "1:731608857119:web:d5f24e7b93a09f186ab32a",
  measurementId: "G-G0B0C383DQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app); // 👈 this is your realtime database
