import React, { useEffect, useState } from "react"
import { Login } from "../Login"
import { Conversation } from "../Conversation"
import { Dashboard } from "../Dashboard"
import { Container } from "./style"
import { useContactsStore } from "../../states/contacts"
import { useLoggedUserStore } from "../../states/loggedUser"
import { NoChatSelected } from "../NoChatSelected"
import { getOnlineUser } from "../../firebase/authenticationFunctions"

export const Messenger: React.FC = () => {
    const { loggedUser } = useLoggedUserStore(state => state)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        getOnlineUser(setLoading)
    }, [])

    const { selectedContact, contacts } = useContactsStore(state => state)
    if (loggedUser) {
        return (
            <Container className="messenger">
                <Dashboard />
                {selectedContact ? (
                    <Conversation />
                ) : (
                    <NoChatSelected contacts={contacts} />
                )}
            </Container>
        )
    } else {
        if (loading) return <Login loading={loading} />
        return <Login />
    }
}
