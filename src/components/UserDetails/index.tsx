import React from "react"
import { UserDetailsTypes } from "../../types/types"
import { UserImageAndStatus } from "../UserImageAndStatus"
import { UserInfo } from "../UserInfo"

import { Container } from "./style"

export const UserDetails: React.FC<UserDetailsTypes> = ({
    imgSize,
    user,
    isFromProfile,
    className
}) => {
    return (
        <Container className={className}>
            <UserImageAndStatus imageSize={imgSize} user={user} />
            <UserInfo user={user} isFromProfile={isFromProfile} />
        </Container>
    )
}
