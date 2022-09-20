import styled from "styled-components"
import { lighten } from "polished"

export const Container = styled.div`
    position: absolute;
    background-color: rgba(255, 255, 255, 0.5);
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    form {
        width: 600px;
        background-color: darkcyan;
        padding: 60px;
        flex-direction: column;
        border-radius: 10px;

        button {
            background-color: orange;
            cursor: pointer;

            &:hover {
                background-color: ${lighten(0.1, "orange")};
            }
        }
    }
`
