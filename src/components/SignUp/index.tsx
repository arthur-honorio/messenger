import React, { useEffect, useState } from "react"
import { signUp } from "../../firebase/authenticationFunctions"
import { signUpComponentPropsType } from "../../types/types"
import { UserForm } from "../UserForm"

export const SignUp: React.FC<signUpComponentPropsType> = ({
    setShowSignUp,
}) => {
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
