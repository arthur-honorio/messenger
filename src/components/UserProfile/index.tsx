import React from "react"

import {
    Container,
    UserDetails,
    UserProfileButton,
    UserProfileButtonsContainer,
} from "./style"
import { UserImageAndStatus } from "./UserImageAndStatus"
import { UserInfo } from "./UserInfo"
import { FaPencilAlt, FaSignOutAlt } from "react-icons/fa"
import { signOut } from "firebase/auth"
import { useLoggedUserStore } from "../../states/loggedUser"
import { useSnackbarStore } from "../../states/snackbar"

export type UserContainerProps = {
    isFromProfile: boolean
    imgSize: string
}

export const UserProfile: React.FC<UserContainerProps> = ({
    isFromProfile,
    imgSize,
}) => {
    const {auth} = useLoggedUserStore.getState()
    const handleClick = () => {
        signOut(auth).then(() => {
            useLoggedUserStore.setState({ currentUser: undefined })
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
                <UserProfileButtonsContainer>
                    <UserProfileButton onClick={() => {}}>
                        <FaPencilAlt />
                    </UserProfileButton>
                    <UserProfileButton onClick={handleClick}>
                        <FaSignOutAlt />
                    </UserProfileButton>
                </UserProfileButtonsContainer>
            ) : (
                <></>
            )}
        </Container>
    )
}
