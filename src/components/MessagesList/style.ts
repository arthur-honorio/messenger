import styled from "styled-components"

export const Container = styled.ul`
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow: auto;
    padding: 0 10px 10px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    .box,
    .box-logged {
        margin-top: 3px;
    }

    .box {
        margin-right: auto;
    }

    .box-logged {
        margin-left: auto;
    }

    .box {
        &.only-message,
        &.last-message {
            border-radius: 10px 25px 25px 25px;
            position: relative;
        }
        &.same-creator,
        &.first-message {
            border-radius: 10px 25px 25px 10px;
            position: relative;
        }

        &.only-message::after,
        &.first-message::after {
            transform: skew(25deg);
            content: "";
            height: 20px;
            width: 20px;
            position: absolute;
            left: -3px;
            top: 0;
            background-color: greenyellow;
            border-radius: 5px;
        }
    }

    .box-logged {
        &.only-message,
        &.first-message {
            border-radius: 25px 25px 10px 25px;
            position: relative;
        }
        &.same-creator,
        &.last-message {
            border-radius: 25px 10px 10px 25px;
            position: relative;
        }

        &.only-message::after,
        &.last-message::after {
            transform: skew(25deg);
            content: "";
            height: 20px;
            width: 20px;
            position: absolute;
            right: -3px;
            bottom: 0;
            background-color: orchid;
            border-radius: 5px;
        }
    }

    &::-webkit-scrollbar {
        width: 5px;
    }
`
