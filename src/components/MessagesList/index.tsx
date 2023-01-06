import { DocumentData } from "firebase/firestore"
import React, { useEffect, useState } from "react"
import { getRealtimeData } from "../../firebase/firestoreFunctions"
import { useContactsStore } from "../../states/contacts"
import { MessagePropsTypes, MessagesListPropsTypes } from "../../types/types"
import { getRealtimeMessages } from "../Conversation"
import { MessageItem } from "../MessageItem"

import { Container } from "./style"

export const MessagesList: React.FC<MessagesListPropsTypes> = () => {
    const { selectedContact } = useContactsStore(state => state)
    const [messages, setMessages] = useState<DocumentData>([])

    useEffect(() => {
        if (selectedContact?.message?.conversationId) {
            getRealtimeData(
                data => getRealtimeMessages(data, setMessages),
                "messages",
                selectedContact?.message?.conversationId
            )
        }
    }, [selectedContact])

    const classCreator = (index: number, messages: MessagePropsTypes[]) => {
        if (
            (!messages[index - 1] && !messages[index + 1]) ||
            (messages[index - 1] &&
                messages[index + 1] &&
                messages[index].from !== messages[index - 1].from &&
                messages[index].from !== messages[index + 1].from) ||
            (messages[index - 1] &&
                !messages[index + 1] &&
                messages[index].from !== messages[index - 1].from) ||
            (messages[index + 1] &&
                !messages[index - 1] &&
                messages[index].from !== messages[index + 1].from)
        ) {
            return "only-message"
        } else if (
            !messages[index - 1] ||
            messages[index].from !== messages[index - 1].from
        ) {
            return "first-message"
        } else if (
            !messages[index + 1] ||
            messages[index].from !== messages[index + 1].from
        ) {
            return "last-message"
        } else return "same-creator"
    }

    return (
        <Container className="messages-list">
            {messages?.map((message: MessagePropsTypes, index: number) => (
                <MessageItem
                    className={classCreator(
                        index,
                        messages as MessagePropsTypes[]
                    )}
                    message={message}
                />
            ))}
        </Container>
    )
}
