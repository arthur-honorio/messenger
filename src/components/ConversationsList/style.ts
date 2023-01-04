import React from "react"
import styled from "styled-components"

type ContainerProps = {
    children: React.ReactNode
}

export const Container = styled.ul<ContainerProps>`
    width: 100%;
    height: 100%;
    display: flex;
    gap: 10px;
    flex-direction: column;
`

export const SubContainer = styled.ul<ContainerProps>`
    width: 100%;
    padding: 10px;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    h3 {
        margin-bottom: 10px;
    }

    .contacts-list-item {
        list-style: none;
        height: 100%;
        width: 100%;
    }

    .contacts-list-item + .contacts-list-item {
        margin-top: 10px;
    }
`
