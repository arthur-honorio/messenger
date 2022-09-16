import React from "react"

import { Container, EditButton, UserDetails } from "./style"
import { UserImageAndStatus } from "./UserImageAndStatus"
import { UserInfo } from "./UserInfo"
import { FaPencilAlt } from "react-icons/fa"

export type UserContainerProps = {
    isFromProfile: boolean
    imgSize: string
}

export const UserProfile: React.FC<UserContainerProps> = ({
    isFromProfile,
    imgSize,
}) => {
    return (
        <Container className="user-profile" isFromProfile={isFromProfile}>
            <UserDetails className="user-details">
                <UserImageAndStatus
                    imageSize={imgSize}
                    user={{
                        name: "Arthur",
                        imageSrc: "",
                        status: "online",
                    }}
                />
                <UserInfo
                    user={{
                        name: "Arthur",
                        position: "Frontend",
                    }}
                />
            </UserDetails>
            {isFromProfile ? (
                <EditButton onClick={() => {}}>
                    <FaPencilAlt />
                </EditButton>
            ) : (
                <></>
            )}
        </Container>
    )
}
