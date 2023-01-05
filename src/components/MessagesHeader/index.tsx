import React from "react"
import { FaFile, FaSearch } from "react-icons/fa"
import { useContactsStore } from "../../states/contacts"
import { UserDetails } from "../UserDetails"

import { Container, MessagesHeaderButtons } from "./style"

export const MessagesHeader: React.FC = () => {
    const { selectedContact } = useContactsStore(state => state)
    return (
        <Container className="messages-header">
            {selectedContact && (
                <UserDetails
                    className="selected-contact"
                    user={selectedContact}
                    imgSize="M"
                    isFromProfile={false}
                />
            )}
            <MessagesHeaderButtons className="messages-header-buttons">
                <FaSearch onClick={() => {}} />
                <FaFile onClick={() => {}} />
            </MessagesHeaderButtons>
        </Container>
    )
}
