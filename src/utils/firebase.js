// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqQUmEh8Td8LjIcU4e9VU9s85oaysUqHM",
  authDomain: "split-the-bill-bd584.firebaseapp.com",
  projectId: "split-the-bill-bd584",
  storageBucket: "split-the-bill-bd584.firebasestorage.app",
  messagingSenderId: "1076229193582",
  appId: "1:1076229193582:web:5573e5199d03a99188cb7f",
  measurementId: "G-TT5NTBMDEM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });
export const auth = initializeAuth(app);

// isSupported().then((supported) => {
//   if (supported) {
//     getAnalytics(app);
//   }
// });
