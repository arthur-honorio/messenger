import React, { useEffect, useState } from "react"
import { useContactsStore } from "../../states/contacts"
import { contactPropsTypes } from "../../types/types"
import { UserDetails } from "../UserDetails"

import { Container, SubContainer } from "./style"

export const ConversationsList: React.FC = () => {
    const { contacts, setSelectedContact } = useContactsStore(state => state)
    const [initiatedChats, setInitiatedChats] = useState<
        contactPropsTypes[] | []
    >([])
    const [noChatContacts, setNoChatContacts] = useState<
        contactPropsTypes[] | []
    >([])

    useEffect(() => {
        const contactsWithConversation: contactPropsTypes[] = []
        const contactsWithoutConversation: contactPropsTypes[] = []
        contacts?.forEach(contact => {
            if (contact?.lastMessage) contactsWithConversation.push(contact)
            else contactsWithoutConversation.push(contact)
        })
        setInitiatedChats(contactsWithConversation)
        setNoChatContacts(contactsWithoutConversation)
    }, [contacts])

    function handleSetSelectedContact(contact: contactPropsTypes) {
        setSelectedContact(contact)
    }

    return (
        <Container>
            <SubContainer className="contacts-list">
                <h3>Conversas</h3>
                {initiatedChats.length ? (
                    initiatedChats?.map(contact => (
                        <li
                            className="conversation-list-li"
                            onClick={() => handleSetSelectedContact(contact)}
                        >
                            <UserDetails
                                className="conversation-list-item"
                                imgSize="S"
                                user={contact}
                                key={contact.uid}
                            />
                        </li>
                    ))
                ) : (
                    <p className="no-conversations">Nenhuma conversa</p>
                )}
            </SubContainer>
            <hr />
            <SubContainer className="conversations-list">
                <h3>Contatos</h3>
                {noChatContacts.length ? (
                    noChatContacts?.map(contact => (
                        <li
                            className="contacts-list-li"
                            onClick={() => handleSetSelectedContact(contact)}
                        >
                            <UserDetails
                                className="conversation-list-item"
                                imgSize="S"
                                user={contact}
                                key={contact.uid}
                            />
                        </li>
                    ))
                ) : (
                    <p className="no-contacts">Nenhum contato adicionado</p>
                )}
            </SubContainer>
        </Container>
    )
}
