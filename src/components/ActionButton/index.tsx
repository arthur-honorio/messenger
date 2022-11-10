import React from "react"
import { IoCheckmarkDone } from "react-icons/io5"
import { LoadingIcon } from "../LoadingIcon"

import { ButtonContainer } from "./style"

type ActionButtonProps = {
    loadingSuccedded: boolean
    isLoading: boolean
    handleClick: (...args: any[]) => any
    buttonContent: string
}

export const ActionButton: React.FC<ActionButtonProps> = ({
    loadingSuccedded,
    isLoading,
    handleClick,
    buttonContent,
}) => {
    return (
        <ButtonContainer
            className={`action-button${loadingSuccedded ? " success" : ""}`}
            onClick={handleClick}
            style={{ position: "relative" }}
        >
            {isLoading ? (
                <LoadingIcon />
            ) : loadingSuccedded ? (
                <IoCheckmarkDone />
            ) : (
                <span>{buttonContent}</span>
            )}
        </ButtonContainer>
    )
}
