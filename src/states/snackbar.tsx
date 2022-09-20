import create from "zustand"

type useSnackbarStoreType = {
    open: boolean
    onCloseFn: () => void
    closeTime: number
    message: string
    type: "error" | "warning" | "info" | "success"
}

export const useSnackbarStore = create<useSnackbarStoreType>(set => ({
    open: false,
    onCloseFn: () => set({ open: false }),
    closeTime: 4000,
    message: "",
    type: "success",
}))
