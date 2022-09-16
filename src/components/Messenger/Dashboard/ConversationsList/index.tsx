import React from "react"
import { UserImageAndStatus } from "../../../UserProfile/UserImageAndStatus"

import { Container } from "./style"

export type ListItemProps = {
    user: { imageSrc: string; status: string; name: string }
    last_message: string
    last_message_date: string | Date
    status: string
    unread_messages_count: number
    message_status: string
}

export const ConversationsListItem: React.FC<ListItemProps> = ({
    ...props
}) => {
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
        </Container>
    )
}
