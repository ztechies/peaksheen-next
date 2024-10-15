import {
    getFullNameFieldValidationSchema,
    getEmailFieldValidationSchema,
    getPhoneNumberFieldValidationSchema,
    getSelectFieldValidationSchema,
    getMessageFieldValidationSchema,
    getSimpleTextFieldValidationSchema,
} from "@/utils/validation"
import { z } from "zod"
export const UpdateProfileValidationSchema = z.object({
    first_name: getFullNameFieldValidationSchema("First Name"),
    last_name: getFullNameFieldValidationSchema("Last Name"),
    email_address: getEmailFieldValidationSchema(),
    phone_number: getPhoneNumberFieldValidationSchema("Mobile number"),
    country_phonecode: getSelectFieldValidationSchema("Country Phonecode"),
    city: getSimpleTextFieldValidationSchema("City"),
    postal_code: getSimpleTextFieldValidationSchema("Postcode"),
    address: getMessageFieldValidationSchema("Address"),
})

export type UpdateProfileSchema = z.infer<typeof UpdateProfileValidationSchema>
