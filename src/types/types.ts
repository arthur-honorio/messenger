import { DocumentData } from "firebase/firestore"
import { Moment } from "moment"
import { MouseEventHandler } from "react"

export type UserStatusPropsTypes = {
    size: string
    status: string | JSX.Element | undefined
}

export type UserImagePropsTypes = {
    size: string
    src: string | undefined
    alt: string
}

export type ContainerPropsTypes = {
    size: string
}

export type UserImageAndStatusProps = {
    imageSize: string
    onClick?: MouseEventHandler<HTMLDivElement>
    user: {
        imageSrc: string | undefined
        status: string | JSX.Element | undefined
        name?: string | undefined
    }
}

export type UserEditionModalPropsTypes = {
    show: boolean
    setShow: (arg0: boolean) => void
}

export type UserEditionPropsType = {
    displayName?: string
    position?: string
    photoURL?: string
    email?: string
    password?: string
}

export type signUpComponentPropsType = {
    setShowSignUp: (arg0: boolean) => void
}

export type AddFilePropsType = {
    show: boolean
    setShow: (arg0: boolean) => void
    setFiles: React.Dispatch<React.SetStateAction<string[]>>
}

export type UserFormPropsType = {
    setShow: (arg: boolean) => void
    show: boolean
}

export type signInPropsType = {
    (
        email: string,
        password: string,
        conclusionCallback?: (arg: boolean) => void,
        startCallback?: () => void
    ): void
}

export type signUpPropsType = {
    (
        email: string,
        password: string,
        photoURL?: string,
        displayName?: string,
        position?: string
    ): Promise<void>
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
    handleClick?: (...args: any[]) => any
    buttonContent: string
    buttonType: "button" | "submit" | "reset" | undefined
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
