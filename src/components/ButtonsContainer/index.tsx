import React, { useState } from "react"
import { signIn } from "../../firebase/authenticationFunctions"
import { ActionButton } from "../ActionButton"

import { Container } from "./style"

type ButtonsContainerProps = {
    setShowSignUp: (arg0: boolean) => void
    isLoading: boolean
    loadingSuccedded: boolean
}

export const ButtonsContainer: React.FC<ButtonsContainerProps> = ({
    setShowSignUp,
    isLoading,
    loadingSuccedded,
}) => {
    const handleSignUpClick = (event: React.MouseEvent) => {
        event.preventDefault()
        setShowSignUp(true)
    }

    return (
        <Container>
            <ActionButton
                isLoading={isLoading}
                loadingSuccedded={loadingSuccedded}
                buttonContent="Entrar"
                buttonType="submit"
            />
            <button
                className="alt-button"
                onClick={handleSignUpClick}
                type="button"
            >
                Criar conta
            </button>
        </Container>
    )
}
