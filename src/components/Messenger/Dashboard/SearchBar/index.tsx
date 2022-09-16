import React from "react"
import { FaSearch } from "react-icons/fa"

import { Container } from "./style"

export const SearchBar: React.FC = () => {
    return (
        <Container className="search-bar">
            <FaSearch />
            <input type="search" placeholder="Busque mensagens ou usuários" />
        </Container>
    )
}
