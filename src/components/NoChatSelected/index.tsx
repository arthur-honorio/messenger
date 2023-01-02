import React, { useState } from "react"
import { contactPropsTypes } from "../../types/types"
import { AddContactModal } from "../UserProfile/AddContactModal"

import { Container } from "./styles"

export const NoChatSelected: React.FC<{ contacts: contactPropsTypes[] }> = ({
    contacts,
}) => {
    const [showAddContact, setShowAddContact] = useState(false)
    const hasMessages = contacts?.some(contact => contact.lastMessage)
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
                        <span className="no-chat-selected">
                            Você ainda não falou com ninguém?
                        </span>
                        <p className="start-chat-info">
                            Para iniciar um chat você pode:
                        </p>
                        <p
                            className="add-contacts"
                            onClick={() => setShowAddContact(true)}
                        >
                            1. Adicione um novo contato e comece a conversar
                        </p>
                        <p
                            className="search-contacts"
                            onClick={() => setShowAddContact(true)}
                        >
                            2. Busque nos seus contatos e comece uma conversa
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
