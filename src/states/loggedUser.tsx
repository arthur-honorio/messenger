import create from "zustand"
import { app } from "../firebase"
import { Auth, getAuth, UserCredential } from "firebase/auth"

type LoggedUser = {
    auth: Auth
    currentUser: undefined | UserCredential
    img: string
    position: string
}

export const useLoggedUserStore = create<LoggedUser>(set => ({
    auth: getAuth(app),
    currentUser: undefined,
    img: "",
    position: "",
}))
