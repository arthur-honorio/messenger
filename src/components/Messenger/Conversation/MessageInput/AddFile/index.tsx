import React, { useEffect, useRef } from "react"
import { IoFileTray, IoImages } from "react-icons/io5"
import { uploadFiles } from "../../../../../firebase/storageFunctions"
import { useSnackbarStore } from "../../../../../states/snackbar"

import { Container } from "./style"

type AddFileProps = {
    show: boolean
    setShow: (arg0: boolean) => void
    setImages: React.Dispatch<React.SetStateAction<{}>>
    setFiles: React.Dispatch<React.SetStateAction<{}>>
}

export const AddFile: React.FC<AddFileProps> = ({
    show,
    setShow,
    setImages,
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

    const handleURL = (url: string, index: number, isFile: boolean = false) => {
        if (isFile) {
            setFiles(oldState => ({ ...oldState, [index]: url }))
        } else {
            setImages(oldState => ({ ...oldState, [index]: url }))
        }
    }

    const handleAddFile = (
        e: React.ChangeEvent<HTMLInputElement>,
        isFile: boolean = false
    ) => {
        const MAX_SIZE = 1024 * 2
        const files = e.target.files
        const overSizedFilesError = []
        if (files) {
            for (let i = 0; i < files.length; i++) {
                if (files[i].size > MAX_SIZE) {
                    overSizedFilesError.push(files[i].name)
                } else {
                    uploadFiles(files[i], url => handleURL(url, i, isFile))
                }
            }
        }
        if (overSizedFilesError) {
            useSnackbarStore.setState({
                open: true,
                message: `Imagens com mais de 2mb: ${overSizedFilesError.join(
                    " - "
                )}`,
                type: "error",
            })
        }
    }

    const closeModalOnClick = (e: MouseEvent) => {
        if (addFileRef.current && show) {
            const { left, right, top, bottom } =
                addFileRef?.current?.getBoundingClientRect()
            if (e.x > right || e.y < top || e.x < left || e.y > bottom) {
                setShow(false)
                setImages({})
            }
        }
    }
    const closeModalOnEsc = (e: KeyboardEvent) => {
        if (addFileRef.current && show) {
            if (e.key === "Escape") {
                setShow(false)
                setImages({})
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
                        onChange={e => handleAddFile(e)}
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
                        onChange={e => handleAddFile(e, true)}
                    />
                </div>
            </Container>
        )
    return <></>
}
