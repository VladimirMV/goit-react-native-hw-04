import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { getAuth } from "firebase/auth";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// import {
//   API_KEY,
//   AUTH_DOMAIN,
//   PROJECT_ID,
//   STORAGE_BUCKET,
//   MESSAGING_SENDER_ID,
//   APP_ID,
//   MEASUREMENT_ID,
// } from '@env';

// const firebaseConfig = {
//   apiKey: API_KEY,
//   authDomain: AUTH_DOMAIN,
//   projectId: PROJECT_ID,
//   storageBucket: STORAGE_BUCKET,
//   messagingSenderId: MESSAGING_SENDER_ID,
//   appId: APP_ID,
//   measurementId: MEASUREMENT_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyAS6uIhU5BL9leyExBD-RxRonua1qpyuzI",
  authDomain: "posts-d1098.firebaseapp.com",
  projectId: "posts-d1098",
  storageBucket: "posts-d1098.appspot.com",
  messagingSenderId: "1169166545",
  appId: "1:1169166545:web:8b0953f17949c1a8c975f0",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
// export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
