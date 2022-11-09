import React, { useState } from "react"
import { UserImageAndStatus } from "./UserImageAndStatus"
import { UserInfo } from "./UserInfo"
import { FaPencilAlt, FaSignOutAlt } from "react-icons/fa"
import { getAuth, signOut } from "firebase/auth"
import { useSnackbarStore } from "../../states/snackbar"
import { useAuthState } from "react-firebase-hooks/auth"
import { UserEditionModal } from "./UserEditionModal"
import { Tooltip } from "@mui/material"
import { AddContactModal } from "./AddContactModal"

import {
    Container,
    UserDetails,
    UserProfileButton,
    UserProfileButtonsContainer,
} from "./style"

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
    const [addContact, setAddContact] = useState(false)

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
                <>
                    <AddContactModal
                        show={addContact}
                        setShow={setAddContact}
                    />
                    <Tooltip title="Adicionar contato">
                        <UserProfileButton
                            className="add-contacts"
                            onClick={() => {
                                setAddContact(true)
                            }}
                        >
                            <IoPersonAdd />
                        </UserProfileButton>
                    </Tooltip>
                    <UserProfileButtonsContainer className="user-buttons">
                        <UserEditionModal
                            show={editUser}
                            setShow={setEditUser}
                        />
                        <Tooltip title="Editar usuário">
                            <UserProfileButton
                                className="user-edit"
                                onClick={() => {
                                    setEditUser(true)
                                }}
                            >
                                <IoPencilSharp />
                            </UserProfileButton>
                        </Tooltip>
                        <Tooltip title="Sair">
                            <UserProfileButton
                                className="user-signout"
                                onClick={handleSignOut}
                            >
                                <IoLogOut />
                            </UserProfileButton>
                        </Tooltip>
                    </UserProfileButtonsContainer>
                </>
            ) : (
                <></>
            )}
        </Container>
    )
}
