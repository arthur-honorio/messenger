import create from "zustand"

type contactsStoreProps = {
    contacts: contactProps[]
    selectedContact: contactProps | null
    setSelectedContact: (contact: contactProps) => void
}

type contactProps = {
    uid: string
    photoURL: string
    name: string
    position: string
    email: string
}

export const useContactsStore = create<contactsStoreProps>(set => ({
    contacts: [],
    selectedContact: null,
    setSelectedContact: (contact: contactProps) =>
        set(() => ({ selectedContact: contact })),
}))
