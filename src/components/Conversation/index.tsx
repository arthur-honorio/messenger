import React from "react"

import { Container } from "./style"
import { ContactInfo } from "../ContactInfo"
import { MessagesList } from "../MessagesList"
import { MessageInput } from "../MessageInput"

export const Conversation: React.FC = () => {
    return (
        <Container>
            <ContactInfo />
            <MessagesList />
            <MessageInput />
        </Container>
    )
}
