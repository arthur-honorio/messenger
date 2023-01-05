import React from "react"
import moment from "moment"

import { MessageStatusIcon } from "../MessageStatusIcons"
import { MessageItemPropsTypes } from "../../types/types"
import { useLoggedUserStore } from "../../states/loggedUser"

import { Container } from "./style"

export const MessageItem: React.FC<MessageItemPropsTypes> = ({
    message,
    className,
}) => {
    const { loggedUser } = useLoggedUserStore(state => state)
    const isUserLoggedIn = message.from === loggedUser?.uid

    // {message.type !== "text" ? (
    //     message.type === "audio" ? (
    //         "audio"
    //     ) : message.type === "video" ? (
    //         "video"
    //     ) : message.type === "file" ? (
    //         "file"
    //     ) : (
    //         "image"
    //     )
    // ) : (
    //     <span>{message.content}</span>
    // )}

    return (
        <Container
            className={`${isUserLoggedIn ? "box-logged" : "box"} ${className}`}
            isUserLoggedIn={isUserLoggedIn}
        >
            <span>{message.content}</span>
            <span className="message-time-status">
                <span>{moment(message.created_at).format("HH:mm")}</span>
                {isUserLoggedIn && (
                    <MessageStatusIcon status={message.status} />
                )}
            </span>
        </Container>
    )
}
