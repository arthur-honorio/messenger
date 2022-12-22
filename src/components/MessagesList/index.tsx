import { DocumentData } from "firebase/firestore"
import React, { useState } from "react"
import { getRealtimeData } from "../../firebase/firestoreFunctions"
import { useContactsStore } from "../../states/contacts"
import { MessagePropsTypes, MessagesListPropsTypes } from "../../types/types"
import { MessageItem } from "../MessageItem"

import { Container } from "./style"

export const MessagesList: React.FC<MessagesListPropsTypes> = () => {
    const { selectedContact } = useContactsStore(state => state)
    const [messages, setMessages] = useState<DocumentData>([])
    selectedContact?.conversationId &&
        getRealtimeData(setMessages, "messages", selectedContact.conversationId)
    return (
        <Container className="messages-list">
            {messages.map((message: MessagePropsTypes) => (
                <MessageItem message={message} />
            ))}
        </Container>
    )
}