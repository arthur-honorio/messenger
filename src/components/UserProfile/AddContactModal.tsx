import React, { useEffect, useState } from "react"
import { arrayUnion } from "firebase/firestore"
import {
    createDocument,
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
    const [loadingSuccedded, setLoadingSuccedded] = useState(false)

    useEffect(() => {
        if (loadingSuccedded) {
            setTimeout(() => {
                setShow(false)
                setLoadingSuccedded(false)
            }, 1000)
        }
    }, [loadingSuccedded])

    const handleAddContact = async (target: HTMLFormElement) => {
        setIsLoading(true)
        const data = new FormData(target)
        const { email } = Object.fromEntries(data.entries())
        const searchedContact = loggedUser?.contacts.find(
            (contact: contactPropsTypes) => contact.email === email
        )

        try {
            if (loggedUser) {
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
                        const {
                            email: contact_email,
                            displayName: contact_displayName,
                            photoURL: contact_photoURL,
                            uid: contact_uid,
                        } = contactToAdd
                        const {
                            email: logged_email,
                            displayName: logged_displayName,
                            photoURL: logged_photoURL,
                            uid: logged_uid,
                        } = loggedUser
                        updateDocument(
                            "users",
                            {
                                contacts: arrayUnion({
                                    email: contact_email,
                                    displayName: contact_displayName,
                                    photoURL: contact_photoURL,
                                    uid: contact_uid,
                                    conversationId,
                                }),
                            },
                            logged_uid
                        )
                            .then(() => {
                                updateDocument(
                                    "users",
                                    {
                                        contacts: arrayUnion({
                                            email: logged_email,
                                            displayName: logged_displayName,
                                            photoURL: logged_photoURL,
                                            uid: logged_uid,
                                            conversationId,
                                        }),
                                    },
                                    contact_uid
                                )
                            })
                            .then(() => {
                                setLoadingSuccedded(true)
                                setIsLoading(false)
                                setTimeout(async () => {
                                    const user = await getDocument(
                                        "users",
                                        loggedUser.uid
                                    )
                                    createDocument(
                                        "messages",
                                        { conversation: [] },
                                        conversationId
                                    )
                                    user && setLoggedUser(user)
                                    useSnackbarStore.setState({
                                        open: true,
                                        message:
                                            "Contato adicionado com sucesso",
                                        type: "success",
                                    })
                                }, 1000)
                            })
                    } else {
                        setIsLoading(false)
                        setShow(false)
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
        } catch (err: any) {
            console.log(err)
            console.log(err.message)
            console.log(Object.entries(err))
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
