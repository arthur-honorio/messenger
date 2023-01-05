import styled from "styled-components"
import {
    ContainerPropsTypes,
    UserImagePropsTypes,
    UserStatusPropsTypes,
} from "../../types/types"

export const Container = styled.div<ContainerPropsTypes>`
    display: flex;
    width: fit-content;
    height: fit-content;
    position: relative;
`

export const UserStatus = styled.div<UserStatusPropsTypes>`
    width: ${props =>
        props.size === "L" ? "20px" : props.size === "M" ? "18px" : "14px"};
    height: ${props =>
        props.size === "L" ? "20px" : props.size === "M" ? "18px" : "14px"};
    background: ${props => (props.status === "online" ? "green" : "red")};
    border: 2px solid white;
    border-radius: 100%;
    position: absolute;
    right: -5px;
    bottom: -1px;
`

export const UserImage = styled.img<UserImagePropsTypes>`
    width: ${props =>
        props.size === "L" ? "70px" : props.size === "M" ? "55px" : "40px"};
    height: ${props =>
        props.size === "L" ? "70px" : props.size === "M" ? "55px" : "40px"};
    border-radius: 100%;
    background: orchid;
`

export const UserNoImage = styled.div<Pick<UserImagePropsTypes, "size">>`
    width: ${props =>
        props.size === "L" ? "70px" : props.size === "M" ? "55px" : "40px"};
    height: ${props =>
        props.size === "L" ? "70px" : props.size === "M" ? "55px" : "40px"};
    border-radius: 100%;
    background: orchid;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;

    & svg {
        width: 40%;
        height: 40%;
    }
`
