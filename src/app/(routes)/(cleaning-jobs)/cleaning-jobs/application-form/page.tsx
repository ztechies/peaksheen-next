"use client"

import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import ApplicationForm from "@/app/components/applicationForm/ApplicationForm"
import { FormDataFieldType } from "@/types/components/form"
import { calculatePoint, handleFailure } from "@/utils/helpers"
import { useRouter } from "next/navigation"
import { FetchHelper, findAddressService, submitApplication } from "@/services/fetch-helper"
import { deleteFileFromS3, uploadFileToS3 } from "@/utils/resumeHandler"
import CustomLayout from "@/app/components/common/CustomLayout"
import { config } from "@/utils/constants"
import { getAccessToken } from "@/utils/common"
import { User } from "@/types/auth/user"
import { logout } from "@/utils/logout"

const ApplicationPage = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
        setValue,
        control,
        setError,
    } = useForm()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isFinding, setIsFinding] = useState(false)

    const [user, setUser] = useState<User>()
    const accessToken = getAccessToken()

    const getUser = async () => {
        try {
            const response = await FetchHelper.get(config.API_ENDPOINTS.GET_USER_BY_TOKEN)
            if (response.data) {
                setUser(response.data)
            }
        } catch (error) {
            logout()
        }
    }

    useEffect(() => {
        if (accessToken) getUser()
    }, [accessToken])
    const findAddress = async () => {
        try {
            setIsFinding(true)
            const { postcode } = getValues()
            if (!postcode) {
                handleFailure("Please enter postcode")
                return
            }
            // Fetch the address
            const response = await findAddressService(postcode)
            // If the address is found
            if (response.results && response.results.length) {
                setValue("address", response.results[0].formatted_address, { shouldValidate: true })
            } else {
                handleFailure("No address found")
                setValue("address", "")
            }
        } catch (error) {
            console.error("Error in findAddress:", error)
            handleFailure("Failed to fetch address. Please try again.")
        } finally {
            setIsFinding(false)
        }
    }

    // Prepare form data
    const prepareFormData = (data: FormDataFieldType) => {
        const formData = new FormData()
        const formFields = {
            name: data.name,
            email: data.email,
            postcode: data.postcode,
            address: data.address,
            mobile: `${config.MOBILE_COUNTRY_PHONE_CODE} ${data.mobileNumber.slice(2)}`,
            experience: `${
                Number(data.cleaningExperienceYear) * 12 + Number(data.cleaningExperienceMonth)
            }`,
            preferred_hours: data.preferredHours.toString(),
            preferred_days: data.selectedDays.map(({ value }) => value).join(","),
            dbs_check: data.dbs_check,
            work_areas: data.selectedAreas.map(({ value }) => value).join(","),
            certificate_date: data.certificateDate
                ? new Date(data.certificateDate).toISOString().split("T")[0]
                : "",
            own_transport: data.own_transport,
            right_to_work: data.rights,
        }
        // Append all form fields dynamically
        Object.entries(formFields).forEach(([key, value]) => formData.append(key, value))
        // Calculate pre-hire points and append if present
        const pre_hire_points = calculatePoint(formData)
        if (pre_hire_points) formData.append("pre_hire_points", pre_hire_points.toString())
        return formData
    }

    // Handle file upload to S3
    const handleFileUpload = async (file: File) => {
        if (!file) return null
        const reader = new FileReader()
        return new Promise<string | null>((resolve, reject) => {
            reader.onloadend = async () => {
                const fileData = { buffer: reader.result, fileName: file.name }
                try {
                    const result:
                        | {
                              success: boolean
                              fileUrl: string
                          }
                        | undefined = await uploadFileToS3(fileData, {
                        bucketName: config.AWS_S3.BUCKET ?? "",
                        folder: config.AWS_S3.FOLDER ?? "",
                    })
                    result?.success && resolve(result.fileUrl)
                } catch (error) {
                    handleFailure("CV upload failed")
                    console.error("File upload failed:", error)
                    reject(error)
                }
            }
            reader.onerror = (err) => {
                console.error("File reading failed:", err)
                reject(err)
            }
            reader.readAsArrayBuffer(file)
        })
    }

    // Submit form to the server
    const submitForm = async (formData: FormData) => {
        try {
            const response = await submitApplication(formData)
            if (response.errorType) {
                return { success: false, error: response }
            }
            return { success: true, data: response }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            throw new Error(error.message || "Form submission failed")
        }
    }

    // Handle success
    const handleSuccess = () => {
        reset()
        router.push("/cleaning-jobs/thank-you")
    }

    const onSubmitHandle: SubmitHandler<FormDataFieldType> = async (data: FormDataFieldType) => {
        setIsSubmitting(true)
        let resumeUrl = null
        try {
            const formData = prepareFormData(data)
            // Attempt to upload the resume file
            resumeUrl = await handleFileUpload(data.cv[0])
            if (!resumeUrl) {
                throw new Error("Resume upload failed. Please try again.")
            }
            formData.append("resume_link", resumeUrl)
            // Submit the form data
            const response = await submitForm(formData)
            if (response.success) {
                handleSuccess()
            } else if (response.error) {
                const { errorType, message } = response.error
                // Handle email errors
                if (errorType === "email") {
                    setError("email", {
                        type: "manual",
                        message,
                    })
                }
                // Handle validation errors
                else if (errorType === "validation") {
                    handleFailure(message || "Validation failed. Please check the form")
                }
                // Handle server errors
                else if (errorType === "server") {
                    handleFailure(message || "Something went wrong")
                }
                // Handle network errors
                else if (errorType === "network") {
                    handleFailure(message || "Network issue. Please check your connection")
                }
                // Handle unknown errors
                else {
                    handleFailure(message || "Form submission failed, please try again")
                }
                // If any error occurred after form submitting then delete the uploaded resume from S3
                if (resumeUrl) {
                    await deleteFileFromS3(resumeUrl, config.AWS_S3.BUCKET ?? "")
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Submission error:", error)
            handleFailure("An error occurred while submitting the form. Please try again")
            if (resumeUrl) {
                try {
                    await deleteFileFromS3(resumeUrl, config.AWS_S3.BUCKET ?? "")
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (deleteError: any) {
                    console.error("Failed to delete resume from S3:", deleteError.message)
                }
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <CustomLayout user={user}>
                <ApplicationForm
                    register={register}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    onSubmitHandle={onSubmitHandle}
                    control={control}
                    findAddress={findAddress}
                    isSubmitting={isSubmitting}
                    isFinding={isFinding}
                />
            </CustomLayout>
        </>
    )
}

export default ApplicationPage
