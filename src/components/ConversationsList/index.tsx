import React, { useEffect, useState } from "react"
import { IoImage, IoPlayBackCircle } from "react-icons/io5"
import { useContactsStore } from "../../states/contacts"
import { useLoggedUserStore } from "../../states/loggedUser"
import { contactPropsTypes } from "../../types/types"
import { UserImageAndStatus } from "../UserImageAndStatus"

import { Container } from "./style"

export const ConversationsList: React.FC = () => {
    const loggedUser = useLoggedUserStore(state => state.loggedUser)
    const { contacts, setSelectedContact } = useContactsStore(state => state)
    const [initiatedChats, setInitiatedChats] = useState<contactPropsTypes[] | []>(
        []
    )

    useEffect(() => {
        const contactsWithConversation =
            contacts?.filter(contact => contact?.lastMessage?.content) || []
        setInitiatedChats(contactsWithConversation)
    }, [contacts])

    function getMessageStatus(lastMessage: contactPropsTypes["lastMessage"]) {
        switch (lastMessage?.type) {
            case "image":
                return <IoImage />
            case "audio":
                return <IoPlayBackCircle />
            default:
                return lastMessage?.content
        }
    }

    function handleSetSelectedContact(contact: contactPropsTypes) {
        setSelectedContact(contact)
    }

    if (loggedUser && contacts?.length) {
        return (
            <Container className="conversations-list-item">
                {initiatedChats?.map(contact => (
                    <UserImageAndStatus
                        imageSize="S"
                        user={{
                            imageSrc: contact.photoURL,
                            status: getMessageStatus(contact.lastMessage),
                            name: contact.displayName,
                        }}
                        onClick={() => handleSetSelectedContact(contact)}
                    />
                ))}
                <span className="user-name" />
            </Container>
        )
    } else {
        return (
            <div className="no-conversations">
                Adicione contatos e comece a conversar
            </div>
        )
    }
}
