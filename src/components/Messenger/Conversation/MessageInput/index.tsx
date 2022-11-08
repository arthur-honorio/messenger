import React, { useState } from "react"
import { AddFile } from "./AddFile"
import { IoAdd, IoMic, IoSendSharp } from "react-icons/io5"
import { createDocument } from "../../../../firebase/firestoreFunctions"
import { useLoggedUserStore } from "../../../../states/loggedUser"
import { useContactsStore } from "../../../../states/contacts"
import { Timestamp } from "firebase/firestore"

import { Container } from "./style"

export const MessageInput: React.FC = () => {
    const [images, setImages] = useState({})
    const [files, setFiles] = useState({})
    const [message, setMessage] = useState("")
    const [showAddFile, setShowAddFile] = useState(false)
    const { loggedUser } = useLoggedUserStore(state => state)
    const { selectedContact } = useContactsStore(state => state)

    const handleHideAddFile = (showAddFile: boolean) => {
        setShowAddFile(showAddFile)
    }

    function handleSendMessage() {
        if (loggedUser && selectedContact)
            createDocument("messages", {
                content: message,
                from: loggedUser.uid,
                to: selectedContact.uid,
                status: "sent",
                type: "text",
                created_at: Timestamp,
            })
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
                setImages={setImages}
                setFiles={setFiles}
            />
        </Container>
    )
}
