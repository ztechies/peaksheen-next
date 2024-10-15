export interface UserEmailVerifyPropType {
    verification_code: string
    email: string
}

export interface User {
    email: string
    full_name: string
}

export interface WithAuthPropType {
    user?: User
}
