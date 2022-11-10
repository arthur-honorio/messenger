import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth"
import { useLoggedUserStore } from "../states/loggedUser"
import { useSnackbarStore } from "../states/snackbar"
import { auth } from "./firebaseConfig"
import {
    createDocument,
    getDocument,
    updateDocument,
} from "./firestoreFunctions"
const { setLoggedUser } = useLoggedUserStore.getState()

export const signIn = async (
    email: string,
    password: string,
    conclusionCallback?: (arg: boolean) => void,
    startCallback?: () => void
) => {
    try {
        startCallback && startCallback()
        setLoggedUser(null)
        const {
            user: { uid },
        } = await signInWithEmailAndPassword(auth, email, password)
        await updateDocument("users", { status: "online" }, uid)
        getDocument("users", uid).then(userData => {
            if (userData) {
                conclusionCallback && conclusionCallback(true)
                setTimeout(() => {
                    setLoggedUser({ ...userData, status: "online" })
                    useSnackbarStore.setState({
                        open: true,
                        message: `Usuário logado: ${email}`,
                        type: "success",
                    })
                }, 1000)
            }
        })
    } catch (err: any) {
        if (err.code === "auth/user-not-found") {
            useSnackbarStore.setState({
                open: true,
                message: "Usuário não existe",
                type: "warning",
            })
        } else {
            console.log(err.message)
            console.log(Object.entries(err))
        }
        conclusionCallback && conclusionCallback(false)
    }
}

export const signUp = async (email: string, password: string) => {
    try {
        const {
            user: { email: emailFromCredential, uid },
        } = await createUserWithEmailAndPassword(auth, email, password)
        const userData = {
            email: emailFromCredential,
            displayName: "",
            photoURL: "",
            uid,
            status: "online",
            contacts: [],
        }
        createDocument("users", userData, uid)
        setLoggedUser({ userData })
    } catch (err: any) {
        console.log(err.message)
        console.log(Object.entries(err))
    }
}
