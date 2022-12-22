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
                <h2>Editar usuário</h2>
                <IoCloseCircleSharp onClick={handleCancel} />
                {!loggedUser ? (
                    <>
                        <input
                            placeholder="E-mail"
                            type="email"
                            name="email"
                            required
                        />
                        <input
                            placeholder="Criar senha"
                            type="password"
                            name="password"
                            required
                        />
                    </>
                ) : (
                    <></>
                )}
                <input
                    placeholder="Nome"
                    type="text"
                    name="displayName"
                    required
                />
                <input
                    placeholder="Cargo"
                    type="text"
                    name="position"
                    required
                />
                <label htmlFor="file_uploader" className="fake-button">
                    <span>Selecionar avatar</span>
                    <IoImages />
                </label>
                <input
                    hidden
                    id="file_uploader"
                    accept="image/*"
                    placeholder="Imagem de avatar"
                    type="file"
                    name="file"
                />
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
