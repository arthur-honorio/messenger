import React from "react"
import { MessageItem, MessageProps } from "./MessageItem"

import { Container } from "./style"

type MessagesListProps = {
    messages: MessageProps[]
}

export const MessagesList: React.FC<MessagesListProps> = ({ messages }) => {
    console.log(messages)
    return (
        <Container className="messages-list">
            <ul>
                {messages.map((message: MessageProps) => (
                    <MessageItem message={message} />
                ))}
            </ul>
        </Container>
    )
}
