import React, { useEffect, useState } from "react"
import { signUp } from "../../../firebase/authenticationFunctions"
import { UserForm } from "../../UserProfile/UserForm"

type signUpProps = {
    setShowSignUp: (arg0: boolean) => void
}

export const SignUp: React.FC<signUpProps> = ({ setShowSignUp }) => {
    const [formData, setFormData] = useState<HTMLFormElement | null>(null)

    useEffect(() => {
        if (formData) {
            const { email, password, photoURL, displayName, position } =
                Object.fromEntries(formData.entries())

            signUp(
                email.toString(),
                password.toString(),
                photoURL.toString(),
                displayName.toString(),
                position.toString()
            )
        }
    }, [formData])

    return <UserForm setShow={setShowSignUp} setFormData={setFormData} />
}
