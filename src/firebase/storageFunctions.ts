import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage"
import { useSnackbarStore } from "../states/snackbar"
import { app } from "./firebaseConfig"

const storage = getStorage(app)

export const uploadFiles = async (file: any, callback: (url: string) => void) => {
    if (+file.size > 1024 * 2) {
        useSnackbarStore.setState({
            open: true,
            message: "Imagem deve ter no máximo 2mb",
            type: "error",
        })
        return
    }
    const fileName = `${file.lastModified}-${file.name}`
    const storageRef = ref(storage, fileName)

    const uploadTask = uploadBytesResumable(storageRef, file)
    uploadTask.on(
        "state_changed",
        e => {
            console.log(e)
        },
        err => {
            console.log(err.message)
            console.log(Object.entries(err))
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then(callback)
        }
    )
}
