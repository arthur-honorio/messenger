import moment from "moment"
import React from "react"
import { IoCheckmark, IoCheckmarkDone, IoImage, IoMic } from "react-icons/io5"
import { contactPropsTypes, LastMessagePropsTypes } from "../../types/types"

import { Container } from "./style"

export const UserInfo: React.FC<{
    user: contactPropsTypes
    isFromProfile?: boolean
}> = ({ user, isFromProfile }) => {
    const getMessageStatus = (status: string) => {
        switch (status) {
            case "sent":
                return <IoCheckmark color="gray" />
            case "received":
                return <IoCheckmarkDone color="gray" />
            default:
                return <IoCheckmarkDone color="blue" />
        }
    }
    const getMessageByType = (
        lastMessage: LastMessagePropsTypes["message"]
    ) => {
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
                return lastMessage?.status?.includes("typing") ? (
                    "Digitando..."
                ) : lastMessage?.status?.includes("recording") ? (
                    "Gravando áudio..."
                ) : (
                    <>
                        <span>{lastMessage?.content}</span>
                        <span>{getMessageStatus(lastMessage?.status)}</span>
                    </>
                )
        }
    }
    return (
        <Container className="user-info">
            <div className="displayName-time">
                <h5>{user.displayName || user.email.split("@")[0]}</h5>
                <span>
                    {!isFromProfile &&
                        moment(user?.message?.created_at).format("HH:mm")}
                </span>
            </div>
            <div className="position-lastMessage">
                {isFromProfile ? (
                    <p>{user?.position || ""}</p>
                ) : (
                    getMessageByType(user?.message)
                )}
            </div>
        </Container>
    )
}
