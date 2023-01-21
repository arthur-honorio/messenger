import create from "zustand"
import { ContactPropsTypes, contactsStorePropsTypes } from "../types/types"

export const useContactsStore = create<contactsStorePropsTypes>(set => ({
    contacts: [],
    setContacts: (contacts: ContactPropsTypes[]) => set(() => ({ contacts })),
    selectedContact: null,
    setSelectedContact: (contact: ContactPropsTypes | null) =>
        set(() => ({ selectedContact: contact })),
}))
