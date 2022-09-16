import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    svg {
        position: absolute;
        right: 70px;
    }

    input {
        width: 100%;
        height: 40px;
        border: 1px solid lightgray;
        padding: 5px 25px;
        border-radius: 40px;
    }
`
