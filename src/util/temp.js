// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC96tUbv83-7Nhzqtze5QZOKsoRs2XVyBU",
  authDomain: "sudoku-slover.firebaseapp.com",
  projectId: "sudoku-slover",
  storageBucket: "sudoku-slover.appspot.com",
  messagingSenderId: "1026549219828",
  appId: "1:1026549219828:web:6e58c16d6dcdd33057b9a1",
  measurementId: "G-T0656S73M1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
