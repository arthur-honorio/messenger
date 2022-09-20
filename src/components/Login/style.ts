import styled from "styled-components"
import { darken } from "polished"

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 500px;
    height: 400px;
    background: orange;
    border-radius: 10px;
    margin: calc((100vh - 400px) / 2) auto;

    h1 {
        color: white;
        text-align: center;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 70%;

        input,
        button {
            height: 40px;
            padding: 10px 20px;
            border-radius: 10px;
            border: none;
        }

        button:has(+ button) {
            background: darkblue;
            color: white;
        }

        button:hover {
            background: #ddd;
            font-size: 0.9rem;
        }

        button:has(+ button):hover {
            background: ${darken(0.05, "darkblue")};
            font-size: 0.9rem;
        }

        button {
            color: darkblue;
            font-weight: bold;
            transition: all 0.2s ease-in-out;
        }
    }
`
