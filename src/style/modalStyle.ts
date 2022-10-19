import styled from "styled-components"
import { lighten } from "polished"

export const ModalContainer = styled.div`
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
        width: 600px !important;
        background-color: darkcyan;
        padding: 60px;
        flex-direction: column;
        border-radius: 10px;
        position: relative;

        button {
            background-color: orchid;
            cursor: pointer;

            &:hover {
                background-color: ${lighten(0.1, "orchid")};
            }
        }

        svg {
            position: absolute;
            right: 15px;
            top: 15px;
            font-size: 30px;
            color: orchid;
            cursor: pointer;
        }

        h3 {
            color: white;
        }
    }
`
