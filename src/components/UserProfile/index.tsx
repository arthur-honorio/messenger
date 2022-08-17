import React from "react"
import { UserDetails } from "../UserDetails"

import { Container } from "./style"

export const UserProfile: React.FC = () => {
    return (
        <Container>
            <UserDetails
                isFromProfile
                imageSize={"L"}
                user={{
                    name: "Arthur",
                    position: "Frontend",
                    imageSrc: "",
                    status: "online",
                }}
            />
        </Container>
    )
}
