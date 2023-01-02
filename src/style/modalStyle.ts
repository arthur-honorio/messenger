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
        display: grid;
        width: 100%;
        grid-template-columns: repeat(9, 1fr);
        gap: 10px;
        align-items: center;

        svg {
            color: white;
            width: 25px;
            height: 25px;
            text-align: center;
            margin: 0 auto;
        }

        svg:hover {
            color: orchid;
            cursor: pointer;
        }
    }

    .passwords {
        grid-column: span 4;

        &.match {
            border: greenyellow 4px solid;
        }

        &.error {
            border: red 4px solid;
        }
    }

    .fake-button .img-button {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .fake-button .img-button .add-img {
        visibility: hidden;
        position: absolute;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        z-index: 1;
    }

    .fake-button:hover .img-button .add-img {
        visibility: visible;
        opacity: 1;
    }

    .fake-button:hover .img-button > img {
        opacity: 0.5;
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
        width: 6.3rem;
        height: 6.3rem;
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
