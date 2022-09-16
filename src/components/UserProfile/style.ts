import styled from "styled-components"

export type ContainerProps = {
    isFromProfile: boolean
}

type EditButtonProps = {
    onClick: () => void
}

export const Container = styled.header<ContainerProps>`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

export const EditButton = styled.div<EditButtonProps>`
    display: flex;
    justify-content: center;
    gap: 10px;
    width: 20px;
    height: 20px;

    svg {
        color: purple;
        cursor: pointer;
    }
`

export const UserDetails = styled.div`
    display: flex;
    width: fit-content;
    align-items: center;
    gap: 20px;
`
