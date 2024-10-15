import { config } from "./constants"

export const getAccessToken = () => {
    if (typeof window !== "undefined" && localStorage) {
        const accessToken = localStorage.getItem(config.LOCAL_STORAGE_VARIABLES.ACCESS_TOKEN)
        return accessToken
    }
    return null
}

export const setAccessToken = (token: string) => {
    if (typeof window !== "undefined" && localStorage) {
        const accessToken = localStorage.setItem(config.LOCAL_STORAGE_VARIABLES.ACCESS_TOKEN, token)
        return accessToken
    }
    return null
}

export const removeAccessToken = () => {
    if (typeof window !== "undefined" && localStorage) {
        localStorage.removeItem(config.LOCAL_STORAGE_VARIABLES.ACCESS_TOKEN)
    }
}

export const getUserEmail = () => {
    if (typeof window !== "undefined" && localStorage) {
        const accessToken = localStorage.getItem(config.LOCAL_STORAGE_VARIABLES.USER_EMAIL)
        return accessToken
    }
    return null
}

export const getUserFullName = () => {
    if (typeof window !== "undefined" && localStorage) {
        const accessToken = localStorage.getItem(config.LOCAL_STORAGE_VARIABLES.USER_FULLNAME)
        return accessToken
    }
    return null
}
