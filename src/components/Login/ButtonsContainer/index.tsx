import React from "react"
import { signIn } from "../../../firebase"
import { useLoggedUserStore } from "../../../states/loggedUser"
import { useSnackbarStore } from "../../../states/snackbar"

import { Container } from "./style"

type ButtonsContainerProps = {
    setShowSignup: (arg0: boolean) => void
}

export const ButtonsContainer: React.FC<ButtonsContainerProps> = ({
    setShowSignup,
}) => {
    const handleLogInClick = async (event: React.MouseEvent) => {
        event.preventDefault()
        let htmlElements: HTMLCollectionOf<HTMLInputElement> =
            document.getElementsByTagName("input")
        let email = htmlElements[0]?.value
        let password = htmlElements[1]?.value

        if (email && password) {
            const user = await signIn(email, password)
            if (typeof user === "object") {
                useLoggedUserStore.setState({ currentUser: user })
                useSnackbarStore.setState({
                    open: true,
                    message: `Usuário logado: ${user.user.email}`,
                    type: "success",
                })
            } else if (user === "user-not-found") {
                useSnackbarStore.setState({
                    open: true,
                    message: "Usuário não existe",
                    type: "warning",
                })
            }
        }
    }

    const handleSignUpClick = (event: React.MouseEvent) => {
        event.preventDefault()
        setShowSignup(true)
    }

    return (
        <Container>
            <button onClick={handleLogInClick}>Entrar</button>
            <button onClick={handleSignUpClick}>Criar conta</button>
        </Container>
    )
}
