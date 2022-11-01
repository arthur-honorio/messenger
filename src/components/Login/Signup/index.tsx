import React from "react"
import { createDocument, signUp } from "../../../firebase"
import { IoCloseCircleSharp } from "react-icons/io5"

import { ModalContainer } from "../../../style/modalStyle"

type signUpProps = {
    setShowSignUp: (arg0: boolean) => void
}

export const SignUp: React.FC<signUpProps> = ({ setShowSignUp }) => {
    async function handleSave(event: HTMLFormElement) {
        const data = new FormData(event)
        const { email, password } = Object.fromEntries(data.entries())
        signUp(email.toString(), password.toString()).then(userCredential => {
            userCredential &&
                createDocument(
                    "users",
                    {
                        email,
                    },
                    userCredential.user.uid
                )
        })
    }

    return (
        <ModalContainer className="signUp">
            <form
                onSubmit={event => {
                    event.preventDefault()
                    handleSave(event.target as HTMLFormElement)
                }}
            >
                <IoCloseCircleSharp onClick={() => setShowSignUp(false)} />
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="E-mail"
                />
                <input
                    name="password"
                    type="password"
                    required
                    placeholder="Senha"
                />
                <button type="submit">Criar Conta</button>
            </form>
        </ModalContainer>
    )
}
