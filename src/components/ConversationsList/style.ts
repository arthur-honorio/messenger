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

    .contacts-list-item,
    .conversation-list-item {
        cursor: pointer;
    }

    .contacts-list-item {
        list-style: none;
        height: 100%;
        width: 100%;
    }

    .contacts-list-item + .contacts-list-item {
        margin-top: 10px;
    }

    .conversation-list-li {
        padding: 10px 15px;
        border-radius: 10px;
    }
    .conversation-list-li.selected {
        background: linear-gradient(
            90deg,
            rgba(200, 0, 200, 0.05) 10%,
            rgba(200, 0, 200, 0.1) 100%
        );
    }
`
