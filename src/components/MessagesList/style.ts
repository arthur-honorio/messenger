import styled from "styled-components"

export const Container = styled.ul`
    width: 100%;
    height: 100%;
    max-height: 100%;
    overflow: auto;
    padding-left: 10px;

    .box + .box,
    .box-logged + .box-logged {
        margin-top: 2px;
    }
    
    .box-logged {
        &.only-message,
        &.last-message {
            .message-box {
                border-radius: 10px 25px 25px 25px;
                position: relative;
            }
        }
        &.same-creator,
        &.first-message {
            .message-box {
                border-radius: 10px 25px 25px 10px;
                position: relative;
            }
        }

        &.only-message,
        &.first-message {
            .message-box::after {
                transform: skew(25deg);
                content: "";
                height: 20px;
                width: 20px;
                position: absolute;
                left: -3px;
                top: 0;
                background-color: orchid;
                border-radius: 5px;
            }
        }
    }

    .box {
        &.only-message,
        &.first-message {
            .message-box {
                border-radius: 25px 25px 10px 25px;
                position: relative;
            }
        }
        &.same-creator,
        &.last-message {
            .message-box {
                border-radius: 25px 10px 10px 25px;
                position: relative;
            }
        }

        &.only-message,
        &.last-message {
            .message-box::after {
                transform: skew(25deg);
                content: "";
                height: 20px;
                width: 20px;
                position: absolute;
                right: -3px;
                bottom: 0;
                background-color: greenyellow;
                border-radius: 5px;
            }
        }
    }

    &::-webkit-scrollbar {
        width: 5px;
    }

    ul {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
`
