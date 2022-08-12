import React from "react"
import { Conversation } from "../Conversation"
import { Dashboard } from "../Dasboard"
import { Container } from "./style"

export const Messenger: React.FC = () => {
    return (
        <Container>
            <Dashboard />
            <Conversation />
        </Container>
    )
}
