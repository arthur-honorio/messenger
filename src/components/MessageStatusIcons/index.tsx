import React from "react"
import { RiCheckDoubleLine, RiCheckLine } from "react-icons/ri"
import { Container } from "./style"

export const MessageStatusIcon: React.FC<{ status: string }> = ({ status }) => {
    function getMessageStatus(messageStatus: string) {
        switch (messageStatus) {
            case "read":
                return <RiCheckDoubleLine color={"blue"} size={20} />

            case "received":
                return <RiCheckDoubleLine size={20} />
            default:
                return <RiCheckLine size={20} />
        }
    }
    return <Container>{getMessageStatus(status)}</Container>
}
