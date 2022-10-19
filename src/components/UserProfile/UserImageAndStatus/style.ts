import styled from "styled-components"

type UserStatusProps = {
    size: string
    status: string | undefined
}

type UserImageProps = {
    size: string
    src: string | undefined
    alt: string
}

type ContainerProps = {
    size: string
}

export const Container = styled.div<ContainerProps>`
    display: flex;
    width: fit-content;
    height: fit-content;
    position: relative;
`

export const UserStatus = styled.div<UserStatusProps>`
    width: ${props =>
        props.size === "L" ? "20px" : props.size === "M" ? "18px" : "10px"};
    height: ${props =>
        props.size === "L" ? "20px" : props.size === "M" ? "18px" : "10px"};
    background: ${props => (props.status === "online" ? "green" : "red")};
    border-radius: 100%;
    position: absolute;
    right: 1px;
    bottom: 1px;
    border: 2px solid white;
`

export const UserImage = styled.img<UserImageProps>`
    width: ${props =>
        props.size === "L" ? "70px" : props.size === "M" ? "55px" : "40px"};
    height: ${props =>
        props.size === "L" ? "70px" : props.size === "M" ? "55px" : "40px"};
    border-radius: 100%;
    background: orchid;
`
