import {
    getFirestore,
    setDoc,
    doc,
    updateDoc,
    getDoc,
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore"
import { app } from "./firebaseConfig"

const db = getFirestore(app)

export const documentRef = async (collection: string, id: string) => {
    return doc(db, collection, id)
}

export const getDocument = async (collection: string, id: string) => {
    try {
        const ref = await documentRef(collection, id)
        const doc = await getDoc(ref)
        if (doc.exists()) return doc.data()
    } catch (err: any) {
        console.log(err.message)
        console.log(Object.entries(err))
    }
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
        console.log(err)
        console.log(err.message)
        console.log(Object.entries(err))
    }
}

export const dbSearch = async (
    collectionName: string,
    property: string,
    desiredAnswer: string,
) => {
    const ref = collection(db, collectionName)
    const q = query(ref, where(property, "==", desiredAnswer))
    return await getDocs(q)
}
