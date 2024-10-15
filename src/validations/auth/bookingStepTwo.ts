import { getCommonInformationFieldValidationSchema } from "@/utils/validation"
import { z } from "zod"
export const BookingStepStepTwoValidationSchema = z.object({
    parking_option: getCommonInformationFieldValidationSchema("Parking options"),
    access_forcleaners: getCommonInformationFieldValidationSchema("Access for cleaners"),
})

export type BookingStepStepTwoSchema = z.infer<typeof BookingStepStepTwoValidationSchema>
