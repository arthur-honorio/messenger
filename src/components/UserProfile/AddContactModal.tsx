import React, { useEffect } from "react"
import { arrayUnion } from "firebase/firestore"
import { dbSearch, updateDocument } from "../../firebase/firestoreFunctions"
import { useLoggedUserStore, userProps } from "../../states/loggedUser"
import { useSnackbarStore } from "../../states/snackbar"

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

    const handleAddContact = async (target: HTMLFormElement) => {
        const data = new FormData(target)
        const { email } = Object.fromEntries(data.entries())

        if (loggedUser && email.toString() !== loggedUser.email) {
            const result = await dbSearch("users", "email", email.toString())
            const contactToAdd = !result.empty && result.docs[0].data()

            if (contactToAdd) {
                updateDocument(
                    "users",
                    { contacts: arrayUnion(contactToAdd.eui) },
                    loggedUser.uid
                ).then(() => {
                    setLoggedUser((state: userProps) => ({
                        ...state,
                        contacts: [...state.contacts, contactToAdd.eui],
                    }))
                    useSnackbarStore.setState({
                        open: true,
                        message: "Contato adicionado com sucesso",
                        type: "success",
                    })
                })
            } else {
                useSnackbarStore.setState({
                    open: true,
                    message: "O e-mail informado não está cadastrado",
                    type: "warning",
                })
            }
        } else {
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
                        <button type="submit">Adicionar</button>
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
