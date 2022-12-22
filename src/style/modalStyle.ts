import styled from "styled-components"

export const ModalContainer = styled.div`
    position: fixed;
    background-color: rgba(255, 255, 255, 0.9);
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;

    h2 {
        color: white;
    }

    .password {
        display: flex;
        width: 100%;
        gap: 10px;
    }

    .name-position-avatar {
        display: grid;
        grid-template-columns: calc(95% - 7rem) 7rem;
        gap: 5%;
        width: 100%;
        align-items: center;
    }

    .name-position-avatar label {
        height: 7rem;
        border-radius: 7rem;
        font-size: 2rem;
    }

    .name-position-avatar label img {
        width: 6rem;
        height: 6rem;
        border-radius: 7rem;
    }

    .name-position-avatar label svg {
        width: 2.5rem;
        height: 2.5rem;
    }

    .name-position {
        display: flex;
        width: 100%;
        gap: 10px;
        flex-direction: column;
    }

    hr {
        width: 100%;
        opacity: 0.5;
        margin: 5px;
    }
`
