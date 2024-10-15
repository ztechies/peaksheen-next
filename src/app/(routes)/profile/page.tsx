"use client"
import { useEffect, useState } from "react"
import WithAuth from "../../components/auth/Auth"
import CustomLayout from "../../components/common/CustomLayout"
import { User } from "@/types/auth/user"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { Spinner } from "react-bootstrap"
import { UpdateProfileSchema, UpdateProfileValidationSchema } from "@/validations/auth/profile"
import { useForm } from "react-hook-form"
import { FetchHelper } from "@/services/fetch-helper"
import { config } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { getAccessToken } from "@/utils/common"
import { logout } from "@/utils/logout"
import { useRouter } from "next/navigation"

const Profile = () => {
    const accessToken = getAccessToken()
    const [user, setUser] = useState<User>()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
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
        formState: { errors, isSubmitting },
    } = useForm<UpdateProfileSchema>({ resolver: zodResolver(UpdateProfileValidationSchema) })
    const submitHandler = async () => {
        try {
            setIsLoading(true)
            const response = await FetchHelper.get(config.API_ENDPOINTS.REGISTER_CLIENT)
            if (response.status_code == config.STATUS_CODES.SUCCESS) {
                setProfile(response.data)
            } else {
                toast.error(response.message)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error?.response?.data?.data?.error_message) {
                toast.error(error?.response?.data?.data?.error_message)
            } else {
                handleError(error)
            }
        } finally {
            setIsLoading(false)
        }
    }

    const getUser = async () => {
        try {
            setIsLoading(true)
            const response = await FetchHelper.get(config.API_ENDPOINTS.GET_USER_BY_TOKEN)
            if (response.data) {
                setUser(response.data)
                getUserProfile()
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
        if (accessToken) getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])

    return (
        <CustomLayout user={user}>
            <section className="mt-4">
                <div className="container">
                    <div className="text-end">
                        <a
                            className="text-decoration-none v-cursor-pointer btn button-global"
                            title="Booking"
                            href="/my-bookings"
                        >
                            My Bookings
                        </a>
                    </div>
                    <Row className="justify-content-center sign-in">
                        <Col className="col-md-6 col-lg-6 col-sm-12 form">
                            <Form onSubmit={handleSubmit(submitHandler)}>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-4" controlId="first_name">
                                            <Form.Label>First name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder=""
                                                value={profile.first_name}
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
                                                value={profile.last_name}
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
                                    <Form.Group className="mb-4" controlId="email_address">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder=""
                                            value={profile.email}
                                            isInvalid={!!errors?.email_address?.message}
                                            {...register("email_address")}
                                        />
                                        {errors.email_address && (
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email_address.message}
                                            </Form.Control.Feedback>
                                        )}
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group className="mb-4" controlId="phone_number">
                                        <Form.Label>Phone number</Form.Label>
                                        <div className="input-group">
                                            <Form.Select
                                                aria-label="Country Code"
                                                className="country-code-container"
                                                value={profile.country_phonecode}
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
                                                value={profile.phone_number}
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
                                        <Form.Group className="mb-4" controlId="city">
                                            <Form.Label>City</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder=""
                                                value={profile.city}
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
                                    <Col>
                                        <Form.Group className="mb-4" controlId="postal_code">
                                            <Form.Label>Postcode</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder=""
                                                value={profile.postal_code}
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
                                </Row>
                                <Row>
                                    <Form.Group className="mb-4" controlId="message">
                                        <Form.Label>Message</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder=""
                                            value={profile.address}
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
                                    <div className="d-grid gap-2 d-none">
                                        <button
                                            className={`btn button-global ${
                                                isLoading ? "disabled" : ""
                                            } `}
                                            type="submit"
                                        >
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
                                    </div>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </section>
        </CustomLayout>
    )
}

export default WithAuth(Profile)
