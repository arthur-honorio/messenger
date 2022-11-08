import React from "react"
import { signIn } from "../../../firebase/authenticationFunctions"

import { Container } from "./style"

type ButtonsContainerProps = {
    setShowSignUp: (arg0: boolean) => void
}

export const ButtonsContainer: React.FC<ButtonsContainerProps> = ({
    setShowSignUp,
}) => {
    const handleLogInClick = async (event: React.MouseEvent) => {
        event.preventDefault()
        let htmlElements: HTMLCollectionOf<HTMLInputElement> =
            document.getElementsByTagName("input")
        let email = htmlElements[0]?.value
        let password = htmlElements[1]?.value

        if (email && password) {
            await signIn(email, password)
        }
    }

    const handleSignUpClick = (event: React.MouseEvent) => {
        event.preventDefault()
        setShowSignUp(true)
    }

    return (
        <Container>
            <button onClick={handleLogInClick}>Entrar</button>
            <button className="alt-button" onClick={handleSignUpClick}>
                Criar conta
            </button>
        </Container>
    )
}
