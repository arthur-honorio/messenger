import React, { useEffect, useState } from "react"
import {
    getDocument,
    getRealtimeData,
    updateDocument,
} from "../../firebase/firestoreFunctions"
import { useContactsStore } from "../../states/contacts"
import { useLoggedUserStore } from "../../states/loggedUser"
import {
    ContactPropsTypes,
    LastMessagePropsTypes,
    MessagePropsTypes,
} from "../../types/types"
import { UserDetails } from "../UserDetails"

import { Container, SubContainer } from "./style"

export const ConversationsList: React.FC = () => {
    const { loggedUser } = useLoggedUserStore(state => state)
    const { contacts, setContacts, setSelectedContact } = useContactsStore(
        state => state
    )
    const [chatList, setChatList] = useState<LastMessagePropsTypes[] | []>([])
    const [chatUsersIds, setChatUsersIds] = useState<string[]>([])
    const [selectedConversation, setSelectedConversation] = useState<string>("")

    const setInitiatedChats = (data: any) => {
        if (data) {
            setChatUsersIds(Object.keys(data))
            const lastMessages: LastMessagePropsTypes[] = Object.values(data)
            const sortedMessages: LastMessagePropsTypes[] = lastMessages.sort(
                (a: LastMessagePropsTypes, b: LastMessagePropsTypes) =>
                    a.message.created_at - b.message.created_at * -1
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

    function handleSetSelectedContact(contact: ContactPropsTypes) {
        setSelectedContact(contact)
        handleMessagesStatus(contact)
        setSelectedConversation(contact.uid)
    }

    function handleMessagesStatus(contact: ContactPropsTypes) {
        if (loggedUser) {
            const chatId =
                loggedUser.uid > contact.uid
                    ? loggedUser.uid + contact.uid
                    : contact.uid + loggedUser.uid
            getDocument("messages", chatId).then(messages => {
                let updatedMessagesStatus = {}
                if (messages) {
                    const message: MessagePropsTypes[] = Object.values(messages)
                    for (let i = messages.length - 1; i >= 0; i--) {
                        if (message[i].from === contact.uid) {
                            if (message[i].status !== "received") {
                                break
                            } else {
                                updatedMessagesStatus = {
                                    ...updatedMessagesStatus,
                                    [`${message[i].created_at}.status`]: "read",
                                }
                            }
                        } else {
                            continue
                        }
                    }
                    if (Object.keys(updatedMessagesStatus).length)
                        updateDocument(
                            "messages",
                            updatedMessagesStatus,
                            chatId
                        )
                }
            })
            getDocument("last_messages", loggedUser.uid).then(messages => {
                if (messages) {
                    let updatedMessagesStatus
                    Object.entries(messages).forEach(
                        (message: [string, MessagePropsTypes]) => {
                            const [key, value] = message
                            if (
                                value.status === "received" &&
                                value.conversationId === chatId
                            ) {
                                updatedMessagesStatus = {
                                    [`${key}.message.status`]: "read",
                                }
                            }
                        }
                    )
                    if (updatedMessagesStatus)
                        updateDocument(
                            "last_messages",
                            updatedMessagesStatus,
                            loggedUser.uid
                        )
                }
            })
        }
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
                <h3>Contatos</h3>
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
