"use client"
import { useState, useEffect } from "react"
import InitiateBooking from "@/app/components/booking/InitiateBooking"
import DateSelection from "@/app/components/booking/DateSelection"
import PersonalDetails from "@/app/components/booking/PersonalDetails"
import { useParams, useRouter } from "next/navigation"
import { User } from "@/types/auth/user"
import { handleError } from "@/utils/handle-error"
import { logout } from "@/utils/logout"
import { getAccessToken } from "@/utils/common"
import { FetchHelper } from "@/services/fetch-helper"
import { config } from "@/utils/constants"
import toast from "react-hot-toast"

const BookingPage = () => {
    const router = useRouter()
    const [user, setUser] = useState<User>()
    const [isLoading, setIsLoading] = useState(false)
    const accessToken = getAccessToken()
    const routeParams = useParams<{ step: string; id: string }>()
    const bookingStep = Number(routeParams.step)

    const [bookinStepInitate, setBookinStepInitate] = useState({
        frequecyOfCleans: "",
        hoursOfCleaning: "",
    })
    const [bookinStepDate, setBookinStepDate] = useState({
        cleaningDate: "",
        cleaningTime: "",
        parking_options: "",
        access_forcleaners: "",
    })
    const [bookinStepContact, setBookinStepContact] = useState({
        email: "",
        country_phonecode: "",
        phone_number: "",
        city: "",
        postal_code: "",
        address: "",
    })

    const getUser = async () => {
        try {
            setIsLoading(true)
            const response = await FetchHelper.get(config.API_ENDPOINTS.GET_USER_BY_TOKEN)
            if (response.data) {
                setUser(response.data)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            logout()
            setIsLoading(true)
            router.push("/sign-in")
        } finally {
            setIsLoading(false)
        }
    }

    const getCurrentBookingData = async () => {
        try {
            setIsLoading(true)
            const apiUrl = new URL(
                `${config.API_ENDPOINTS.GET_TEMP_BOOKING_DATA_BY_ID}${routeParams.id ?? ""}`,
            )
            const response = await FetchHelper.get(apiUrl)
            if (response.data) {
                if (bookingStep == 1) {
                    setBookinStepInitate({
                        frequecyOfCleans: response.data.clean_frequency,
                        hoursOfCleaning: response.data.cleaning_hours,
                    })
                }
                if (bookingStep == 2) {
                    setBookinStepDate({
                        cleaningDate: response.data.booking_date,
                        cleaningTime: response.data.booking_time,
                        parking_options: response.data.parking_options,
                        access_forcleaners: response.data.cleaners_access,
                    })
                }
                if (bookingStep == 3) {
                    setBookinStepContact({
                        email: response.data.contact_email,
                        country_phonecode: response.data.country_phonecode,
                        phone_number: response.data.contact_number,
                        city: response.data.city,
                        postal_code: response.data.post_code,
                        address: response.data.address,
                    })
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error?.response?.data?.data?.error_message) {
                toast.error(error?.response?.data?.data?.error_message)
            } else if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message)
            } else {
                handleError(error)
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (accessToken) getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])

    useEffect(() => {
        if (routeParams.id === "create" && routeParams.step !== "1") {
            router.push("/booking/1/create")
        }
    }, [routeParams.id, routeParams.step, router])
    return (
        <>
            {bookingStep === 1 && (
                <InitiateBooking
                    currentStep={bookingStep}
                    user={user}
                    prevData={bookinStepInitate}
                    tempBookinId={routeParams.id}
                    getCurrentBooking={getCurrentBookingData}
                    loading={isLoading ? "yes" : ""}
                />
            )}
            {bookingStep === 1 && (
                <DateSelection
                    currentStep={bookingStep}
                    user={user}
                    prevData={bookinStepDate}
                    tempBookinId={routeParams.id}
                    getCurrentBooking={getCurrentBookingData}
                    loading={isLoading ? "yes" : ""}
                />
            )}
            {bookingStep === 3 && (
                <PersonalDetails
                    currentStep={bookingStep}
                    user={user}
                    prevData={bookinStepContact}
                    tempBookinId={routeParams.id}
                    getCurrentBooking={getCurrentBookingData}
                    loading={isLoading ? "yes" : ""}
                />
            )}
        </>
    )
}

export default BookingPage
