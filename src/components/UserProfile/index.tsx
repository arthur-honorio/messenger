import React, { useState } from "react"
import { getAuth, signOut } from "firebase/auth"
import { useSnackbarStore } from "../../states/snackbar"
import { Tooltip } from "@mui/material"
import { AddContactModal } from "./AddContactModal"

import { IoPersonAdd, IoPencilSharp, IoLogOut } from "react-icons/io5"
import { useLoggedUserStore } from "../../states/loggedUser"
import { updateDocument } from "../../firebase/firestoreFunctions"
import { UserImageAndStatus } from "../UserImageAndStatus"
import { UserInfo } from "../UserInfo"
import { UserForm } from "../UserForm"

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
    const { loggedUser, setLoggedUser } = useLoggedUserStore(state => state)
    const [editUser, setEditUser] = useState(false)
    const [addContact, setAddContact] = useState(false)

    const handleSignOut = async () => {
        signOut(getAuth()).then(() => {
            setLoggedUser(null)
            loggedUser &&
                updateDocument("users", { status: " offline" }, loggedUser.uid)
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
                        name: loggedUser?.displayName || undefined,
                        imageSrc: loggedUser?.photoURL || undefined,
                        status: "online",
                    }}
                />
                <UserInfo
                    user={{
                        name:
                            loggedUser?.displayName ||
                            loggedUser?.email.split("@")[0],
                        position: loggedUser?.position || undefined,
                    }}
                />
            </UserDetails>
            {isFromProfile ? (
                <>
                    <AddContactModal
                        show={addContact}
                        setShow={setAddContact}
                    />
                    <UserProfileButtonsContainer className="user-buttons">
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
                        <UserForm show={editUser} setShow={setEditUser} />
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
