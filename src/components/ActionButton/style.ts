import styled from "styled-components"

export const ButtonContainer = styled.button`
    .action-button,
    .action-button.success {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .action-button.success svg {
        display: block;
        position: static;
        margin-left: 10px;
        padding: 0;
    }

    .action-button.success {
        background-color: greenyellow;
    }

    .action-button.success svg {
        color: darkorchid;
    }
`
