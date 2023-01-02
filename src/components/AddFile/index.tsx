import React, { useEffect, useRef } from "react"
import { IoFileTray, IoImages } from "react-icons/io5"
import { AddFilePropsType } from "../../types/types"

import { Container } from "./style"
import { handleAddFile } from "./utils"

export const AddFile: React.FC<AddFilePropsType> = ({
    show,
    setShow,
    setFiles,
}) => {
    const addFileRef: React.MutableRefObject<HTMLDivElement | null> =
        useRef(null)

    useEffect(() => {
        if (addFileRef.current && show) {
            window.addEventListener("mousedown", closeModalOnClick)
            window.addEventListener("keydown", closeModalOnEsc)
        }
        return () => {
            window.removeEventListener("mousedown", closeModalOnClick)
            window.removeEventListener("keydown", closeModalOnEsc)
        }
    }, [show])

    const handleURL = (url: string) => {
        setFiles(oldState => [...oldState, url])
    }

    const closeModalOnClick = (e: MouseEvent) => {
        if (addFileRef.current && show) {
            const { left, right, top, bottom } =
                addFileRef?.current?.getBoundingClientRect()
            if (e.x > right || e.y < top || e.x < left || e.y > bottom) {
                setShow(false)
                setFiles([])
            }
        }
    }
    const closeModalOnEsc = (e: KeyboardEvent) => {
        if (addFileRef.current && show) {
            if (e.key === "Escape") {
                setShow(false)
                setFiles([])
            }
        }
    }
    if (show)
        return (
            <Container ref={addFileRef} className="AddFile">
                <div className="addImage">
                    <label htmlFor="addImage">
                        <IoImages />
                        <span>Imagens</span>
                    </label>
                    <input
                        type="file"
                        id="addImage"
                        accept="image/*"
                        hidden
                        multiple={true}
                        onChange={e => handleAddFile(e, handleURL)}
                    />
                </div>
                <div className="addFile">
                    <label htmlFor="addFile">
                        <IoFileTray />
                        <span>Arquivos</span>
                    </label>
                    <input
                        type="file"
                        id="addFile"
                        accept="file/*"
                        hidden
                        multiple={true}
                        onChange={e => handleAddFile(e, handleURL)}
                    />
                </div>
            </Container>
        )
    return <></>
}
