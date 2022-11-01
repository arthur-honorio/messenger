import React, { useState } from "react"
import { ButtonsContainer } from "./ButtonsContainer"
import { SignUp } from "./SignUp"

import { Container } from "./style"

export const Login: React.FC = () => {
    const [showSignUp, setShowSignUp] = useState(false)

    return (
        <>
            {showSignUp && <SignUp setShowSignUp={setShowSignUp} />}
            <Container>
                <h1>Rav-Messenger</h1>
                <form>
                    <input id="email" type="text" placeholder="E-mail" />
                    <input id="password" type="password" placeholder="Senha" />
                    <ButtonsContainer setShowSignUp={setShowSignUp} />
                </form>
            </Container>
        </>
    )
}
