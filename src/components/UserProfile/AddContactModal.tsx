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

type AddContactModalProps = {
    show: boolean
    setShow: (arg0: boolean) => void
}

export const AddContactModal: React.FC<AddContactModalProps> = ({
    show,
    setShow,
}) => {
    const { loggedUser, setLoggedUser } = useLoggedUserStore.getState()
    const [isLoading, setIsLoading] = useState(false)
    const [loadingSuccedded, setLoaddingSuccedded] = useState(false)

    const handleAddContact = async (target: HTMLFormElement) => {
        setIsLoading(true)
        const data = new FormData(target)
        const { email } = Object.fromEntries(data.entries())
        if (loggedUser)
            if (email.toString() !== loggedUser.email) {
                const result = await dbSearch(
                    "users",
                    "email",
                    email.toString()
                )
                const contactToAdd = !result.empty && result.docs[0].data()
                if (contactToAdd) {
                    updateDocument(
                        "users",
                        {
                            contacts: arrayUnion({
                                uid: contactToAdd.uid,
                                displayName: contactToAdd.displayName,
                                photoURL: contactToAdd.photoURL,
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
                useSnackbarStore.setState({
                    open: true,
                    message: "O e-mail informado é o e-mail do usuário logado",
                    type: "error",
                })
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
                            handleClick={handleAddContact}
                            buttonContent="Adicionar"
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
