import React from "react"
import { IoImage, IoMic } from "react-icons/io5"
import { contactPropsTypes, LastMessagePropsTypes } from "../../types/types"

import { Container } from "./style"

export const UserInfo: React.FC<{
    user: contactPropsTypes
    isFromProfile?: boolean
}> = ({ user, isFromProfile }) => {
    function getMessageStatus(lastMessage: LastMessagePropsTypes["message"]) {
        switch (lastMessage?.type) {
            case "image":
                return (
                    <>
                        <IoImage />
                        <span>Foto</span>
                    </>
                )
            case "audio":
                return (
                    <>
                        <IoMic />
                        <span>Áudio</span>
                    </>
                )
            default:
                return lastMessage?.content.slice(0, 15)
        }
    }
    return (
        <Container className="user-info">
            <h5>{user.displayName || user.email.split("@")[0]}</h5>
            <h6>
                {isFromProfile
                    ? user?.position || ""
                    : user?.message
                    ? getMessageStatus(user?.message)
                    : user?.position || ""}
            </h6>
        </Container>
    )
}
