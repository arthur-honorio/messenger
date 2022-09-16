import React from "react"
import moment, { Moment } from "moment"

import { Container, MessageAndIconContainer, MessageContainer } from "./style"
import { MessageStatusIcon } from "./MessageStatusIcons"

export type MessageProps = {
    content?: string
    src?: string
    created_at: Moment | string
    status: string
    type: "audio" | "video" | "text" | "file" | "image"
    from: string
}

export type MessateItemProps = {
    message: MessageProps
}

export const MessageItem: React.FC<MessateItemProps> = ({ message }) => {
    const isUserLoggedIn = !!Math.round(Math.random())
    return (
        <Container className="box" isUserLoggedIn={isUserLoggedIn}>
            <MessageAndIconContainer className="message-and-icon-box" isUserLoggedIn={isUserLoggedIn}>
                {isUserLoggedIn ? <MessageStatusIcon /> : <></>}
                <MessageContainer className="message-box" isUserLoggedIn={isUserLoggedIn}>
                    {message.type !== "text" ? (
                        message.type === "audio" ? (
                            "audio"
                        ) : message.type === "video" ? (
                            "video"
                        ) : message.type === "file" ? (
                            "file"
                        ) : (
                            "image"
                        )
                    ) : (
                        <span>{message.content}</span>
                    )}
                    <span className="message-sent-time">
                        {moment(message.created_at).format("HH:mm")}
                    </span>
                </MessageContainer>
                {isUserLoggedIn ? <></> : <MessageStatusIcon />}
            </MessageAndIconContainer>
        </Container>
    )
}
