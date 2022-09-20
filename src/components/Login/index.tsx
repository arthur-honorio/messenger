import React, { useState } from "react"
import { ButtonsContainer } from "./ButtonsContainer"
import { SignUp } from "./Signup"

import { Container } from "./style"

export const Login: React.FC = () => {
    const [showSignUp, setShowSignup] = useState(false)
    
    return (
        <Container>
            <h1>Rav-Messenger</h1>
            <form>
                <input id="email" type="text" placeholder="E-mail" />
                <input id="password" type="password" placeholder="Senha" />
                <ButtonsContainer setShowSignup={setShowSignup} />
            </form>

            {showSignUp && <SignUp />}
        </Container>
    )
}
