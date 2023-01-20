import React, { useEffect, useState } from "react"
import { getRealtimeData } from "../../firebase/firestoreFunctions"
import { useContactsStore } from "../../states/contacts"
import { useLoggedUserStore } from "../../states/loggedUser"
import { contactPropsTypes, LastMessagePropsTypes } from "../../types/types"
import { UserDetails } from "../UserDetails"

import { Container, SubContainer } from "./style"

export const ConversationsList: React.FC = () => {
    const { loggedUser } = useLoggedUserStore(state => state)
    const { contacts, setContacts, setSelectedContact } = useContactsStore(
        state => state
    )
    const [chatList, setChatList] = useState<LastMessagePropsTypes[] | []>([])
    const [chatUsersIds, setChatUsersIds] = useState<string[]>([])

    const setInitiatedChats = (data: any) => {
        if (data) {
            setChatUsersIds(Object.keys(data))
            const lastMessages: LastMessagePropsTypes[] = Object.values(data)
            const sortedMessages: LastMessagePropsTypes[] = lastMessages.sort(
                (a: LastMessagePropsTypes, b: LastMessagePropsTypes) =>
                    a.message.created_at - b.message.created_at
            )
            setChatList(sortedMessages)
        }
    }

    const setUpdatedContacts = (data: any) => {
        setContacts(data?.contacts)
    }

    useEffect(() => {
        if (loggedUser) {
            getRealtimeData(setInitiatedChats, "last_messages", loggedUser.uid)
            getRealtimeData(setUpdatedContacts, "users", loggedUser.uid)
        }
    }, [loggedUser])

    function handleSetSelectedContact(contact: contactPropsTypes) {
        setSelectedContact(contact)
    }

    return (
        <Container>
            <SubContainer className="contacts-list">
                <h3>Conversas</h3>
                {chatList?.length ? (
                    chatList?.map(contact => {
                        return (
                            <li
                                className={`conversation-list-li${
                                    selectedConversation ===
                                    contact.userInfo.uid
                                        ? " selected"
                                        : ""
                                }`}
                                onClick={e => {
                                    handleSetSelectedContact({
                                        ...contact.userInfo,
                                        message: contact.message,
                                    })
                                    setSelectedConversation(
                                        contact.userInfo.uid
                                    )
                                }}
                                key={contact.userInfo.uid}
                            >
                                <UserDetails
                                    className="conversation-list-item"
                                    imgSize="S"
                                    user={{
                                        ...contact.userInfo,
                                        message: contact.message,
                                    }}
                                />
                            </li>
                        )
                    })
                ) : (
                    <p className="no-conversations">Nenhuma conversa</p>
                )}
            </SubContainer>
            <hr />
            <SubContainer className="conversations-list">
                <h3>Contatos inativos</h3>
                {contacts?.length ? (
                    contacts
                        .filter(contact => !chatUsersIds.includes(contact.uid))
                        .map(contact => {
                            return (
                                <li
                                    className="contacts-list-li"
                                    onClick={() =>
                                        handleSetSelectedContact(contact)
                                    }
                                    key={contact.uid}
                                >
                                    <UserDetails
                                        className="contacts-list-item"
                                        imgSize="S"
                                        user={contact}
                                    />
                                </li>
                            )
                        })
                ) : (
                    <p className="no-contacts">Nenhum contato adicionado</p>
                )}
            </SubContainer>
        </Container>
    )
}
