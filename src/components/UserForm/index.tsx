import React, { useState } from "react"
import { IoCloseCircleSharp, IoEye, IoEyeOff, IoImages } from "react-icons/io5"
import { UserFormPropsType } from "../../types/types"
import { useLoggedUserStore } from "../../states/loggedUser"

import { ModalContainer } from "../../style/modalStyle"

export const UserForm: React.FC<UserFormPropsType> = ({
    setFormData,
    setShow,
}) => {
    const { loggedUser } = useLoggedUserStore(state => state)
    const [password, setPassword] = useState<string | null>(null)
    const [compare, setCompare] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [equalPasswords, setEqualPasswords] = useState<boolean | null>(null)
    const handleCancel = () => {
        setFormData(null)
        setShow(false)
    }

    function comparePasswords(startCompare: boolean, repeated: string) {
        if (startCompare && repeated === password && password && repeated)
            setEqualPasswords(true)
        else setEqualPasswords(false)
    }

    return (
        <ModalContainer>
            <form
                onSubmit={event => {
                    event?.preventDefault()
                    setFormData(event.currentTarget)
                }}
            >
                <h2>{`${loggedUser ? "Editar usuário" : "Criar conta"}`}</h2>
                <IoCloseCircleSharp onClick={handleCancel} />
                {!loggedUser ? (
                    <>
                        <input
                            placeholder="E-mail"
                            type="email"
                            name="email"
                            required
                        />
                        <div className="password">
                            <input
                                className={`passwords${
                                    !compare
                                        ? " blank"
                                        : equalPasswords === true
                                        ? " match"
                                        : " error"
                                }`}
                                placeholder="Criar senha"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                required
                                onChange={e => {
                                    const value = e.currentTarget.value
                                    setPassword(value)
                                }}
                            />
                            <input
                                className={`passwords${
                                    !compare
                                        ? " blank"
                                        : equalPasswords === true
                                        ? " match"
                                        : " error"
                                }`}
                                onChange={e => {
                                    if (compare) {
                                        const value = e.currentTarget.value
                                        comparePasswords(compare, value)
                                    }
                                }}
                                onBlur={e => {
                                    setCompare(true)
                                    const startCompare = true
                                    const value = e.currentTarget.value
                                    comparePasswords(startCompare, value)
                                }}
                                placeholder="Repetir senha"
                                type={showPassword ? "text" : "password"}
                                name="retypePassword"
                                required
                            />
                            {showPassword ? (
                                <IoEyeOff
                                    onClick={() =>
                                        setShowPassword(state => !state)
                                    }
                                />
                            ) : (
                                <IoEye
                                    onClick={() =>
                                        setShowPassword(state => !state)
                                    }
                                />
                            )}
                        </div>
                        <hr />
                    </>
                ) : (
                    <></>
                )}
                <div className="name-position-avatar">
                    <div className="name-position">
                        <input
                            placeholder={`${
                                loggedUser
                                    ? loggedUser?.displayName
                                    : "Nome de usuário"
                            }`}
                            type="text"
                            name="displayName"
                        />
                        <input
                            placeholder={`${loggedUser?.position || "Cargo"}`}
                            type="text"
                            name="position"
                        />
                    </div>
                    <label htmlFor="file_uploader" className="fake-button">
                        {loggedUser?.photoURL ? (
                            <img
                                src={loggedUser.photoURL}
                                alt="Foto do usuário"
                            />
                        ) : (
                            <>
                                + <IoImages />
                            </>
                        )}
                    </label>
                    <input
                        hidden
                        id="file_uploader"
                        accept="image/*"
                        placeholder="Imagem de avatar"
                        type="file"
                        name="file"
                    />
                </div>
                <hr />
                <footer>
                    <button type="submit" disabled={equalPasswords === false}>
                        Salvar
                    </button>
                    <button
                        className="alt-button"
                        type="button"
                        onClick={handleCancel}
                    >
                        Cancelar
                    </button>
                </footer>
            </form>
        </ModalContainer>
    )
}
