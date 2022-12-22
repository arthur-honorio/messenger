import React from "react"
import moment from "moment"

import { Container, MessageAndIconContainer, MessageContainer } from "./style"
import { MessageStatusIcon } from "./MessageStatusIcons"
import { MessageItemPropsTypes } from "../../../../../types/types"

export const MessageItem: React.FC<MessageItemPropsTypes> = ({ message }) => {
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
