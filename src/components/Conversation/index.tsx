import React from "react"

import { Container } from "./style"
import { UserDetails } from "../UserDetails"
// import { MessagesList } from "../MessagesList"
// import { MessageInput } from "../MessageInput"

export const Conversation: React.FC = () => {
    return (
        <Container>
            <UserDetails
                imageSize="M"
                isFromProfile={false}
                user={{
                    imageSrc: "",
                    name: "Arthur",
                    position: "FrontEnd",
                    status: "online",
                }}
            />
            {/* 
            <MessagesList />
            <MessageInput /> */}
        </Container>
    )
}
