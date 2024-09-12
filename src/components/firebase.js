// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxVJtmqtExk7KrWJtbUY1RVbGm7jDhuAc",
  authDomain: "login-firebase-d3899.firebaseapp.com",
  projectId: "login-firebase-d3899",
  storageBucket: "login-firebase-d3899.appspot.com",
  messagingSenderId: "991124457952",
  appId: "1:991124457952:web:a8056c08a0556372da8385",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const dataBase = getFirestore(app);
export default app;
