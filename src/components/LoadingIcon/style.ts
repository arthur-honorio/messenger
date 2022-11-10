import styled from "styled-components"

export const Container = styled.div`
    .spinner {
        width: 25px;
        height: 25px;
        background-color: transparent;
        border: 2px white solid;
        border-bottom: none;
        border-radius: 25px;
        position: absolute;
        z-index: 100;
        animation: 1s loading linear infinite;
    }

    @keyframes loading {
        100% {
            transform: rotate(360deg);
        }
    }
`
