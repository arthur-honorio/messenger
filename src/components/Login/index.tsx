import React, { useState } from "react"
import { ButtonsContainer } from "../ButtonsContainer"
import { LoadingIcon } from "../LoadingIcon"
import { UserForm } from "../UserForm"

import { Container } from "./style"

export const Login: React.FC<{ loading?: boolean }> = ({ loading }) => {
    const [showSignUp, setShowSignUp] = useState(false)

    if (loading) {
        return (
            <Container className="online-user-search">
                <h1>Rav-Messenger</h1>
                <h2>Buscando usuário logado</h2>
                <LoadingIcon />
            </Container>
        )
    }
    return (
        <>
            {showSignUp && (
                <UserForm show={showSignUp} setShow={setShowSignUp} />
            )}
            <Container>
                <h1>Rav-Messenger</h1>
                <form>
                    <h2>Entrar</h2>
                    <input id="email" type="text" placeholder="E-mail" />
                    <input id="password" type="password" placeholder="Senha" />
                    <ButtonsContainer setShowSignUp={setShowSignUp} />
                </form>
            </Container>
        </>
    )
}
