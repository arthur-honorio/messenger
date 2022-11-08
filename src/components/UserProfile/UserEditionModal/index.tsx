import React, { useEffect, useState } from "react"
import { updateDocument } from "../../../firebase/firestoreFunctions"

import { ModalContainer } from "../../../style/modalStyle"
import { IoCloseCircleSharp, IoImages } from "react-icons/io5"
import { useLoggedUserStore } from "../../../states/loggedUser"

type UserEditionModalProps = {
    show: boolean
    setShow: (arg0: boolean) => void
}

type dataToAddType = {
    displayName: string
    photoURL: string | null
    position: string
}

export const UserEditionModal: React.FC<UserEditionModalProps> = ({
    show,
    setShow,
}) => {
    const { loggedUser, setLoggedUser } = useLoggedUserStore(state => state)
    const [hasToWaitImage, setHasToWaitImage] = useState(false)
    const [photoURL, setPhotoURL] = useState("")

    const awaitImage = (dataToAdd: dataToAddType) => {
        let timeout
        if (loggedUser && loggedUser.email) {
            clearTimeout(timeout)
            if (hasToWaitImage && !!!photoURL) {
                timeout = setTimeout(() => awaitImage(dataToAdd), 1000)
            } else {
                try {
                    updateDocument(
                        "users",
                        dataToAdd,
                        loggedUser.email.toString()
                    )
                    setLoggedUser({ ...loggedUser, ...dataToAdd })
                } catch (err: any) {
                    console.log(err.message)
                    console.log(Object.entries(err))
                }
            }
        }
    }

    const handleSave = async (target: HTMLFormElement) => {
        const data = new FormData(target)
        const { userName, file, position } = Object.fromEntries(data.entries())
        const newFile = file as { name: string }
        if (newFile.name) {
            setHasToWaitImage(true)
            uploadImage(file, setPhotoURL)
        }

        let dataToAdd: dataToAddType = {} as dataToAddType
        if (userName) dataToAdd.displayName = userName.toString()
        if (position) dataToAdd.position = position.toString()
        if (photoURL) dataToAdd.photoURL = photoURL
        awaitImage(dataToAdd)
    }

    useEffect(() => {
        const closeOnEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setPhotoURL("")
                setShow(false)
                cancelEdit()
            }
        }

        if (show) {
            window.addEventListener("keydown", closeOnEsc)
        }

        return () => {
            setPhotoURL("")
            setHasToWaitImage(false)
            window.removeEventListener("keydown", closeOnEsc)
        }
    }, [show])

    const cancelEdit = () => {
        setPhotoURL("")
        setShow(false)
    }

    if (show) {
        return (
            <ModalContainer>
                <form
                    onSubmit={event => {
                        event?.preventDefault()
                        handleSave(event.target as HTMLFormElement)
                    }}
                >
                    <h2>Editar usuário</h2>
                    <IoCloseCircleSharp onClick={() => setShow(false)} />
                    <input
                        placeholder="Nome de usuário"
                        type="text"
                        name="userName"
                    />
                    <input placeholder="Cargo" type="text" name="position" />
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
                            onClick={() => {}}
                        >
                            Cancelar
                        </button>
                    </footer>
                </form>
            </ModalContainer>
        )
    } else {
        return <></>
    }
}
