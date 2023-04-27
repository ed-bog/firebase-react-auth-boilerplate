import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const NODE_ENV = process.env.NODE_ENV;

console.log("PROCESS", NODE_ENV);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  projectId: process.env.REACT_APP_FIREBASE_projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_appId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
