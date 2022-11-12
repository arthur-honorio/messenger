import styled from "styled-components"

export const ButtonContainer = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    &.success svg {
        display: block;
        position: static;
        margin-left: 10px;
        padding: 0;
        color: darkorchid;
    }

    &.success {
        background-color: greenyellow;
    }
`
