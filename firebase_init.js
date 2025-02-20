// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAACdcE0kO5joaW27XAhM1QHFrRxjX8qvk",
  authDomain: "ph-job-task-258c6.firebaseapp.com",
  projectId: "ph-job-task-258c6",
  storageBucket: "ph-job-task-258c6.firebasestorage.app",
  messagingSenderId: "232865087755",
  appId: "1:232865087755:web:119436bd20fa497439620e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;