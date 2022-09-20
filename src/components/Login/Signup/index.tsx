import React from "react"
import { signUp } from "../../../firebase"

import { Container } from "./style"

export const SignUp: React.FC = () => {
    const handleClick = async (event: React.MouseEvent) => {
        event.preventDefault()
        let htmlElements: HTMLCollectionOf<HTMLInputElement> =
            document.getElementsByTagName("input")
        let email = htmlElements[0]?.value
        let password = htmlElements[1]?.value
        const user = await signUp(email, password)
        console.log(user)
    }
    
    return (
        <Container className="signup">
            <form>
                <input type="text" required placeholder="E-mail" />
                <input type="password" required placeholder="Senha" />
                <button type="button" onClick={handleClick}>
                    Criar Conta
                </button>
            </form>
        </Container>
    )
}
