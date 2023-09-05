// Import the functions you need from the SDKs you need
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";

// if env is not set, it will be undefined
// so we need to check it

export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

let firebaseApp = {} as FirebaseApp;
let firebaseAuth = {} as Auth;

if (process.env.FIREBASE_API_KEY) {
  console.log("It is set firebase env!");

  const loadedConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };

  firebaseConfig.apiKey = loadedConfig.apiKey;
  firebaseConfig.authDomain = loadedConfig.authDomain;
  firebaseConfig.projectId = loadedConfig.projectId;
  firebaseConfig.storageBucket = loadedConfig.storageBucket;
  firebaseConfig.messagingSenderId = loadedConfig.messagingSenderId;
  firebaseConfig.appId = loadedConfig.appId;

  console.log(firebaseConfig);

  firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  firebaseAuth = getAuth(firebaseApp);
} else {
  console.log("No set firebase env!");
}

export { firebaseApp, firebaseAuth };
