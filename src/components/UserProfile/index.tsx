import React, { useState } from "react"
import { UserImageAndStatus } from "./UserImageAndStatus"
import { UserInfo } from "./UserInfo"
import { FaPencilAlt, FaSignOutAlt } from "react-icons/fa"
import { getAuth, signOut } from "firebase/auth"
import { useSnackbarStore } from "../../states/snackbar"

import {
    Container,
    UserDetails,
    UserProfileButton,
    UserProfileButtonsContainer,
} from "./style"
import { useAuthState } from "react-firebase-hooks/auth"
import { UserEditionModal } from "./UserEditionModal"

export type UserContainerProps = {
    isFromProfile: boolean
    imgSize: string
}

export const UserProfile: React.FC<UserContainerProps> = ({
    isFromProfile,
    imgSize,
}) => {
    const [user] = useAuthState(getAuth())
    const [editUser, setEditUser] = useState(false)

    const handleSignOut = async () => {
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
                        name: user?.displayName || undefined,
                        imageSrc: user?.photoURL || undefined,
                        status: "online",
                    }}
                />
                <UserInfo
                    user={{
                        name: user?.displayName || undefined,
                        position: "Frontend",
                    }}
                />
            </UserDetails>
            {isFromProfile ? (
                <UserProfileButtonsContainer className="user-buttons">
                    <UserEditionModal show={editUser} />
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
                        onClick={handleSignOut}
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
