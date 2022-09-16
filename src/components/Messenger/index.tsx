import moment from "moment"
import React from "react"
import { Conversation } from "./Conversation"
import { Dashboard } from "./Dashboard"
import { Container } from "./style"

export const Messenger: React.FC = () => {
    return (
        <Container className="messenger">
            <Dashboard />
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
        </Container>
    )
}
