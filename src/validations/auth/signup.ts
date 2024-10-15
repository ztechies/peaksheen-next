import {
    getFullNameFieldValidationSchema,
    getEmailFieldValidationSchema,
    getPhoneNumberFieldValidationSchema,
    getPasswordFieldValidationSchema,
    getConfirmPasswordFieldValidationSchema,
    getSimpleCaptchaFieldValidationSchema,
    getSelectFieldValidationSchema,
} from "@/utils/validation"
import { z } from "zod"
export const SignupValidationSchema = z
    .object({
        first_name: getFullNameFieldValidationSchema("First Name"),
        last_name: getFullNameFieldValidationSchema("Last Name"),
        email_address: getEmailFieldValidationSchema(),
        phone_number: getPhoneNumberFieldValidationSchema("Mobile number"),
        password: getPasswordFieldValidationSchema(),
        password_confirmation: getConfirmPasswordFieldValidationSchema(),
        captcha: getSimpleCaptchaFieldValidationSchema(),
        country_phonecode: getSelectFieldValidationSchema("Country Phonecode"),
    })
    .refine((schema) => schema.password === schema.password_confirmation, {
        path: ["confirm_password"],
        message: "Password do not match",
    })

export type SignupSchema = z.infer<typeof SignupValidationSchema>
