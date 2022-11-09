import React from "react"

import { Container } from "./styles"

export const NoChatSelected: React.FC<{ contacts: Object }> = ({
    contacts,
}) => {
    return (
        <Container className="no-chat-selected">
            {Object.keys(contacts).length ? (
                <span className="no-chat-selected">
                    Nenhum chat selecionado
                </span>
            ) : (
                <>
                    <p className="no-contacts">
                        Você não possui contatos adicionados.
                    </p>
                    <p className="add-contacts">
                        Clique aqui para encontrar seus amigos.
                    </p>
                </>
            )}{" "}
        </Container>
    )
}
