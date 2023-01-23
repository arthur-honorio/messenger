import React from "react"
import { MessagePropsTypes, MessagesListPropsTypes } from "../../types/types"
import { MessageItem } from "../MessageItem"

import { Container } from "./style"

export const MessagesList: React.FC<MessagesListPropsTypes> = ({
    messages,
}) => {
    const classCreator = (index: number, messages: MessagePropsTypes[]) => {
        if (
            (!messages[index - 1] && !messages[index + 1]) ||
            (messages[index - 1] &&
                messages[index + 1] &&
                messages[index].from !== messages[index - 1].from &&
                messages[index].from !== messages[index + 1].from) ||
            (messages[index - 1] &&
                !messages[index + 1] &&
                messages[index].from !== messages[index - 1].from) ||
            (messages[index + 1] &&
                !messages[index - 1] &&
                messages[index].from !== messages[index + 1].from)
        ) {
            return "only-message"
        } else if (
            !messages[index - 1] ||
            messages[index].from !== messages[index - 1].from
        ) {
            return "first-message"
        } else if (
            !messages[index + 1] ||
            messages[index].from !== messages[index + 1].from
        ) {
            return "last-message"
        } else return "same-creator"
    }

    return (
        <Container className="messages-list">
            {messages?.map((message: MessagePropsTypes, index: number) => {
                return (
                    <MessageItem
                        key={`${message.created_at}`}
                        className={classCreator(
                            index,
                            messages as MessagePropsTypes[]
                        )}
                        message={message}
                    />
                )
            })}
        </Container>
    )
}
