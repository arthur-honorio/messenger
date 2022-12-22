import React from "react"
import { FaFile, FaSearch } from "react-icons/fa"
import { UserProfile } from "../UserProfile"

import { Container, MessagesHeaderButtons } from "./style"

export const MessagesHeader: React.FC = () => {
    return (
        <Container className="messages-header">
            <UserProfile imgSize="M" isFromProfile={false} />
            <MessagesHeaderButtons className="messages-header-buttons">
                <FaSearch onClick={() => {}} />
                <FaFile onClick={() => {}} />
            </MessagesHeaderButtons>
        </Container>
    )
}
