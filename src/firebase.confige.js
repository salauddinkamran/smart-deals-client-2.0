// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain:  import.meta.env.VITE_authDomain,
  projectId:  import.meta.env.VITE_projectId,
  storageBucket:  import.meta.env.VITE_storageBucket,
  messagingSenderId:  import.meta.env.VITE_messagingSenderId,
  appId:  import.meta.env.VITE_appId,

  // apiKey: "AIzaSyD7OFECdHby6lrcAmC9Snx0dNg3equFn14",
  // authDomain: "smart-deals-694cc.firebaseapp.com",
  // projectId: "smart-deals-694cc",
  // storageBucket: "smart-deals-694cc.firebasestorage.app",
  // messagingSenderId: "688586395383",
  // appId: "1:688586395383:web:0a5079156f5035dfbf8df2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);