import {
    getFullNameFieldValidationSchema,
    getPhoneNumberFieldValidationSchema,
    getEmailFieldValidationSchema,
    getSelectFieldValidationSchema,
    getMessageFieldValidationSchema,
} from "@/utils/validation"
import { z } from "zod"

export const ContactUsValidationSchema = z.object({
    full_name: getFullNameFieldValidationSchema("Full Name"),
    phone_number: getPhoneNumberFieldValidationSchema("Phone Number"),
    email: getEmailFieldValidationSchema(),
    reason: getSelectFieldValidationSchema("Reason"),
    message: getMessageFieldValidationSchema("Message"),
})

export type ContactUsSchema = z.infer<typeof ContactUsValidationSchema>
