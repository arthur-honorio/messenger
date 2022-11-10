import React, { useState } from "react"
import { signIn } from "../../../firebase/authenticationFunctions"
import { ActionButton } from "../../ActionButton"

import { Container } from "./style"

type ButtonsContainerProps = {
    setShowSignUp: (arg0: boolean) => void
}

export const ButtonsContainer: React.FC<ButtonsContainerProps> = ({
    setShowSignUp,
}) => {
    const [isLoading, setISLoading] = useState(false)
    const [loadingSuccedded, setLoadingSuccedded] = useState(false)

    const startLoadingCallback = () => {
        setISLoading(true)
    }

    const conclusionCallback = (success: boolean): void => {
        setISLoading(false)
        success && setLoadingSuccedded(true)
    }

    const handleLogInClick = async (event: React.MouseEvent) => {
        event.preventDefault()
        let htmlElements: HTMLCollectionOf<HTMLInputElement> =
            document.getElementsByTagName("input")
        let email = htmlElements[0]?.value
        let password = htmlElements[1]?.value

        if (email && password) {
            await signIn(
                email,
                password,
                conclusionCallback,
                startLoadingCallback
            )
        }
    }

    const handleSignUpClick = (event: React.MouseEvent) => {
        event.preventDefault()
        setShowSignUp(true)
    }

    return (
        <Container>
            <ActionButton
                isLoading={isLoading}
                loadingSuccedded={loadingSuccedded}
                handleClick={handleLogInClick}
                buttonContent="Entrar"
            />
            <button className="alt-button" onClick={handleSignUpClick}>
                Criar conta
            </button>
        </Container>
    )
}
