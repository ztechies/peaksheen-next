import {
    getEmailFieldValidationSchema,
    getPasswordFieldValidationSchema,
    getSimpleCaptchaFieldValidationSchema,
} from "@/utils/validation"
import { z } from "zod"
export const SigninValidationSchema = z.object({
    email_address: getEmailFieldValidationSchema(),
    password: getPasswordFieldValidationSchema(),
    captcha: getSimpleCaptchaFieldValidationSchema(),
})

export type SigninSchema = z.infer<typeof SigninValidationSchema>
