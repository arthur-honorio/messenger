import React from "react"
import { RiCheckDoubleLine, RiCheckLine } from "react-icons/ri"
import { Container } from "./style"

export const MessageStatusIcon: React.FC = () => {
    return (
        <Container>
            <RiCheckDoubleLine color={"blue"} size={20}/>
            <RiCheckDoubleLine size={20}/>
            <RiCheckLine size={20}/>
        </Container>
    )
}
