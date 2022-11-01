import React, { useEffect, useState } from "react"
import { getAuth, updateProfile } from "firebase/auth"
import { useAuthState } from "react-firebase-hooks/auth"
import { createDocument, uploadImage } from "../../../firebase"

import { ModalContainer } from "../../../style/modalStyle"
import { IoCloseCircleSharp } from "react-icons/io5"

type UserEditionModalProps = {
    show: boolean
    setShow: (arg0: boolean) => void
}

type dataToAddType = {
    displayName: string
    photoURL: string | null
}

export const UserEditionModal: React.FC<UserEditionModalProps> = ({
    show,
    setShow,
}) => {
    const [user] = useAuthState(getAuth())
    const [hasToWaitImage, setHasToWaitImage] = useState(false)
    const [photoURL, setPhotoURL] = useState("")

    const awaitImage = (dataToAdd: dataToAddType) => {
        let timeout
        if (user) {
            clearTimeout(timeout)
            console.log("hasToWaitImage", hasToWaitImage, "photoURL", photoURL)
            if (hasToWaitImage && !!!photoURL) {
                timeout = setTimeout(() => awaitImage(dataToAdd), 1000)
            } else {
                updateProfile(user, dataToAdd)
                    .then(async () => {
                        createDocument("users", dataToAdd, user.uid).then(() =>
                            setShow(false)
                        )
                    })
                    .catch(error => {
                        console.log(Object.entries(error))
                    })
            }
        }
    }

    const handleSave = async (target: HTMLFormElement) => {
        const data = new FormData(target)
        const { userName, file } = Object.fromEntries(data.entries())
        const newFile = file as { name: string }
        console.log(newFile.name)
        if (newFile.name) {
            setHasToWaitImage(true)
            uploadImage(file, setPhotoURL)
        }

        let dataToAdd: dataToAddType = {} as dataToAddType
        if (userName) dataToAdd.displayName = userName.toString()
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
                    <label
                        htmlFor="file_uploader"
                        className="fake-button"
                        onChange={console.log}
                    >
                        <span>Selecionar avatar</span>
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
