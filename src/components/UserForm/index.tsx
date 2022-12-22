import React from "react"
import { IoCloseCircleSharp, IoImages } from "react-icons/io5"
import { UserFormPropsType } from "../../types/types"
import { useLoggedUserStore } from "../../states/loggedUser"

import { ModalContainer } from "../../style/modalStyle"

export const UserForm: React.FC<UserFormPropsType> = ({
    setFormData,
    setShow,
}) => {
    const { loggedUser } = useLoggedUserStore(state => state)
    const handleCancel = () => {
        setFormData(null)
        setShow(false)
    }
    return (
        <ModalContainer>
            <form
                onSubmit={event => {
                    event?.preventDefault()
                    setFormData(event.target as HTMLFormElement)
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
                                placeholder="Criar senha"
                                type="password"
                                name="password"
                                required
                            />
                            <input
                                placeholder="Repetir senha"
                                type="password"
                                name="retypePassword"
                                required
                            />
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
                            required
                        />
                        <input
                            placeholder={`${loggedUser?.position || "Cargo"}`}
                            type="text"
                            name="position"
                            required
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
                    <button type="submit">Salvar</button>
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
