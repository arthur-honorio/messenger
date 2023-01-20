import React, { useState } from "react"
import { signIn } from "../../firebase/authenticationFunctions"
import { ButtonsContainer } from "../ButtonsContainer"
import { LoadingIcon } from "../LoadingIcon"
import { UserForm } from "../UserForm"

import { Container } from "./style"

export const Login: React.FC<{ loading?: boolean }> = ({ loading }) => {
    const [showSignUp, setShowSignUp] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [loadingSuccedded, setLoadingSuccedded] = useState(false)

    if (loading) {
        return (
            <Container className="online-user-search">
                <h1>Rav-Messenger</h1>
                <h2>Buscando usuário logado</h2>
                <LoadingIcon />
            </Container>
        )
    }

    const startLoadingCallback = () => {
        setIsLoading(true)
    }

    const conclusionCallback = (success: boolean): void => {
        setIsLoading(false)
        success && setLoadingSuccedded(true)
    }

    const handleLogInSubmit = async (target: HTMLFormElement) => {
        const data = new FormData(target)
        const { email, password } = Object.fromEntries(data) as {
            email: string
            password: string
        }

        if (email && password) {
            signIn(email, password, conclusionCallback, startLoadingCallback)
        }
    }
    return (
        <>
            {showSignUp && (
                <UserForm show={showSignUp} setShow={setShowSignUp} />
            )}
            <Container>
                <h1>Rav-Messenger</h1>
                <form
                    onSubmit={event => {
                        event?.preventDefault()
                        handleLogInSubmit(event.currentTarget)
                    }}
                >
                    <h2>Entrar</h2>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        placeholder="E-mail"
                    />
                    <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Senha"
                    />
                    <ButtonsContainer
                        setShowSignUp={setShowSignUp}
                        isLoading={isLoading}
                        loadingSuccedded={loadingSuccedded}
                    />
                </form>
            </Container>
        </>
    )
}
