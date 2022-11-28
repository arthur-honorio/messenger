import React, { useState } from "react"
import { getRealtimeData } from "../../../../firebase/firestoreFunctions"
import { contactProps, useLoggedUserStore } from "../../../../states/loggedUser"
import { UserImageAndStatus } from "../../../UserProfile/UserImageAndStatus"

import { Container } from "./style"

// export type ListItemProps = {
//     user: { imageSrc: string; status: string; name: string; talking: boolean }
//     last_message: string
//     last_message_date: string | Date
//     unread_messages_count: number
// }

export const ConversationsList: React.FC = () => {
    const loggedUser = useLoggedUserStore(state => state.loggedUser)
    const [conversations, setConversations] = useState({})

    if (!loggedUser?.contacts) {
        return (
            <div className="no-conversations">
                Adicione contatos e comece a conversar
            </div>
        )
    } else {
        const contacts = loggedUser && loggedUser.contacts
        const converstionUids = contacts.map((contact: contactProps) =>
            contact.uid > loggedUser.uid
                ? contact.uid + loggedUser.uid
                : loggedUser.uid + contact.uid
        )
        getRealtimeData(setConversations, "conversations", converstionUids)

        return (
            <Container className="conversations-list-item">
                <UserImageAndStatus
                    imageSize="S"
                    user={{
                        imageSrc: props.user.imageSrc,
                        status: props.user.status,
                        name: props.user.name,
                    }}
                />
                <span className="user-name" />
            </Container>
        )
    }
}
