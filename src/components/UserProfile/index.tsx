import React, { useState } from "react"
import { UserImageAndStatus } from "./UserImageAndStatus"
import { UserInfo } from "./UserInfo"
import { getAuth, signOut } from "firebase/auth"
import { useSnackbarStore } from "../../states/snackbar"
import { UserEditionModal } from "./UserEditionModal"
import { Tooltip } from "@mui/material"
import { AddContactModal } from "./AddContactModal"

import { IoPersonAdd, IoPencilSharp, IoLogOut } from "react-icons/io5"
import {
    Container,
    UserDetails,
    UserProfileButton,
    UserProfileButtonsContainer,
} from "./style"
import { useLoggedUserStore } from "../../states/loggedUser"
import { updateDocument } from "../../firebase/firestoreFunctions"

export type UserContainerProps = {
    isFromProfile: boolean
    imgSize: string
}

export const UserProfile: React.FC<UserContainerProps> = ({
    isFromProfile,
    imgSize,
}) => {
    const { loggedUser } = useLoggedUserStore(state => state)
    const [editUser, setEditUser] = useState(false)
    const [addContact, setAddContact] = useState(false)
    const { setLoggedUser } = useLoggedUserStore(state => state)

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
                        name: loggedUser?.displayName || undefined,
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
