import React from "react"

import { Container, UserStatus, UserImage } from "./style"

export type UserImageAndStatusProps = {
    imageSize: string
    user: {
        imageSrc: string
        status: string
    }
}

export const UserImageAndStatus: React.FC<UserImageAndStatusProps> = ({
    imageSize,
    user,
}) => {
    return (
        <Container size={imageSize}>
            <UserImage src={user.imageSrc} alt="User" size={imageSize} />
            <UserStatus size={imageSize} status={user.status} />
        </Container>
    )
}
