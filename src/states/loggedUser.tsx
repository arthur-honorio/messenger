import create from "zustand"
import { Auth, User } from "firebase/auth"

type LoggedUser = {
    auth: Auth | null
    setAuth: (auth: Auth | null) => void
    currentUser: User | null
    setCurrentUser: (user: User | null) => void
    img: string
    position: string
}

export const useLoggedUserStore = create<LoggedUser>(set => {
    return {
        auth: null,
        setAuth: auth => set(state => ({ auth })),
        currentUser: null,
        setCurrentUser: user => set(state => ({ currentUser: user })),
        img: "",
        position: "",
    }
})
