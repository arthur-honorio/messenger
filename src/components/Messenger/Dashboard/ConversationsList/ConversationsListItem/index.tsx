import React from "react"
import { ConversationsListItem, ListItemProps } from ".."

import { Container } from "./style"

export type ConversationsListProps = {
    conversationsList: ListItemProps[]
}

export const ConversationsList: React.FC<ConversationsListProps> = ({
    conversationsList,
}) => {
    function renderConversationList(list: ListItemProps[]): React.ReactNode[] {
        return list.map((conversation, index) => (
            <li key={index}>
                <ConversationsListItem {...conversation} />
            </li>
        ))
    }
    return (
        <Container className="conversations-list">
            {renderConversationList(conversationsList)}
        </Container>
    )
}
