import { MessagePropsTypes } from "../../../types/types"
import { MessageInput } from "./MessageInput"
import { MessagesHeader } from "./MessagesHeader"
import { MessagesList } from "./MessagesList"
import { MessageProps } from "./MessagesList/MessageItem"

import { Container } from "./style"

type ConversationProps = {
    messages: MessageProps[]
}

    const orderedMessages: MessagePropsTypes[] = messages.sort(
        (a: MessagePropsTypes, b: MessagePropsTypes) => {
            return a.created_at > b.created_at ? -1 : 1
        }
    )
    return (
        <Container className="conversation">
            <MessagesHeader />
            <hr />
            <MessagesList messages={orderedMessages} />
            <hr />
            <MessageInput />
        </Container>
    )
}
