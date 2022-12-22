import create from "zustand"
import { userPropsTypes } from "../types/types"

type useLoggedUserStoreProps = {
    loggedUser: userPropsTypes | null
    setLoggedUser: (user: userPropsTypes | null) => void
}

export const useLoggedUserStore = create<useLoggedUserStoreProps>(set => {
    return {
        loggedUser: null,
        setLoggedUser: user => set({ loggedUser: user }),
    }
})
