import styled from "styled-components"

type EditButtonProps = {
    onClick: () => void
}

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    gap: 20px;
    width: 100%;
`

export const EditButton = styled.div<EditButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 20px;
    height: 20px;

    svg {
        color: purple;
        cursor: pointer;
    }
`

export const UserContainer = styled.div`
    display: flex;
    width: fit-content;
    align-items: center;
    gap: 20px;
`
