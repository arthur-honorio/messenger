import React from "react"

import { UserProfile } from "../UserProfile"
import { ConversationsList } from "../ConversationsList"
import { SearchBar } from "../SearchBar"

import { Container } from "./style"

export const Dashboard: React.FC = () => {
    return (
        <Container className="dashboard">
            <UserProfile isFromProfile imgSize="L"/>
            <SearchBar />
            <ConversationsList />
        </Container>
    )
}
