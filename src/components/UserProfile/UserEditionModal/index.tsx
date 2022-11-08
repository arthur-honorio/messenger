import React, { useEffect, useState } from "react"
import { updateDocument } from "../../../firebase/firestoreFunctions"

import { ModalContainer } from "../../../style/modalStyle"
import { IoCloseCircleSharp, IoImages } from "react-icons/io5"
import { useLoggedUserStore } from "../../../states/loggedUser"
import { useSnackbarStore } from "../../../states/snackbar"
import { uploadFiles } from "../../../firebase/uploadFiles"

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
    const [allowedToUpload, setAllowedToUpload] = useState(false)
    const [photoURL, setPhotoURL] = useState("")

    useEffect(() => {
        if (hasToWaitImage && !!photoURL) {
            setAllowedToUpload(true)
        }
    }, [photoURL, hasToWaitImage])

    const getDataToAdd = (data: FormData): dataToAddType | undefined => {
        if (data) {
            const { userName, file, position } = Object.fromEntries(
                data.entries()
            )
            const newFile = file as { name: string; size: number }
            if (newFile.name) {
                if (newFile.size > 1024 * 2) {
                    useSnackbarStore.setState({
                        open: true,
                        message: "Imagem deve ter no máximo 2mb",
                        type: "error",
                    })
                    return
                }
                setHasToWaitImage(true)
                uploadFiles(file, setPhotoURL)
            }

            let dataToAdd: dataToAddType = {} as dataToAddType
            if (userName) dataToAdd.displayName = userName.toString()
            if (position) dataToAdd.position = position.toString()
            if (photoURL) dataToAdd.photoURL = photoURL

            return dataToAdd
        }
    }

    const handleSave = async (target: HTMLFormElement) => {
        const data = new FormData(target)
        const dataToAdd = getDataToAdd(data)

        if (allowedToUpload) {
            if (loggedUser && loggedUser.email && dataToAdd)
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
                } finally {
                    setAllowedToUpload(false)
                }
        }
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
