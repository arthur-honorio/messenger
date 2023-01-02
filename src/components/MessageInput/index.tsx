import React, { useState } from "react"
import { AddFile } from "../AddFile"
import { IoAdd, IoMic, IoSendSharp } from "react-icons/io5"
import { arrayUnion, Timestamp } from "firebase/firestore"
import { nanoid } from "nanoid"
import { Container } from "./style"
import { useLoggedUserStore } from "../../states/loggedUser"
import { useContactsStore } from "../../states/contacts"
import { createDocument, getDocument, updateDocument } from "../../firebase/firestoreFunctions"

export const MessageInput: React.FC = () => {
    const [files, setFiles] = useState<string[]>([])
    const [message, setMessage] = useState("")
    const [showAddFile, setShowAddFile] = useState(false)
    const { loggedUser } = useLoggedUserStore(state => state)
    const { selectedContact } = useContactsStore(state => state)

    const handleHideAddFile = (showAddFile: boolean) => {
        setShowAddFile(showAddFile)
    }

    const handleSendMessage = async () => {
        if (loggedUser && selectedContact) {
            const chatId =
                loggedUser.uid > selectedContact.uid
                    ? loggedUser.uid + selectedContact.uid
                    : selectedContact.uid + loggedUser.uid
            const messages = await getDocument("messages", chatId)
            if (!messages)
                createDocument(
                    "messages",
                    {
                        conversation: [
                            {
                                content: message,
                                uid: nanoid(),
                                status: "sent",
                                type: "text",
                                created_at: Timestamp,
                            },
                        ],
                        lastMessage: {
                            content: message.substring(0, 30),
                            type: "text",
                            created_at: Timestamp,
                        },
                    },
                    chatId
                )
            else {
                updateDocument(
                    "messages",
                    {
                        conversation: arrayUnion({
                            uid: nanoid(),
                            content: message,
                            status: "sent",
                            type: "text",
                            created_at: Timestamp,
                        }),
                        lastMessage: {
                            content: message.substring(0, 30),
                            type: "text",
                            created_at: Timestamp,
                        },
                    },
                    chatId
                )
            }
        }
    }

    return (
        <Container className="message-input">
            <input
                type="text"
                placeholder="Mensagem"
                onChange={e => setMessage(e.target.value)}
            />
            <IoSendSharp onClick={handleSendMessage} />
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
