"use client"
import React, { useEffect, useState } from "react"
import { config } from "@/utils/constants"
import toast from "react-hot-toast"
import CustomLayout from "@/app/components/common/CustomLayout"
import ThankYouPage from "@/app/components/common/ThankYouPage"
import { useSearchParams } from "next/navigation"
import { FetchHelper } from "@/services/fetch-helper"
import { handleError } from "@/utils/handle-error"
import NotFoundPage from "@/app/not-found"

export default function EmailVerification() {
    const [isLoading, setIsLoading] = useState(false)
    const searchParams = useSearchParams()
    const user_id = searchParams.get("user_id") ?? ""
    const token = searchParams.get("token") ?? ""
    const [emailVerified, setEmailVerified] = useState(0)
    const [emailVerificationMessage, setEmailVerificationMessage] = useState("")

    const verifyEmail = async () => {
        try {
            setIsLoading(true)
            const requestData = {
                user_id,
                token,
            }
            const response = await FetchHelper.post(
                config.API_ENDPOINTS.CLIENT_VERIFY_EMAIL,
                requestData,
            )
            if (response.status_code == config.STATUS_CODES.SUCCESS) {
                setEmailVerified(1)
                setEmailVerificationMessage(response.message)
            } else {
                toast.error(response.message)
                setEmailVerified(2)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error?.response?.data?.data?.error_message) {
                toast.error(error?.response?.data?.data?.error_message)
            } else {
                handleError(error)
            }
            setEmailVerified(2)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        verifyEmail()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user_id, token])

    return (
        <CustomLayout isLoading={isLoading}>
            {emailVerified == 1 && <ThankYouPage message={emailVerificationMessage} />}
            {emailVerified == 2 && <NotFoundPage />}
        </CustomLayout>
    )
}
