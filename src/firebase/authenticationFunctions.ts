import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
} from "firebase/auth"
import { useContactsStore } from "../states/contacts"
import { useLoggedUserStore } from "../states/loggedUser"
import { useSnackbarStore } from "../states/snackbar"
import {
    ContactPropsTypes,
    MessagePropsTypes,
    signInPropsType,
    signUpPropsType,
    userPropsTypes,
} from "../types/types"
import { auth } from "./firebaseConfig"
import {
    createDocument,
    getDocument,
    updateDocument,
} from "./firestoreFunctions"
const { setLoggedUser } = useLoggedUserStore.getState()
const { setContacts } = useContactsStore.getState()

export const signIn: signInPropsType = async (
    email,
    password,
    conclusionCallback,
    startCallback
) => {
    try {
        startCallback && startCallback()
        setLoggedUser(null)
        const {
            user: { uid },
        } = await signInWithEmailAndPassword(auth, email, password)
        conclusionCallback && conclusionCallback(true)
        await updateDocument("users", { status: "online" }, uid)
    } catch (err: any) {
        if (err.code === "auth/user-not-found") {
            useSnackbarStore.setState({
                open: true,
                message: "Usuário não existe",
                type: "warning",
            })
        } else {
            console.log(err)
            console.log(err.message)
            console.log(Object.entries(err))
        }
        conclusionCallback && conclusionCallback(false)
    }
}

export const updateMessagesStatus = (user: userPropsTypes) => {
    if (user?.contacts?.length) {
        const contacts = user.contacts
        contacts.forEach((contact: ContactPropsTypes) => {
            const chatId =
                user.uid > contact.uid
                    ? user.uid + contact.uid
                    : contact.uid + user.uid
            if (user) {
                getDocument("messages", chatId).then(messages => {
                    let updatedMessagesStatus = []
                    if (messages) {
                        updatedMessagesStatus = Object.values(messages)
                            .filter(
                                (message: MessagePropsTypes) =>
                                    message.status === "sent" &&
                                    message.from === contact.uid
                            )
                            .reduce((obj, message) => {
                                obj[`${message.created_at}.status`] = "received"
                                return obj
                            }, {})
                        if (updatedMessagesStatus.length) {
                            updateDocument(
                                "messages",
                                updatedMessagesStatus,
                                chatId
                            )
                        }
                    }
                })
                getDocument("last_messages", user.uid).then(messages => {
                    let updatedMessagesStatus
                    if (messages && Object.keys(messages)?.length) {
                        Object.entries(messages).forEach(message => {
                            const [key, value] = message
                            console.log(key, value)
                            if (
                                value.status === "sent" &&
                                value.from === contact.uid
                            ) {
                                updatedMessagesStatus = {
                                    [`${key}.message.status`]: "received",
                                }
                            }
                        })
                        if (updatedMessagesStatus) {
                            updateDocument(
                                "messages",
                                updatedMessagesStatus,
                                user.uid
                            )
                        }
                    }
                })
            }
        })
    }
}

export const getOnlineUser = (loadingCallback: (arg: boolean) => void) => {
    loadingCallback(true)
    onAuthStateChanged(auth, user => {
        if (user) {
            const uid = user.uid
            getDocument("users", uid).then(user => {
                const userProps = user as userPropsTypes
                setLoggedUser(userProps)
                setContacts(userProps.contacts)
                loadingCallback(false)
                updateMessagesStatus(userProps)
            })
        } else {
            loadingCallback(false)
            setLoggedUser(null)
        }
    })
}

export const signUp: signUpPropsType = async (
    email,
    password,
    photoURL,
    displayName,
    position
) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password).then(
            credential => {
                const userData = {
                    uid: credential.user.uid,
                    email: credential.user.email,
                    displayName: displayName || "",
                    photoURL: photoURL || "",
                    position: position || "",
                    status: "online",
                    contacts: [],
                }
                createDocument("users", userData, credential.user.uid)
                setLoggedUser({ userData })
            }
        )
    } catch (err: any) {
        if (err.message.includes("auth/email-already-in-use")) {
            useSnackbarStore.setState({
                open: true,
                message: "E-mail já cadastrado",
                type: "error",
            })
        }
        console.log(err)
        console.log(err.message)
        console.log(Object.entries(err))
    }
}
