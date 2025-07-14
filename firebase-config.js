// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrL_sHxiQXLwLyL6r7B2zqF0780wiy2ak",
  authDomain: "lucky-spot-billiards.firebaseapp.com",
  projectId: "lucky-spot-billiards",
  storageBucket: "lucky-spot-billiards.firebasestorage.app",
  messagingSenderId: "401782736931",
  appId: "1:401782736931:web:25e76ec85c7a10bbb10996",
  measurementId: "G-FK06R34NKB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);