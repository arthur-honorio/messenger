import React, { useEffect, useRef, useState } from "react"
import { AddFile } from "../AddFile"
import { IoAdd, IoMic, IoSendSharp } from "react-icons/io5"
import { Container } from "./style"
import { useLoggedUserStore } from "../../states/loggedUser"
import { useContactsStore } from "../../states/contacts"
import {
    createDocument,
    getDocument,
    updateDocument,
} from "../../firebase/firestoreFunctions"
import moment from "moment"

export const MessageInput: React.FC = () => {
    const [files, setFiles] = useState<string[]>([])
    const [message, setMessage] = useState("")
    const [showAddFile, setShowAddFile] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const { loggedUser } = useLoggedUserStore(state => state)
    const { selectedContact } = useContactsStore(state => state)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleHideAddFile = (showAddFile: boolean) => {
        setShowAddFile(showAddFile)
    }

    useEffect(() => {
        if (message.length && !isTyping) {
            setIsTyping(true)
            setUserActionStatus()
        } else if (!message && isTyping) {
            setIsTyping(false)
            setUserActionStatus(null)
        }
    }, [message, isTyping])

    const setUserActionStatus = async (action: null | string = "typing") => {
        if (loggedUser && selectedContact) {
            const messages = await getDocument("last_messages", loggedUser.uid)
            if (messages && messages[selectedContact.uid]) {
                updateDocument(
                    "last_messages",
                    {
                        [`${loggedUser.uid}.message.action`]: action,
                    },
                    selectedContact.uid
                )
            }
        }
    }

    const handleSendMessage = async (type: string) => {
        if (loggedUser && selectedContact && message) {
            const chatId =
                loggedUser.uid > selectedContact.uid
                    ? loggedUser.uid + selectedContact.uid
                    : selectedContact.uid + loggedUser.uid
            const messages = await getDocument("messages", chatId)
            const timestamp = moment().valueOf()
            console.log(messages)
            try {
                if (!messages) {
                    createDocument(
                        "messages",
                        {
                            [timestamp]: {
                                content: message,
                                status: "sent",
                                type,
                                created_at: timestamp,
                                from: loggedUser.uid,
                            },
                        },
                        chatId
                    )
                    createDocument(
                        "last_messages",
                        {
                            [selectedContact.uid]: {
                                message: {
                                    content: message,
                                    status: "sent",
                                    type,
                                    created_at: timestamp,
                                    conversationId: chatId,
                                    from: loggedUser.uid,
                                    action: "",
                                },
                                userInfo: {
                                    photoURL: selectedContact.photoURL,
                                    displayName: selectedContact.displayName,
                                    email: selectedContact.email,
                                    uid: selectedContact.uid,
                                },
                            },
                        },
                        loggedUser.uid
                    )
                    createDocument(
                        "last_messages",
                        {
                            [loggedUser.uid]: {
                                message: {
                                    content: message,
                                    status: "sent",
                                    type,
                                    created_at: timestamp,
                                    conversationId: chatId,
                                    from: loggedUser.uid,
                                    action: "",
                                },
                                userInfo: {
                                    photoURL: loggedUser.photoURL,
                                    displayName: loggedUser.displayName,
                                    email: loggedUser.email,
                                    uid: loggedUser.uid,
                                },
                            },
                        },
                        selectedContact.uid
                    )

                    setMessage("")
                    if (inputRef?.current) inputRef.current.value = ""
                } else {
                    updateDocument(
                        "messages",
                        {
                            [timestamp]: {
                                content: message,
                                status: "sent",
                                type: "text",
                                created_at: timestamp,
                                from: loggedUser.uid,
                            },
                        },
                        chatId
                    )
                    updateDocument(
                        "last_messages",
                        {
                            [`${selectedContact.uid}.message.content`]: message,
                            [`${selectedContact.uid}.message.status`]: "sent",
                            [`${selectedContact.uid}.message.type`]: type,
                            [`${selectedContact.uid}.message.created_at`]:
                                timestamp,
                        },
                        loggedUser.uid
                    )
                    updateDocument(
                        "last_messages",
                        {
                            [`${loggedUser.uid}.message.content`]: message,
                            [`${loggedUser.uid}.message.status`]: "sent",
                            [`${loggedUser.uid}.message.type`]: type,
                            [`${loggedUser.uid}.message.created_at`]: timestamp,
                        },
                        selectedContact.uid
                    )
                    setMessage("")
                    if (inputRef?.current) inputRef.current.value = ""
                }
            } catch (err: any) {
                console.log(err)
                console.log(err.message)
                console.log(Object.entries(err))
            }
        }
    }

    return (
        <Container className="message-input">
            <input
                ref={inputRef}
                type="text"
                placeholder="Mensagem"
                onChange={e => {
                    e.target.value = e.target.value.trimStart()
                    const value = e.target.value
                    setMessage(value)
                }}
                onKeyDown={e => {
                    if (e.key === "Enter") handleSendMessage("text")
                }}
            />
            <IoSendSharp onClick={() => handleSendMessage("text")} />
            <IoMic onClick={() => {}} />
            <IoAdd onClick={() => setShowAddFile(true)} />
            <AddFile
                setShow={handleHideAddFile}
                show={showAddFile}
                setFiles={setFiles}
            />
        </Container>
    )
}
