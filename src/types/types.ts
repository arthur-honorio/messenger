import { DocumentData } from "firebase/firestore"
import { Moment } from "moment"
import { MouseEventHandler } from "react"

export type UserProfileContainerProps = {
    isFromProfile?: boolean
    imgSize: "L" | "M" | "S"
}

export interface UserDetailsTypes extends UserProfileContainerProps {
    user: ContactPropsTypes
    className: string
}

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
    user: userPropsTypes
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

export type userBasePropsTypes = {
    displayName: string
    uid: string
    email: string
    photoURL?: string
    position?: string
    status?: string | React.ReactNode
    contacts?: ContactPropsTypes[]
    conversationOpened?: string
}

export type userPropsTypes = userBasePropsTypes | DocumentData

export interface ContactPropsTypes extends userBasePropsTypes {
    message: {
        conversationId: string
        content: string
        created_at: number
        status: string
        type: string
        from: string
        action?: string
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
    conversationId: string
    divisor: string
}

interface IncompleteRawConversationTypes
    extends Omit<MessagePropsTypes, "src" | "conversationId"> {
    uid: string
}

export type RawConversationTypes = {
    [x: string]: {
        conversation: IncompleteRawConversationTypes[]
    }
}

export type MessageItemPropsTypes = {
    message: MessagePropsTypes 
    className: string
    key: string
}

export type MessagesListPropsTypes = {
    messages: MessagePropsTypes[]
}

export type contactsStorePropsTypes = {
    contacts: ContactPropsTypes[]
    setContacts: (contacts: ContactPropsTypes[]) => void
    selectedContact: ContactPropsTypes | null
    setSelectedContact: (contact: ContactPropsTypes | null) => void
}

export type LastMessagePropsTypes = {
    message: {
        content: string
        created_at: number
        status: string
        type: string
        conversationId: string
        from: string
        action?: string
    }
    userInfo: {
        displayName: string
        photoURL: string
        email: string
        uid: string
    }
}
