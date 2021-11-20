import { initializeApp } from "@firebase/app"
import { getAuth } from "firebase/auth"
import firebaseConfig from "./firebase-config"
import { getFirestore } from "@firebase/firestore"
const firebaseApp = initializeApp(firebaseConfig)

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp)

export { auth, db }