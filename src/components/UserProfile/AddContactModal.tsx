import React, { useEffect, useState } from "react"
import { arrayUnion } from "firebase/firestore"
import {
    dbSearch,
    getDocument,
    updateDocument,
} from "../../firebase/firestoreFunctions"
import { useLoggedUserStore } from "../../states/loggedUser"
import { useSnackbarStore } from "../../states/snackbar"
import { ActionButton } from "../ActionButton"

import { IoCloseCircleSharp } from "react-icons/io5"
import { ModalContainer } from "../../style/modalStyle"
import { useContactsStore } from "../../states/contacts"
import { contactPropsTypes } from "../../types/types"

type AddContactModalProps = {
    show: boolean
    setShow: (arg0: boolean) => void
}

export const AddContactModal: React.FC<AddContactModalProps> = ({
    show,
    setShow,
}) => {
    const { loggedUser, setLoggedUser } = useLoggedUserStore(state => state)
    const { setSelectedContact } = useContactsStore(state => state)
    const [isLoading, setIsLoading] = useState(false)
    const [loadingSuccedded, setLoaddingSuccedded] = useState(false)

    const handleAddContact = async (target: HTMLFormElement) => {
        setIsLoading(true)
        const data = new FormData(target)
        const { email } = Object.fromEntries(data.entries())
        const searchedContact = loggedUser?.contacts.find(
            (contact: contactPropsTypes) => contact.email === email
        )
        if (loggedUser)
            if (email.toString() !== loggedUser.email && !searchedContact) {
                const result = await dbSearch(
                    "users",
                    "email",
                    email.toString()
                )
                const contactToAdd = !result.empty && result.docs[0].data()

                if (contactToAdd) {
                    const conversationId =
                        contactToAdd.uid > loggedUser.uid
                            ? contactToAdd.uid + loggedUser.uid
                            : loggedUser.uid + contactToAdd.uid
                    const { email, displayName, photoURL, uid } = contactToAdd
                    updateDocument(
                        "users",
                        {
                            contacts: arrayUnion({
                                email,
                                uid,
                                displayName,
                                photoURL,
                                conversationId,
                            }),
                        },
                        loggedUser.uid
                    ).then(() => {
                        setLoaddingSuccedded(true)
                        setTimeout(async () => {
                            const user = await getDocument(
                                "users",
                                loggedUser.uid
                            )
                            updateDocument("messages", [], conversationId)
                            user && setLoggedUser(user)
                            useSnackbarStore.setState({
                                open: true,
                                message: "Contato adicionado com sucesso",
                                type: "success",
                            })
                        }, 1000)
                    })
                } else {
                    setIsLoading(false)
                    useSnackbarStore.setState({
                        open: true,
                        message: "O e-mail informado não está cadastrado",
                        type: "warning",
                    })
                }
            } else {
                setIsLoading(false)
                if (email.toString() === loggedUser.email) {
                    useSnackbarStore.setState({
                        open: true,
                        message: "Você inseriu o próprio e-mail",
                        type: "error",
                    })
                } else {
                    setSelectedContact(searchedContact)
                    useSnackbarStore.setState({
                        open: true,
                        message: "O usuário já faz parte dos seus contatos",
                        type: "info",
                    })
                }
            }
    }

    useEffect(() => {
        const closeOnEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setShow(false)
            }
        }

        if (show) {
            window.addEventListener("keydown", closeOnEsc)
        }

        return () => {
            window.removeEventListener("keydown", closeOnEsc)
        }
    }, [show])

    if (show) {
        return (
            <ModalContainer>
                <form
                    onSubmit={event => {
                        event?.preventDefault()
                        handleAddContact(event.target as HTMLFormElement)
                    }}
                >
                    <h2>Adicionar Contato</h2>
                    <IoCloseCircleSharp onClick={() => setShow(false)} />
                    <input
                        placeholder="Email do contato desejado"
                        type="email"
                        name="email"
                        id="email"
                    />
                    <footer>
                        <ActionButton
                            loadingSuccedded={loadingSuccedded}
                            isLoading={isLoading}
                            buttonContent="Adicionar"
                            buttonType="submit"
                        />
                        <button
                            className="alt-button"
                            type="button"
                            onClick={() => setShow(false)}
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
