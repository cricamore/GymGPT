// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBuYbwqV4N8hNGqtcZM3Qdx3EY55BAesPk",
  authDomain: "gymgpt-2dc18.firebaseapp.com",
  projectId: "gymgpt-2dc18",
  storageBucket: "gymgpt-2dc18.appspot.com",
  messagingSenderId: "824797957171",
  appId: "1:824797957171:web:014e82bcf06f76d4bbe746",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
