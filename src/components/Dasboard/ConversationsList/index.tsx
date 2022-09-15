import React from "react"

import { Container } from "./style"

export type ListItemProps = {
    user: string
    last_message: string
    last_message_date: string | Date
    status: string
    unread_messages_count: number
    message_status: string
}

export type ConversationsListProps = {
    conversationsList: ListItemProps[]
}

export const ConversationsList: React.FC<ConversationsListProps> = ({
    conversationsList,
}) => {
    function renderConversationList(list: ListItemProps[]): React.ReactNode[] {
        return list.map(conversation => (
            <li>
                <ConversationsListItem {...conversation} />
            </li>
        ))
    }
    return <Container>{renderConversationList(conversationsList)}</Container>
}
