import React from "react"
import styled from "styled-components"

type ContainerProps = {
    children: React.ReactNode
}

export const Container = styled.div<ContainerProps>`
    width: 100%;
    height: 100%;
    padding: 20px 10px;
    background: pink;
`
