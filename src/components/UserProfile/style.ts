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
    align-items: center;
    justify-content: space-between;

    .add-contacts,
    .add-contacts svg {
        color: orchid;
        width: 60px;
        height: 30px;
    }

    .add-contacts {
        margin-left: 100px;
    }

    .add-contacts::after {
        display: block;
        content: "";
        width: 2px;
        height: 45px;
        background-color: orchid;
        align-self: center;
    }
`

export const UserProfileButton = styled.div<EditButtonProps>`
    display: flex;
    justify-content: center;
    gap: 10px;
    width: 20px;
    height: 20px;

    svg {
        cursor: pointer;
    }
`

export const UserDetails = styled.div`
    display: flex;
    width: fit-content;
    align-items: center;
    gap: 20px;
`

export const UserProfileButtonsContainer = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
`
