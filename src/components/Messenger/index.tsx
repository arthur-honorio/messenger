import React, { useEffect } from "react"
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
    
    useEffect(() => {
        getOnlineUser()
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
        return <Login />
    }
}
