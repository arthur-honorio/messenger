import React, { useState } from "react"
import { signUp } from "../../../firebase"
import { IoCloseCircleSharp } from "react-icons/io5"

import { Container } from "./style"

type signUpProps = {
    setShowSignUp: (arg0: boolean) => void
}

export const SignUp: React.FC<signUpProps> = ({ setShowSignUp }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleClick = async () => {
        signUp(email, password)
    }

    return (
        <Container className="signUp">
            <form>
                <IoCloseCircleSharp onClick={() => setShowSignUp(false)} />
                <input
                    onChange={e => setEmail(e.target.value)}
                    type="text"
                    required
                    placeholder="E-mail"
                />
                <input
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    required
                    placeholder="Senha"
                />
                <button type="button" onClick={handleClick}>
                    Criar Conta
                </button>
            </form>
        </Container>
    )
}
