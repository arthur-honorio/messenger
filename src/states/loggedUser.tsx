import { DocumentData } from "firebase/firestore"
import create from "zustand"

export type userProps =
    | {
          displayName: string
          photoURL: string | null
          status: string
          uid: string
          email: string
          contacts?: userProps[]
      }
    | DocumentData

type useLoggedUserStoreProps = {
    loggedUser: userProps | null
    setLoggedUser: (user: userProps | null) => void
}

export const useLoggedUserStore = create<useLoggedUserStoreProps>(set => {
    return {
        loggedUser: null,
        setLoggedUser: user => set({ loggedUser: user }),
    }
})
