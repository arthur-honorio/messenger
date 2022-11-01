import { initializeApp } from "firebase/app"
import { getFirestore, setDoc, doc } from "firebase/firestore"
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBk8rE8nbIPFy-lhFsp9GV5NJyzmki-71Q",
    authDomain: "rav-messenger.firebaseapp.com",
    projectId: "rav-messenger",
    storageBucket: "rav-messenger.appspot.com",
    messagingSenderId: "783508704351",
    appId: "1:783508704351:web:91164dfda8c9ee7bd09fea",
    measurementId: "G-JZXQ87EHZ8",
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export const createDocument = async (
    collectionName: string,
    dataToAdd: Object,
    id: string
) => {
    try {
        const docRef = doc(db, collectionName, id)
        await setDoc(docRef, dataToAdd, { merge: true })
    } catch (e: any) {
        console.log(Object.entries(e))
    }
}

export const signIn = async (email: string, password: string) => {
    try {
        const signInResponse = await signInWithEmailAndPassword(
            auth,
            email,
            password
        )
        if (signInResponse) {
            return signInResponse
        }
    } catch (err: any) {
        if (err.code === "auth/user-not-found") {
            return "user-not-found"
        } else console.log(Object.entries(err))
    }
}

export const signUp = async (email: string, password: string) => {
    let signUpResponse
    try {
        signUpResponse = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        )
        if (signUpResponse) {
            return signUpResponse
        }
    } catch (err: any) {
        console.log(Object.entries(err))
    }
}
