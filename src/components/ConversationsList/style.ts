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

    .conversation-list-li + .conversation-list-li,
    .contacts-list-li + .contacts-list-li {
        margin-top: 10px;
    }
    

    .contacts-list-item h5 {
        font-size: 1rem !important;
    }

    .contacts-list-li,
    .conversation-list-li {
        padding: 10px 5px;
        padding-right: 15px;
    }

    .conversation-list-li.selected {
        border-right: 3px solid orchid;
        background: linear-gradient(
            90deg,
            transparent 10%,
            rgba(200, 0, 200, 0.1) 100%
        );
    }
`
