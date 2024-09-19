import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC9eqU0hvftAFp86SfV9HF4b4iTXR62554",
  authDomain: "rifa-fc8b9.firebaseapp.com",
  projectId: "rifa-fc8b9",
  storageBucket: "rifa-fc8b9.appspot.com",
  messagingSenderId: "1091634987492",
  appId: "1:1091634987492:web:1227d7fe829c64c93b47f1"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

