import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    svg {
        position: absolute;
        right: 50px;
    }

    input {
        width: 90%;
        height: 40px;
        border: 1px solid lightgray;
        padding: 5px 25px;
        border-radius: 40px;
    }
`
