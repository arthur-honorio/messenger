import React, { useEffect, useState } from "react"
import { updateDocument } from "../../../firebase/firestoreFunctions"
import { useLoggedUserStore } from "../../../states/loggedUser"
import { uploadFiles } from "../../../firebase/storageFunctions"
import { UserForm } from "../UserForm"

type UserEditionModalProps = {
    show: boolean
    setShow: (arg0: boolean) => void
}

type dataToAddType = {
    displayName: string
    position?: string
    photoURL?: string
    email?: string
    password?: string
}

export const UserEdition: React.FC<UserEditionModalProps> = ({
    show,
    setShow,
}) => {
    const { loggedUser, setLoggedUser } = useLoggedUserStore(state => state)
    const [allowedToUpload, setAllowedToUpload] = useState(false)
    const [formData, setFormData] = useState<HTMLFormElement | null>(null)
    const [photoURL, setPhotoURL] = useState("")

    useEffect(() => {
        if (formData) handleSave(formData)
    }, [formData])

    const getDataToAdd = async (
        data: FormData
    ): Promise<dataToAddType | undefined> => {
        if (data) {
            const { userName, file, position, email } = Object.fromEntries(
                data.entries()
            )

            if (file) {
                await uploadFiles(file, setPhotoURL)
            }

            let dataToAdd: dataToAddType = {} as dataToAddType
            if (userName) dataToAdd.displayName = userName.toString()
            if (position) dataToAdd.position = position.toString()
            if (email) dataToAdd.email = email.toString()
            if (photoURL) dataToAdd.photoURL = photoURL

            return dataToAdd
        }
    }

    const handleSave = async (target: HTMLFormElement) => {
        const data = new FormData(target)
        const dataToAdd = await getDataToAdd(data)

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
                setFormData(null)
            }
        }

        if (show) {
            window.addEventListener("keydown", closeOnEsc)
        }

        return () => {
            setPhotoURL("")
            window.removeEventListener("keydown", closeOnEsc)
        }
    }, [show])

    if (show) {
        return (
            <UserForm setFormData={setFormData} isEdition setShow={setShow} />
        )
    } else {
        return <></>
    }
}
