import React, { useState } from "react"
import { ContactPropsTypes } from "../../types/types"
import { AddContactModal } from "../UserProfile/AddContactModal"

import { Container } from "./styles"

export const NoChatSelected: React.FC<{ contacts: ContactPropsTypes[] }> = ({
    contacts,
}) => {
    const [showAddContact, setShowAddContact] = useState(false)
    const hasMessages = contacts?.some(contact => contact.message)
    return (
        <Container className="no-chat-selected">
            <AddContactModal
                show={showAddContact}
                setShow={setShowAddContact}
            />
            {contacts?.length ? (
                hasMessages ? (
                    <span className="no-chat-selected">
                        Nenhum chat selecionado
                    </span>
                ) : (
                    <>
                        <span className="no-chat">
                            Ainda não falou com ninguém?
                        </span>
                        <p className="start-chat-info">
                            Para iniciar um chat você pode:
                        </p>
                        <p
                            className="add-contacts"
                            onClick={() => setShowAddContact(true)}
                        >
                            Clicar aqui para adicionar um novo contato
                        </p>
                        <p
                            className="search-contacts"
                        >
                            Selecionar um dos seus contatos na lista ao lado
                        </p>
                    </>
                )
            ) : (
                <>
                    <p className="no-contacts">
                        Você não possui contatos adicionados.
                    </p>
                    <p
                        className="add-contacts"
                        onClick={() => setShowAddContact(true)}
                    >
                        Clique aqui para encontrar seus amigos.
                    </p>
                </>
            )}{" "}
        </Container>
    )
}
