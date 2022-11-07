import { DocumentData } from "firebase/firestore"
import create from "zustand"

type user = {
    displayName: string
    photoURL: string | null
    status: string
    uid: string
    email: string
    contacts: user[]
} | DocumentData

type useLoggedUserStoreProps = {
    loggedUser: user | null
    setLoggedUser: (user: user) => void
}

export const useLoggedUserStore = create<useLoggedUserStoreProps>(set => {
    return {
        loggedUser: null,
        setLoggedUser: user => set(state => ({ loggedUser: user })),
    }
})
