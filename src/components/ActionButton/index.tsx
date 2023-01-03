import React from "react"
import { IoCheckmarkDone } from "react-icons/io5"
import { ActionButtonPropsTypes } from "../../types/types"
import { LoadingIcon } from "../LoadingIcon"

import { ButtonContainer } from "./style"

export const ActionButton: React.FC<ActionButtonPropsTypes> = ({
    loadingSuccedded,
    isLoading,
    handleClick,
    buttonContent,
    buttonType = "button"
}) => {
    return (
        <ButtonContainer
            className={`action-button${loadingSuccedded ? " success" : ""}`}
            onClick={handleClick}
            style={{ position: "relative" }}
            type={buttonType}
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
