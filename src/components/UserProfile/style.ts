import styled from "styled-components"

export const Container = styled.header<{ isFromProfile?: boolean }>`
    width: 100%;
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: 68% 30%;

    .add-contacts,
    .add-contacts svg {
        color: orchid;
        width: fit-content;
        height: 30px;
    }

    .add-contacts::after {
        display: block;
        content: "";
        width: 2px;
        height: 45px;
        background-color: orchid;
        align-self: center;
        margin-left: 10px;
    }
`

export const UserProfileButton = styled.div<{
    onClick: () => void
}>`
    display: flex;
    justify-content: center;
    width: 25px;
    height: 25px;

    svg {
        cursor: pointer;
        font-size: 25px;
    }
`

export const UserProfileButtonsContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
`
