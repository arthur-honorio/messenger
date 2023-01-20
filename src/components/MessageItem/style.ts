import styled from "styled-components"

type ContainerProps = {
    isUserLoggedIn: boolean
}

export const MessageDivisor = styled.span`
    width: 100%;
    display: grid;
    align-items: center;
    justify-content: center;
    padding: 20px;
    display: inline-block;
    text-align: center;
    font-size: 14px;
    color: gray;

    &::before,
    &::after{
        content: "";
        display: inline-block;
        width: 30%;
        height: 1px;
        background: linear-gradient(90deg,transparent,lightgray);
        vertical-align: center;
        margin: 5px 40px;
    }

    &::after {
        background: linear-gradient(-90deg,transparent,lightgray);

    }
`
export const Container = styled.div<ContainerProps>`
    display: flex;
    align-items: center;
    justify-content: ${props =>
        props.isUserLoggedIn ? "flex-end" : "flex-start"};
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
