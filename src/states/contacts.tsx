import create from "zustand"
import { contactPropsTypes, contactsStorePropsTypes } from "../types/types"

export const useContactsStore = create<contactsStorePropsTypes>(set => ({
    contacts: [],
    setContacts: (contacts: contactPropsTypes[]) => set(() => ({ contacts })),
    selectedContact: null,
    setSelectedContact: (contact: contactPropsTypes) =>
        set(() => ({ selectedContact: contact })),
}))
