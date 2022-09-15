import React from "react"
import { FaPencilAlt } from "react-icons/fa"

import { Container, EditButton, UserContainer } from "./style"
import { UserImageAndStatus } from "../UserImageAndStatus"
import { UserInfo } from "../UserInfo"

type UserProps = {
    name: string
    position: string
    imageSrc: string
    status: string
}

export type UserDetailsProps = {
    isFromProfile: boolean
    imageSize: string
    user: UserProps
}

export const UserDetails: React.FC<UserDetailsProps> = ({
    isFromProfile,
    imageSize,
    user,
}) => {
    return (
        <Container>
            <UserContainer>
                <UserImageAndStatus imageSize={imageSize} user={user} />
                <UserInfo user={{ ...user }} />
            </UserContainer>
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
