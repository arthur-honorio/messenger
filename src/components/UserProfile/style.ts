import styled from "styled-components"

export const Container = styled.header<{ isFromProfile?: boolean }>`
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

export const UserProfileButton = styled.div<{
    onClick: () => void
}>`
    display: flex;
    justify-content: center;
    gap: 10px;
    width: 25px;
    height: 25px;

    svg {
        cursor: pointer;
        font-size: 25px;
    }
`

export const UserProfileButtonsContainer = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
`
