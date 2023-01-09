import styled from "styled-components"

export const Container = styled.div`
    width: 100%;

    & .displayName-time {
        display: flex;
        min-width: 100%;
        justify-content: space-between;

        h5 {
            color: orchid;
            font-size: 1.2rem;
        }

        span {
            font-size: 0.9rem;
        }
    }

    & .position-lastMessage {
        display: flex;
        justify-content: space-between;
        width: 100%;

        p,
        span {
            max-width: 200px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            font-size: 0.9rem;
            margin-top: 3px;

            svg {
                width: 1.2rem;
                height: 1.2rem;
            }
        }
    }
`
