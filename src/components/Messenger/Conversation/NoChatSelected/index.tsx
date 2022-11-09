import React, { useState } from "react"
import { AddContactModal } from "../../../UserProfile/AddContactModal"

import { Container } from "./styles"

export const NoChatSelected: React.FC<{ contacts: Object }> = ({
    contacts,
}) => {
    const [showAddContact, setShowAddContact] = useState(false)
    return (
        <Container className="no-chat-selected">
            <AddContactModal
                show={showAddContact}
                setShow={setShowAddContact}
            />
            {Object.keys(contacts).length ? (
                <span className="no-chat-selected">
                    Nenhum chat selecionado
                </span>
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
