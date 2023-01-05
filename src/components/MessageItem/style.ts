import styled from "styled-components"

type ContainerProps = {
    isUserLoggedIn: boolean
}


export const Container = styled.div<ContainerProps>`
    display: flex;
    align-items: center;
    justify-content: ${props => (props.isUserLoggedIn ? "flex-end" : "flex-start")};
    width: 100%;
    gap: 20px;

    min-height: 50px;
    width: fit-content;
    min-width: 100px;
    max-width: 50%;
    padding: 18px 25px;

    color: ${props => (props.isUserLoggedIn ? "white" : "black")};
    background-color: ${props =>
        props.isUserLoggedIn ? "orchid" : "greenyellow"};

    .message-time-status {
        font-size: small;
        display: flex;
        align-items: flex-end;
        gap: 5px;
    }
`
