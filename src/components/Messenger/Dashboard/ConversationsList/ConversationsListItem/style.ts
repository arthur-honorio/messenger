import React from "react"
import styled from "styled-components"

type ContainerProps = {
    children?: React.ReactNode[]
}

export const Container = styled.ul<ContainerProps>`
    height: 100%;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 20px;
`
