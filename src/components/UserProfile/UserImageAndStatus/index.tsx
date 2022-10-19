import React from "react"

import { Container, UserStatus, UserImage } from "./style"

export type UserImageAndStatusProps = {
    imageSize: string
    user: {
        imageSrc: string | undefined
        status: string | undefined
        name?: string | undefined
    }
}

export const UserImageAndStatus: React.FC<UserImageAndStatusProps> = ({
    imageSize,
    user,
}) => {
    return (
        <Container className="user-image-and-status" size={imageSize}>
            <UserImage src={user.imageSrc} alt="User" size={imageSize} />
            <UserStatus size={imageSize} status={user.status} />
        </Container>
    )
}
