import React from "react"
import { IoPerson } from "react-icons/io5"
import { UserImageAndStatusProps } from "../../types/types"

import { Container, UserStatus, UserImage, UserNoImage } from "./style"

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
            {user?.imageSrc ? (
                <UserImage src={user?.imageSrc} alt="User" size={imageSize} />
            ) : (
                <UserNoImage size={imageSize}>
                    <IoPerson />
                </UserNoImage>
            )}

            <UserStatus size={imageSize} status={user.status} />
        </Container>
    )
}
