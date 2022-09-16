import React from "react"

import { UserProfile } from "../../UserProfile"
import { ConversationsList } from "./ConversationsList/ConversationsListItem"
import { SearchBar } from "./SearchBar"

import { Container } from "./style"

export const Dashboard: React.FC = () => {
    return (
        <Container className="dashboard">
            <UserProfile isFromProfile imgSize="L"/>
            <SearchBar />
            <ConversationsList
                conversationsList={[
                    {
                        user: {
                            name: "Arthur",
                            status: "busy",
                            imageSrc: "",
                        },
                        last_message: "Teste",
                        last_message_date: new Date(),
                        status: "online",
                        unread_messages_count: 2,
                        message_status: "received",
                    },
                    {
                        user: {
                            name: "Arthur",
                            status: "busy",
                            imageSrc: "",
                        },
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
