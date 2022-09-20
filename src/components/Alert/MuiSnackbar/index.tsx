import React from "react"
import { Snackbar } from "@mui/material"
import { useSnackbarStore } from "../../../states/snackbar"
import MuiAlert, { AlertProps } from "@mui/material/Alert"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const MuiSnackbar = () => {
    let { open, onCloseFn, closeTime, message, type } = useSnackbarStore(
        state => state
    )
    const handleClose = (
        event: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return
        }

        onCloseFn()
    }

    return (
        <Snackbar
            anchorOrigin={{ horizontal: "center", vertical: "top" }}
            open={open}
            onClose={handleClose}
            autoHideDuration={closeTime}
        >
            <Alert
                elevation={6}
                variant="filled"
                onClose={handleClose}
                color={type}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}
