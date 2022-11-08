import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage"
import { app } from "./firebaseConfig"

const storage = getStorage(app)

export const uploadFiles = (
    file: any,
    callback: (url: string) => void
) => {
    const fileName = `${file.lastModified}-${file.name}`
    const storageRef = ref(storage, fileName)

    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on(
        "state_changed",
        () => {},
        err => {
            console.log(err.message)
            console.log(Object.entries(err))
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(callback)
        }
    )
}
