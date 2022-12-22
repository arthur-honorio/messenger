import { DocumentData } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { getRealtimeData } from "../../firebase/firestoreFunctions"
import { useContactsStore } from "../../states/contacts"
import { useLoggedUserStore } from "../../states/loggedUser"
import { MessagePropsTypes } from "../../types/types"
import { MessageInput } from "../MessageInput"
import { MessagesHeader } from "../MessagesHeader"
import { MessagesList } from "../MessagesList"

import { Container } from "./style"

export const Conversation: React.FC = () => {
    const { selectedContact } = useContactsStore(state => state)
    const { loggedUser } = useLoggedUserStore(state => state)
    const [messages, setMessages] = useState<DocumentData>([])

    useEffect(() => {
        if (loggedUser && selectedContact) {
            const converstionId =
                selectedContact.uid > loggedUser.uid
                    ? selectedContact.uid + loggedUser.uid
                    : loggedUser.uid + selectedContact.uid

            getRealtimeData(setMessages, "conversations", converstionId)
        }
    }, [selectedContact, loggedUser])

    const orderedMessages: MessagePropsTypes[] = messages.sort(
        (a: MessagePropsTypes, b: MessagePropsTypes) => {
            return +a.created_at - +b.created_at
        }
    )
    return (
        <Container className="conversation">
            <MessagesHeader />
            <hr />
            <MessagesList messages={orderedMessages} />
            <hr />
            <MessageInput />
        </Container>
    )
}
