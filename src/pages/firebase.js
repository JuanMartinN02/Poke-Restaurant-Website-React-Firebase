// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2Umfr1gt1KlPQofakQ0JhZaLpSWIR6po",
  authDomain: "autenticadordev.firebaseapp.com",
  projectId: "autenticadordev",
  storageBucket: "autenticadordev.appspot.com",
  messagingSenderId: "21023394556",
  appId: "1:21023394556:web:6454e592ca92112f596579"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export const db=getFirestore(app);
export const storage = getStorage(app);
export default app;
