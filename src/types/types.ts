import { DocumentData } from "firebase/firestore"
import { Moment } from "moment"

export type UserFormPropsType = {
    setFormData: (data: HTMLFormElement | null) => void
    setShow: (arg: boolean) => void
}

export type userPropsTypes =
    | {
          displayName: string
          photoURL: string | null
          position?: string | null
          status?: string
          uid: string
          email: string
          contacts?: contactPropsTypes[]
      }
    | DocumentData

export type contactPropsTypes = {
    email: string
    uid: string
    displayName: string
    photoURL: string
    conversationId?: string
    lastMessage?: {
        content: string
        type: string
        date: string
    }
}

export type ActionButtonPropsTypes = {
    loadingSuccedded: boolean
    isLoading: boolean
    handleClick: (...args: any[]) => any
    buttonContent: string
}

export type MessagePropsTypes = {
    content?: string
    src?: string
    created_at: Moment | string
    status: string
    type: "audio" | "video" | "text" | "file" | "image"
    from: string
}

export type MessageItemPropsTypes = {
    message: MessagePropsTypes
}

export type MessagesListPropsTypes = {
    messages: MessagePropsTypes[]
}

export type contactsStorePropsTypes = {
    contacts: contactPropsTypes[]
    setContacts: (contacts: contactPropsTypes[]) => void
    selectedContact: contactPropsTypes | null
    setSelectedContact: (contact: contactPropsTypes) => void
}
