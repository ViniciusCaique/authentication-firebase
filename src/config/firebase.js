// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC7LTCdTBQ2njeggyTbpsBFqpnJvsCSUZU",
  authDomain: "fir-fiap-a67fc.firebaseapp.com",
  projectId: "fir-fiap-a67fc",
  storageBucket: "fir-fiap-a67fc.appspot.com",
  messagingSenderId: "446740731618",
  appId: "1:446740731618:web:e5baea405d41cd50feb0bb",
  measurementId: "G-QDEYZM1FQK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);