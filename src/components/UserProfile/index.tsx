import React, { useState } from "react"
import { UserImageAndStatus } from "./UserImageAndStatus"
import { UserInfo } from "./UserInfo"
import { FaPencilAlt, FaSignOutAlt } from "react-icons/fa"
import { getAuth, signOut } from "firebase/auth"
import { useLoggedUserStore } from "../../states/loggedUser"
import { useSnackbarStore } from "../../states/snackbar"
import { updateProfile } from "firebase/auth"

import {
    Container,
    UserDetails,
    UserProfileButton,
    UserProfileButtonsContainer,
} from "./style"
import { UserEditionModal } from "./UserEditionModal"

export type UserContainerProps = {
    isFromProfile: boolean
    imgSize: string
}

export const UserProfile: React.FC<UserContainerProps> = ({
    isFromProfile,
    imgSize,
}) => {
    const [editUser, setEditUser] = useState(false)

    const handleClick = async () => {
        signOut(getAuth()).then(e => {
            useSnackbarStore.setState({
                open: true,
                message: "Usuário deslogado com sucesso",
                type: "info",
            })
        })
    }
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
                <UserProfileButtonsContainer className="user-buttons">
                    {editUser ? <UserEditionModal /> : <></>}
                    <UserProfileButton
                        className="user-edit"
                        onClick={() => {
                            setEditUser(true)
                        }}
                    >
                        <FaPencilAlt />
                    </UserProfileButton>
                    <UserProfileButton
                        className="user-signout"
                        onClick={handleClick}
                    >
                        <FaSignOutAlt />
                    </UserProfileButton>
                </UserProfileButtonsContainer>
            ) : (
                <></>
            )}
        </Container>
    )
}
