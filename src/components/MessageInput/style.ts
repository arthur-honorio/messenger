import styled from "styled-components"
import { darken } from "polished"

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;

    input {
        border-radius: 100px;
        border: 1px solid orchid;
        margin-right: 10px;
        text-align: left;
        font-size: 16px;
        letter-spacing: 1.5px;
    }

    svg {
        width: 30px;
        height: 30px;
        color: orchid;
    }

    svg:first-of-type {
        color: darkorchid;
    }

    svg:hover {
        color: ${darken(0.2, "darkorchid")};
        cursor: pointer;
    }
`
