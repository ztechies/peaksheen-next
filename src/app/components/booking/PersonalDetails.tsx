"use client"
import { useState, useEffect } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import StepperCircles from "./StepperCircles"
import CustomLayout from "@/app/components/common/CustomLayout"
import { User } from "@/types/auth/user"
import { logout } from "@/utils/logout"
import { config } from "@/utils/constants"
import { FetchHelper } from "@/services/fetch-helper"
import toast from "react-hot-toast"
import { handleError } from "@/utils/handle-error"
import { UpdateProfileSchema, UpdateProfileValidationSchema } from "@/validations/auth/profile"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter, useParams } from "next/navigation"
import { Spinner } from "react-bootstrap"

interface prevDataProps {
    email: string
    country_phonecode: string
    phone_number: string
    city: string
    postal_code: string
    address: string
}

const PersonalDetailsForBooking = ({
    currentStep,
    user,
    prevData,
    tempBookinId,
    getCurrentBooking,
    loading,
}: {
    currentStep: number
    user?: User
    prevData?: prevDataProps
    tempBookinId?: string
    getCurrentBooking: () => void
    loading: string
}) => {
    const routeParams = useParams<{ step: string; id: string }>()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const [profile, setProfile] = useState({
        first_name: "",
        last_name: "",
        email: "",
        country_phonecode: "",
        phone_number: "",
        city: "",
        postal_code: "",
        address: "",
    })

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<UpdateProfileSchema>({ resolver: zodResolver(UpdateProfileValidationSchema) })
    const submitHandler = async (data: UpdateProfileSchema) => {
        try {
            setIsLoading(true)
            const requestData = {
                country_phonecode: data.country_phonecode,
                phone_number: data.phone_number,
                email: data.email_address,
                address: data.address,
                city: data.city,
                postal_code: data.postal_code,
            }
            const apiUrl = new URL(
                `${config.API_ENDPOINTS.CREATE_TEMP_BOOKIN_STEP_NEXT}3/${routeParams.id ?? ""}`,
            )
            const response = await FetchHelper.patch(apiUrl, requestData)
            if (response.status_code == config.STATUS_CODES.SUCCESS) {
                setIsLoading(true)
                router.push(`/booking/payment/${response.data.booking_id}`)
            } else {
                toast.error(response.message)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error?.response?.status === config.STATUS_CODES.VALIDATION_ERROR) {
                toast.error(error?.response?.data?.message)
            } else if (error?.response?.data?.data?.error_message) {
                toast.error(error?.response?.data?.data?.error_message)
            } else {
                handleError(error)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const getUserProfile = async () => {
        try {
            setIsLoading(true)
            const response = await FetchHelper.get(config.API_ENDPOINTS.GET_USER_PROFILE_BY_TOKEN)
            if (response.data) {
                setProfile(response.data)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            logout()
            if (error?.response?.data?.data?.error_message) {
                toast.error(error?.response?.data?.data?.error_message)
            } else if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message)
            } else {
                handleError(error)
            }
            // router.push("/sign-in")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (!prevData) {
            getUserProfile()
        } else if (prevData) {
            if (user) {
                const fullName = user.full_name.split(" ")
                setValue("first_name", fullName[0] ? fullName[0] : "")
                setValue("last_name", fullName[1] ? fullName[1] : "")
            }
            if (prevData.email != undefined && prevData.email != "" && prevData.email != null) {
                setValue("email_address", prevData.email)
                setValue("country_phonecode", prevData.country_phonecode)
                setValue("phone_number", prevData.phone_number)
                setValue("city", prevData.city)
                setValue("postal_code", prevData.postal_code)
                setValue("address", prevData.address)
            } else {
                getUserProfile()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prevData])

    useEffect(() => {
        if (profile && (prevData?.email == undefined || prevData.email == "")) {
            setValue("first_name", profile.first_name)
            setValue("last_name", profile.last_name)
            setValue("email_address", profile.email)
            setValue("country_phonecode", profile.country_phonecode)
            setValue("phone_number", profile.phone_number)
            setValue("city", profile.city)
            setValue("postal_code", profile.postal_code)
            setValue("address", profile.address)
        }
    }, [profile, setValue, prevData?.email])

    useEffect(() => {
        if (routeParams.id != "create" && routeParams.step === "3") {
            getCurrentBooking()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routeParams.id, routeParams.step, tempBookinId])

    return (
        <CustomLayout user={user} isLoading={loading == "yes" ? true : isLoading}>
            <div className="container mt-4 mb-5">
                <Row className="justify-content-center">
                    <Col className="col-md-6 col-lg-6 col-sm-12 text-center">
                        <h2 className="regular-font">Manage Booking</h2>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col className="col-md-8 col-lg-8 col-sm-12 text-center">
                        <p className="text-center grey-text">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto eveniet
                            expedita natus suscipit aliquid mollitia eos! Modi obcaecati deleniti,
                            iure ut sunt sapiente culpa esse perspiciatis impedit, vero tempore
                            natus.
                        </p>
                    </Col>
                </Row>
                <Row className="justify-content-center booking-date-selection">
                    <Col className="col-md-7 col-lg-7 col-sm-12">
                        <Card className="booking-card">
                            <Card.Body>
                                <Card.Title className="grey-text">
                                    One Step away from your booking
                                </Card.Title>
                                <ul className="booking-data-info-list">
                                    <li>
                                        Flexible Schedules: Choose Weekly, fortnightly, or one-off
                                        cleaning.
                                    </li>
                                    <li>Customizable Duration: Select 3-hour or 6 hour cleans.</li>
                                    <li>
                                        Tailored Preferences: Adjust frequency and duration to fit
                                        your lifestyle.
                                    </li>
                                </ul>
                                <Form className="form" onSubmit={handleSubmit(submitHandler)}>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-4" controlId="first_name">
                                                <Form.Label>First name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    isInvalid={!!errors?.first_name?.message}
                                                    {...register("first_name")}
                                                />
                                                {errors.first_name && (
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.first_name.message}
                                                    </Form.Control.Feedback>
                                                )}
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-4" controlId="last_name">
                                                <Form.Label>Last name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder=""
                                                    isInvalid={!!errors?.last_name?.message}
                                                    {...register("last_name")}
                                                />
                                                {errors.last_name && (
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.last_name.message}
                                                    </Form.Control.Feedback>
                                                )}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Form.Group className="mb-4" controlId="phone_number">
                                            <Form.Label>Phone number</Form.Label>
                                            <div className="input-group">
                                                <Form.Select
                                                    aria-label="Country Code"
                                                    className="country-code-container"
                                                    isInvalid={!!errors?.country_phonecode?.message}
                                                    {...register("country_phonecode")}
                                                >
                                                    {config.MOBILE_COUNTRY_PHONE_CODE.map(
                                                        (item, index) => (
                                                            <option value={item} key={index}>
                                                                {item}
                                                            </option>
                                                        ),
                                                    )}
                                                </Form.Select>

                                                {errors.country_phonecode && (
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.country_phonecode.message}
                                                    </Form.Control.Feedback>
                                                )}
                                                <Form.Control
                                                    type="number"
                                                    placeholder=""
                                                    onKeyDown={(e) => {
                                                        if (
                                                            e.key === "ArrowUp" ||
                                                            e.key === "ArrowDown"
                                                        ) {
                                                            e.preventDefault()
                                                        }
                                                    }}
                                                    isInvalid={!!errors?.phone_number?.message}
                                                    {...register("phone_number")}
                                                />
                                                {errors.phone_number && (
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.phone_number.message}
                                                    </Form.Control.Feedback>
                                                )}
                                            </div>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-4" controlId="email_address">
                                                <Form.Label>Email Id</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    isInvalid={!!errors?.email_address?.message}
                                                    {...register("email_address")}
                                                />

                                                {errors.email_address && (
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.email_address.message}
                                                    </Form.Control.Feedback>
                                                )}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-4" controlId="postal_code">
                                                <Form.Label>Post code</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    isInvalid={!!errors?.postal_code?.message}
                                                    {...register("postal_code")}
                                                />
                                                {errors.postal_code && (
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.postal_code.message}
                                                    </Form.Control.Feedback>
                                                )}
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-4" controlId="email_address">
                                                <Form.Label>City</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    isInvalid={!!errors?.city?.message}
                                                    {...register("city")}
                                                />

                                                {errors.city && (
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.city.message}
                                                    </Form.Control.Feedback>
                                                )}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Form.Group className="mb-4" controlId="address">
                                            <Form.Label>Address</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                {...register("address")}
                                                isInvalid={!!errors?.address?.message}
                                            />

                                            {errors.address && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.address.message}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </Row>

                                    <Row>
                                        <button className="btn button-global">
                                            {isSubmitting ? (
                                                <Spinner
                                                    animation="border"
                                                    role="status"
                                                    variant="light"
                                                    size="sm"
                                                />
                                            ) : (
                                                "Update"
                                            )}
                                        </button>
                                    </Row>
                                </Form>
                                <StepperCircles
                                    currentStep={currentStep}
                                    tempBookinId={tempBookinId}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </CustomLayout>
    )
}

export default PersonalDetailsForBooking
