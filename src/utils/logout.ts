import { ErrorType } from "@/types/common/error"
import toast from "react-hot-toast"
import { config } from "./constants"

export const logout = async () => {
    try {
        localStorage.removeItem(config.LOCAL_STORAGE_VARIABLES.ACCESS_TOKEN)
        localStorage.removeItem(config.LOCAL_STORAGE_VARIABLES.USER_EMAIL)
        localStorage.removeItem(config.LOCAL_STORAGE_VARIABLES.USER_FULLNAME)
    } catch (error) {
        const { message } = error as ErrorType
        if (message) {
            toast(message, config.TOASTER_OPTIONS.ERROR)
        } else {
            toast(config.MESSAGES.GENERIC_ERROR, config.TOASTER_OPTIONS.ERROR)
        }
    }
}
