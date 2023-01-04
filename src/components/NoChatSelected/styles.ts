import styled from "styled-components"

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-weight: bold;
    color: rgb(120, 120, 120);
    font-size: 18px;
    background-color: #eee;
    flex-direction: column;
    gap: 20px;

    .no-chat {
        font-size: 35px;
        color: black;
        margin-top: 40px;
    }

    .start-chat-info {
        font-size: 25px;
        color: rgb(120, 120, 120);
        margin-top: 40px;
    }

    .add-contacts {
        font-size: 25px;
        color: darkorchid;
        cursor: pointer;
    }
    
    .search-contacts {
        font-size: 25px;
        color: orchid;
        cursor: default;
    }
`
