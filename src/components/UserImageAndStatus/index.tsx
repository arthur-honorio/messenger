import React, { useEffect, useState } from "react"
import { IoPerson } from "react-icons/io5"
import { getRealtimeData } from "../../firebase/firestoreFunctions"
import { UserImageAndStatusProps, userPropsTypes } from "../../types/types"

import { Container, UserStatus, UserImage, UserNoImage } from "./style"

export const UserImageAndStatus: React.FC<UserImageAndStatusProps> = ({
    imageSize,
    onClick,
    user,
}) => {
    const [userStatus, setUserStatus] = useState(undefined)

    const setUserStatusRealtime = (data: userPropsTypes) => {
        setUserStatus(data.status)
    }

    useEffect(() => {
        getRealtimeData(setUserStatusRealtime, "users", user.uid)
    }, [])

    return (
        <Container
            className="user-image-and-status"
            onClick={onClick}
            size={imageSize}
        >
            {user?.photoURL ? (
                <UserImage src={user?.photoURL} alt="User" size={imageSize} />
            ) : (
                <UserNoImage size={imageSize}>
                    <IoPerson />
                </UserNoImage>
            )}

            <UserStatus size={imageSize} status={userStatus} />
        </Container>
    )
}
