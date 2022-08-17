import React from "react"

import { UserProfile } from "../UserProfile"
import { ConversationsIndex } from "../ConversationsIndex"

import { Container } from "./style"


export const MessagesList: React.FC = () => {
    return (
        <Container>
            <UserProfile />
            <ConversationsIndex />
        </Container>
    )
}
