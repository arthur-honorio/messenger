import { initializeApp } from "firebase/app"
import { getFirestore, setDoc, doc, updateDoc } from "firebase/firestore"
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
} from "firebase/auth"
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage"

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
const storage = getStorage(app)
const db = getFirestore(app)
const auth = getAuth(app)

export const uploadImage = (
    file: any,
    setPhotoURL: React.Dispatch<React.SetStateAction<string>>
) => {
    const fileName = `${file.lastModified}-${file.name}`
    const storageRef = ref(storage, fileName)

    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on(
        "state_changed",
        () => {},
        error => {
            console.log(Object.entries(error))
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(setPhotoURL)
        }
    )
}

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

export const updateDocument = async (
    collectionName: string,
    dataToAdd: { [key: string]: any },
    id: string
) => {
    try {
        const docRef = doc(db, collectionName, id)
        await updateDoc(docRef, dataToAdd)
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
            auth?.currentUser?.uid &&
                await updateDocument(
                    "users",
                    { status: "online" },
                    auth.currentUser.uid
                )
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
