
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore/lite"
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyADeKWfq-iIbLaDiWRu3ZfuZ8YpDdZbsTs",
  authDomain: "clone-47aa6.firebaseapp.com",
  projectId: "clone-47aa6",
  storageBucket: "clone-47aa6.appspot.com",
  messagingSenderId: "367222858116",
  appId: "1:367222858116:web:08e4fd14905b4a3403fdd1",
  measurementId: "G-K7R02Y794G"
};

const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export {db,auth};