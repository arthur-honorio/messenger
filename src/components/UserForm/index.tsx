import React, { useEffect, useState } from "react"
import { IoCloseCircleSharp, IoEye, IoEyeOff, IoImages } from "react-icons/io5"
import { UserEditionPropsType, UserFormPropsType } from "../../types/types"
import { useLoggedUserStore } from "../../states/loggedUser"

import { ModalContainer } from "../../style/modalStyle"
import { useSnackbarStore } from "../../states/snackbar"
import { uploadFiles } from "../../firebase/storageFunctions"
import { updateDocument } from "../../firebase/firestoreFunctions"
import { signUp } from "../../firebase/authenticationFunctions"

export const UserForm: React.FC<UserFormPropsType> = ({ setShow, show }) => {
    const { loggedUser, setLoggedUser } = useLoggedUserStore(state => state)
    const [password, setPassword] = useState<string | null>(null)
    const [newPhoto, setNewPhoto] = useState<{
        photoToShow: string
        photoFile: File | undefined | null
        finalPhotoURL: string
    }>({ photoToShow: "", photoFile: undefined, finalPhotoURL: "" })
    const [compare, setCompare] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [equalPasswords, setEqualPasswords] = useState<boolean | null>(null)

    useEffect(() => {
        const closeOnEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleCancel()
            }
        }

        if (show) {
            window.addEventListener("keydown", closeOnEsc)
        }

        return () => {
            window.removeEventListener("keydown", closeOnEsc)
        }
    }, [show])

    const handleCancel = () => {
        setNewPhoto({
            photoToShow: "",
            photoFile: undefined,
            finalPhotoURL: "",
        })
        setShow(false)
    }

    const getDataToAdd = async (
        data: FormData
    ): Promise<UserEditionPropsType | undefined> => {
        const { displayName, position, email } = Object.fromEntries(data)

        if (data) {
            if (newPhoto?.photoFile) {
                await uploadFiles(newPhoto?.photoFile, url =>
                    setNewPhoto(state => ({ ...state, finalPhotoURL: url }))
                )
            }
            let dataToAdd: UserEditionPropsType = {} as UserEditionPropsType
            if (displayName) dataToAdd.displayName = displayName.toString()
            if (position) dataToAdd.position = position.toString()
            if (password) dataToAdd.password = password.toString()
            if (email) dataToAdd.email = email.toString()
            if (newPhoto.finalPhotoURL)
                dataToAdd.photoURL = newPhoto.finalPhotoURL
            return dataToAdd
        }
    }

    const handleSave = async (target: HTMLFormElement) => {
        const data = new FormData(target)
        const dataToAdd = await getDataToAdd(data)

        if (dataToAdd) {
            if (loggedUser) {
                if (loggedUser.email && dataToAdd)
                    try {
                        updateDocument(
                            "users",
                            dataToAdd,
                            loggedUser.email.toString()
                        )
                        setLoggedUser({ ...loggedUser, ...dataToAdd })
                        setShow(false)
                    } catch (err: any) {
                        console.log(err.message)
                        console.log(Object.entries(err))
                    }
            } else {
                if (dataToAdd.email && dataToAdd.password) {
                    signUp(
                        dataToAdd.email,
                        dataToAdd.password,
                        dataToAdd.photoURL,
                        dataToAdd.displayName,
                        dataToAdd.position
                    )
                    setShow(false)
                }
            }
        }
    }

    function comparePasswords(startCompare: boolean, repeated: string) {
        if (startCompare && repeated === password && password && repeated)
            setEqualPasswords(true)
        else setEqualPasswords(false)
    }

    function handleFile(files: FileList | null) {
        const reader = new FileReader()
        const MAX_FILE_SIZE = 2 * 1048576 //2MB
        let file: File | null = null
        if (files?.length) file = files[0]
        reader.onload = (ev: ProgressEvent<FileReader>) => {
            if (ev.total >= MAX_FILE_SIZE) {
                useSnackbarStore.setState({
                    open: true,
                    message: "Imagem deve ter no máximo 2MB",
                    type: "error",
                })
                return
            } else if (ev?.target?.result && file)
                setNewPhoto(state => ({
                    ...state,
                    photoFile: file,
                    photoToShow: `${ev?.target?.result}`,
                }))
        }
        file && reader.readAsDataURL(file)
    }

    if (show)
        return (
            <ModalContainer>
                <form
                    onSubmit={event => {
                        event?.preventDefault()
                        handleSave(event.currentTarget)
                    }}
                >
                    <h2>{`${
                        loggedUser ? "Editar usuário" : "Criar conta"
                    }`}</h2>
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
                                    loggedUser?.displayName || "Nome de usuário"
                                }`}
                                type="text"
                                name="displayName"
                            />
                            <input
                                placeholder={`${
                                    loggedUser?.position || "Cargo"
                                }`}
                                type="text"
                                name="position"
                            />
                        </div>
                        <label htmlFor="file_uploader" className="fake-button">
                            {newPhoto?.photoToShow || loggedUser?.photoURL ? (
                                <>
                                    <div className="img-button">
                                        <div className="add-img">
                                            + <IoImages />
                                        </div>
                                        <img
                                            src={
                                                newPhoto?.photoToShow ||
                                                loggedUser?.photoURL
                                            }
                                            alt="Foto do usuário"
                                        />{" "}
                                    </div>
                                </>
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
                            onChange={e => handleFile(e.currentTarget.files)}
                        />
                    </div>
                    <hr />
                    <footer>
                        <button
                            type="submit"
                            disabled={equalPasswords === false}
                        >
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
    else {
        return null
    }
}
