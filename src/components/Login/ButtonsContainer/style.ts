import styled from "styled-components"
import { darken } from "polished"

export const Container = styled.div`
    display: flex;
    width: 100%;
    gap: 10px;
    margin-top: 10px;

    button {
        height: 40px;
        padding: 10px 20px;
        border-radius: 10px;
        border: none;
    }

    button:has(+ button) {
        background: darkorchid;
        color: white;
    }

    button:hover {
        background: #ddd;
        font-size: 0.9rem;
    }

    button:has(+ button):hover {
        background: ${darken(0.05, "darkorchid")};
        font-size: 0.9rem;
    }

    button {
        color: darkorchid;
        font-weight: bold;
        transition: all 0.2s ease-in-out;
    }

    button {
        width: 50%;
        cursor: pointer;
    }
`
