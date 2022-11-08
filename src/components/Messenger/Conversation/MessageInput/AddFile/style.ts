import styled from "styled-components"

export const Container = styled.div`
    background: rgb(245, 245, 245);
    position: absolute;
    right: 72px;
    bottom: 100px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 10px;
    border-bottom-right-radius: 0;
    border: 1px solid orchid;
    
    &:after {
        display: block;
        content:"";
        position: absolute;
        width: 10px;
        height: 25px;
        background: orchid;
        bottom: -10px;
        right: -1px;
        transform: skewY(60deg);
    }

    label {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
    }
`
