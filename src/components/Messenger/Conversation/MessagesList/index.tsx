import {
    MessagePropsTypes,
    MessagesListPropsTypes,
} from "../../../../types/types"

import { Container } from "./style"

export const MessagesList: React.FC<MessagesListPropsTypes> = ({ messages }) => {
    return (
        <Container className="messages-list">
            <ul>
                {messages.map((message: MessagePropsTypes) => (
                    <MessageItem message={message} />
                ))}
            </ul>
        </Container>
    )
}
