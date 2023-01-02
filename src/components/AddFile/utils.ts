import { uploadFiles } from "../../firebase/storageFunctions"
import { useSnackbarStore } from "../../states/snackbar"

export const handleAddFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    urlCallback: (arg: string) => void
) => {
    const MAX_FILE_SIZE = 2 * 1048576 //2MB
    const files = e.target.files
    const overSizedFilesError = []
    const uploadableFiles = []
    if (files) {
        for (let index = 0; index < files.length; index++) {
            if (files[index].size > MAX_FILE_SIZE) {
                overSizedFilesError.push(files[index].name.substring(0, 15))
            } else {
                uploadableFiles.push(files[index])
            }
        }
        if (overSizedFilesError.length) {
            useSnackbarStore.setState({
                open: true,
                message: `Imagem(ns) com mais de 2mb: ${overSizedFilesError.join(
                    " - "
                )}`,
                type: "error",
            })
        }
        if (uploadableFiles.length) {
            uploadableFiles.forEach(file => {
                uploadFiles(file, urlCallback)
            })
        }
    }
}
