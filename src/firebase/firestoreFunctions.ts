import {
    getFirestore,
    setDoc,
    doc,
    updateDoc,
} from "firebase/firestore"
import { app } from "./firebaseConfig"

const db = getFirestore(app)

export const documentRef = async (collection: string, id: string) => {
    return doc(db, collection, id)
}

export const createDocument = async (
    collectionName: string,
    dataToAdd: { [key: string]: any },
    id?: string
) => {
    try {
        const docRef = id
            ? doc(db, collectionName, id)
            : doc(db, collectionName)
        await setDoc(docRef, dataToAdd, { merge: true })
    } catch (err: any) {
        console.log(err.message)
        console.log(Object.entries(err))
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
    } catch (err: any) {
        console.log(err.message)
        console.log(Object.entries(err))
    }
}
