import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import {
//   getReactNativePersistence,
//   initializeAuth,
// } from "firebase/auth/react-native";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import "firebase/compat/auth";
import { getAuth } from "firebase/auth";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAS6uIhU5BL9leyExBD-RxRonua1qpyuzI",
  authDomain: "posts-d1098.firebaseapp.com",
  databaseURL:
    "https://posts-d1098-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "posts-d1098",
  storageBucket: "posts-d1098.appspot.com",
  messagingSenderId: "1169166545",
  appId: "1:1169166545:web:8b0953f17949c1a8c975f0",
};

export const app = initializeApp(firebaseConfig);

// initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

export const auth = getAuth(app);
export const myStorage = getStorage(app);
export const db = getFirestore(app);
