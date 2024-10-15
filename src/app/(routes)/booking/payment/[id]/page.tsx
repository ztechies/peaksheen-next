"use client"
import CustomLayout from "@/app/components/common/CustomLayout"
import StripeProvider from "@/app/components/stripe/StripeProvider"
import CheckoutForm from "@/app/components/stripe/CheckoutForm"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { User } from "@/types/auth/user"
import { handleError } from "@/utils/handle-error"
import { logout } from "@/utils/logout"
import { getAccessToken } from "@/utils/common"
import { FetchHelper } from "@/services/fetch-helper"
import { config } from "@/utils/constants"
import toast from "react-hot-toast"
import Row from "react-bootstrap/Row"
import WithAuth from "@/app/components/auth/Auth"
import { useRouter } from "next/navigation"

const Pyament = () => {
    const [user, setUser] = useState<User>()
    const [isLoading, setIsLoading] = useState(false)
    const accessToken = getAccessToken()
    const [paymentIntent, setPaymentIntent] = useState("")
    const [paymentIntentError, setPaymentIntentError] = useState("")
    const routeParams = useParams<{ id: string }>()
    const router = useRouter()

    const [paymentInfo, setPaymentInfo] = useState({
        currency: "",
        currency_symbol: "",
        payment_intent: "",
        per_hour_rate: "",
        service_selected: "",
        total_amount: "",
    })

    const getUser = async () => {
        try {
            setIsLoading(true)
            const response = await FetchHelper.get(config.API_ENDPOINTS.GET_USER_BY_TOKEN)
            if (response.data) {
                setUser(response.data)
                getPaymentIntent()
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

    const getPaymentIntent = async () => {
        try {
            setIsLoading(true)
            const apiUrl = new URL(
                `${config.API_ENDPOINTS.CREATE_BOOKING_PAYMENT_INTENT}/${routeParams.id ?? ""}`,
            )
            const response = await FetchHelper.get(apiUrl)
            if (response.data) {
                setPaymentIntent(response.data.payment_intent)
                setPaymentInfo(response.data)
            } else {
                setPaymentIntentError("Unable to load payment at the moment. Please try later")
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error?.response?.status == config.STATUS.UNAUTHORIZED) {
                toast.error(error?.response?.data?.message)
                setIsLoading(true)
                logout()
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

    const handleLoadingChange = (newValue: boolean) => {
        setIsLoading(newValue)
    }

    useEffect(() => {
        if (accessToken) {
            getUser()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])

    return (
        <CustomLayout user={user} isLoading={isLoading}>
            {paymentIntent && (
                <StripeProvider paymentIntent={paymentIntent}>
                    <CheckoutForm
                        handleLoadingChange={handleLoadingChange}
                        paymentInfo={paymentInfo}
                    />
                </StripeProvider>
            )}
            {(paymentIntent == "" || paymentIntent == undefined || paymentIntent == null) && (
                <>
                    <Row className="justify-content-center mt-5 mb-5">
                        <span className="alert alert-info py-3 px-3 text-center">
                            {paymentIntentError}
                            {paymentIntentError == "" && <>Please wait..</>}
                        </span>
                    </Row>
                </>
            )}
        </CustomLayout>
    )
}

export default WithAuth(Pyament)
