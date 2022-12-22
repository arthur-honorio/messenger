import React from "react"
import { MouseEventHandler } from "react"

import { Container, UserStatus, UserImage } from "./style"

export type UserImageAndStatusProps = {
    imageSize: string
    onClick?: MouseEventHandler<HTMLDivElement>
    user: {
        imageSrc: string | undefined
        status: string | JSX.Element | undefined
        name?: string | undefined
    }
}

export const UserImageAndStatus: React.FC<UserImageAndStatusProps> = ({
    imageSize,
    onClick,
    user,
}) => {
    return (
        <Container
            className="user-image-and-status"
            onClick={onClick}
            size={imageSize}
        >
            <UserImage src={user.imageSrc} alt="User" size={imageSize} />
            <UserStatus size={imageSize} status={user.status} />
        </Container>
    )
}
