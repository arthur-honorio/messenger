import moment from "moment"
import React from "react"
import { Login } from "../Login"
import { Conversation } from "./Conversation"
import { Dashboard } from "./Dashboard"
import { Container } from "./style"
import { useAuthState } from "react-firebase-hooks/auth"
import { getAuth } from "firebase/auth"
import { useContactsStore } from "../../states/contacts"
import { NoChatSelected } from "./Conversation/NoChatSelected"

export const Messenger: React.FC = () => {
    const [user] = useAuthState(getAuth())
    const { selectedContact, contacts } = useContactsStore.getState()
    if (user) {
        return (
            <Container className="messenger">
                <Dashboard />
                {selectedContact ? (
                    <Conversation
                        messages={[
                            {
                                created_at: moment(),
                                from: "Arthur",
                                status: "read",
                                type: "text",
                                content:
                                    "Mensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de teste",
                            },
                            {
                                created_at: moment(),
                                from: "Marilia",
                                status: "sent",
                                type: "text",
                                content: "Mensagem de teste",
                            },
                            {
                                created_at: moment().subtract(1, "days"),
                                from: "Arthur",
                                status: "read",
                                type: "text",
                                content:
                                    "Mensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de testeMensagem de teste",
                            },
                            {
                                created_at: moment().subtract(10, "days"),
                                from: "Marilia",
                                status: "sent",
                                type: "text",
                                content: "Mensagem de teste",
                            },
                        ]}
                    />
                ) : (
                    <NoChatSelected contacts={contacts} />
                )}
            </Container>
        )
    } else {
        return <Login />
    }
}
