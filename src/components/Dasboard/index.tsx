import React from "react"

import { UserProfile } from "../UserProfile"
import { ConversationsList } from "./ConversationsList"
import { SearchBar } from "./SearchBar"

import { Container } from "./style"

export const Dashboard: React.FC = () => {
    return (
        <Container>
            <UserProfile />
            <SearchBar />
            <ConversationsList
                conversationsList={[
                    {
                        user: "1",
                        last_message: "Teste",
                        last_message_date: new Date(),
                        status: "online",
                        unread_messages_count: 2,
                        message_status: "received",
                    },
                    {
                        user: "1",
                        last_message: "Teste",
                        last_message_date: new Date(),
                        status: "online",
                        unread_messages_count: 2,
                        message_status: "sent",
                    },
                ]}
            />
        </Container>
    )
}
