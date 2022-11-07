import { initializeApp } from "firebase/app"
import {
    getFirestore,
    setDoc,
    doc,
    updateDoc,
    getDoc,
} from "firebase/firestore"
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
import { useLoggedUserStore } from "../states/loggedUser"

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
    dataToAdd: { [key: string]: any },
    id: string
) => {
    try {
        const docRef = doc(db, collectionName, id)
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

export const signIn = async (email: string, password: string) => {
    const { setLoggedUser } = useLoggedUserStore.getState()
    try {
        const signInResponse = await signInWithEmailAndPassword(
            auth,
            email,
            password
        )
        if (signInResponse && auth?.currentUser?.uid) {
            await updateDocument(
                "users",
                { status: "online" },
                auth.currentUser.uid
            )
            getDoc(doc(db, "users", auth.currentUser.uid)).then(response => {
                if (response.data()) {
                    const user = response.data()
                    if (!!user) setLoggedUser(user)
                }
            })

            return signInResponse
        }
    } catch (err: any) {
        if (err.code === "auth/user-not-found") {
            return "user-not-found"
        } else {
            console.log(err.message)
            console.log(Object.entries(err))
        }
    }
}

export const signUp = (email: string, password: string) => {
    try {
        createUserWithEmailAndPassword(auth, email, password).then(
            signUpResponse => {
                if (signUpResponse) {
                    const { setLoggedUser } = useLoggedUserStore.getState()
                    const { displayName, photoURL, uid, email } =
                        signUpResponse.user

                    const dataObj = {
                        displayName,
                        photoURL,
                        status: "online",
                        uid,
                        email,
                        contacts: [],
                    }
                    createDocument("users", dataObj, signUpResponse?.user?.uid)
                    getDoc(doc(db, "users", signUpResponse.user.uid)).then(
                        response => {
                            if (response.data()) {
                                const user = response.data()
                                if (!!user) setLoggedUser({ ...user })
                            }
                        }
                    )
                }
            }
        )
    } catch (err: any) {
        console.log(err.message)
        console.log(Object.entries(err))
    }
}
