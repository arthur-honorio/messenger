import React, { useEffect, useState } from "react"
import { Login } from "../Login"
import { Conversation } from "../Conversation"
import { Dashboard } from "../Dashboard"
import { Container } from "./style"
import { useContactsStore } from "../../states/contacts"
import { useLoggedUserStore } from "../../states/loggedUser"
import { NoChatSelected } from "../NoChatSelected"
import { getOnlineUser } from "../../firebase/authenticationFunctions"
import { Unsubscribe } from "firebase/firestore"
import { getRealtimeData } from "../../firebase/firestoreFunctions"

export const Messenger: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { loggedUser, setLoggedUser } = useLoggedUserStore(state => state)
    const { setContacts } = useContactsStore(state => state)

    useEffect(() => {
        getOnlineUser(setLoading)
        let unsub: null | Unsubscribe | void = null
        if (loggedUser) {
            unsub = getRealtimeData(setLoggedUser, "users", loggedUser.uid)
            setContacts(loggedUser.contacts)
        }
        if (unsub) {
            return () => {
                if (unsub) unsub()
            }
        }
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
