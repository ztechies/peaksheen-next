"use client"
import CustomLayout from "@/app/components/common/CustomLayout"
import { useState, useEffect } from "react"
import { User } from "@/types/auth/user"
import { handleError } from "@/utils/handle-error"
import { getAccessToken } from "@/utils/common"
import { FetchHelper } from "@/services/fetch-helper"
import { config } from "@/utils/constants"
import toast from "react-hot-toast"
import Row from "react-bootstrap/Row"
import WithAuth from "@/app/components/auth/Auth"
import ThankYouPage from "@/app/components/common/ThankYouPage"
import { useSearchParams, useParams, useRouter } from "next/navigation"
import { logout } from "@/utils/logout"

const PaymentConfirmation = () => {
    const [user, setUser] = useState<User>()
    const [isLoading, setIsLoading] = useState(false)
    const accessToken = getAccessToken()
    const [paymentStatusUpdate, setPaymentStatusUpdate] = useState(false)
    const [confirmationTitle, setConfirmationTitle] = useState("Payment transaction is completed")
    const [confirmationSubTitle, setConfirmationSubTitle] = useState(
        "Payment transaction is completed. We're currently verifying the transaction and will confirm your booking shortly.",
    )
    const queryParams = useSearchParams()
    const routeParams = useParams<{ id: string }>()
    const bookingId = routeParams.id
    const paymentIntent = queryParams.get("payment_intent")
    const stripeStatus = queryParams.get("redirect_status")
    const router = useRouter()

    const getUser = async () => {
        try {
            setIsLoading(true)
            const response = await FetchHelper.get(config.API_ENDPOINTS.GET_USER_BY_TOKEN)
            if (response.data) {
                setUser(response.data)
                paymentConfirmation()
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

    const paymentConfirmation = async () => {
        try {
            const requestData = {
                payment_intent: paymentIntent,
                stripe_payment_status: stripeStatus,
            }
            setIsLoading(true)
            const apiUrl = new URL(
                `${config.API_ENDPOINTS.BOOKING_PAYMENT_CONFIRMATION}/${bookingId ?? ""}`,
            )
            const response = await FetchHelper.patch(apiUrl, requestData)
            if (response.status_code === config.STATUS_CODES.SUCCESS) {
                setPaymentStatusUpdate(true)
                toast.success(response.message)
            } else if (response.status_code === config.STATUS_CODES.CREATED) {
                setPaymentStatusUpdate(true)
                setConfirmationTitle(response.message.title)
                setConfirmationSubTitle(response.message.subtitle)
                toast.success(response.message.title)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error?.response?.status === config.STATUS_CODES.VALIDATION_ERROR) {
                setIsLoading(false)
                router.push("/booking/1/create")
                toast.error(error?.response?.data?.message)
            } else if (error?.response?.data?.data?.error_message) {
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
        if (accessToken) {
            getUser()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])

    const listPoints = [
        "Next Step: You will receive a confirmation email or text shortly with the details of your booking,  including the date, time, and assigned cleaner",
        "We're Here to Help: If you have any questions or need to make changes, contact us,  and we'll assist you promptly.",
    ]

    return (
        <>
            <CustomLayout user={user} isLoading={isLoading}>
                {paymentStatusUpdate && stripeStatus == "succeeded" && (
                    <ThankYouPage
                        message={confirmationTitle}
                        subtext={confirmationSubTitle}
                        listPoints={listPoints}
                    />
                )}
                {!paymentStatusUpdate && (
                    <>
                        <Row className="justify-content-center mt-5 mb-5">
                            <span className="alert alert-info py-3 px-3 text-center col-2">
                                Please wait..
                            </span>
                        </Row>
                    </>
                )}
                {stripeStatus != "succeeded" && (
                    <>
                        <Row className="justify-content-center mt-5 mb-5">
                            <span className="alert alert-info py-3 px-3 text-center col-4">
                                Unable to verify the payment at the moment. Please contact support
                                team for further details.
                            </span>
                        </Row>
                    </>
                )}
            </CustomLayout>
        </>
    )
}

export default WithAuth(PaymentConfirmation)
