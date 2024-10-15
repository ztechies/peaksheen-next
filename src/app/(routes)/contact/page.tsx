"use client"
import { config } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { useEffect, useState } from "react"
import CustomLayout from "../../components/common/CustomLayout"
import { FetchHelper } from "@/services/fetch-helper"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ContactUsSchema, ContactUsValidationSchema } from "@/validations/contact-us"
import toast from "react-hot-toast"
import { Spinner } from "react-bootstrap"
import { logout } from "@/utils/logout"
import { getAccessToken } from "@/utils/common"
import { User } from "@/types/auth/user"

export default function Contact() {
    const [user, setUser] = useState<User>()
    const accessToken = getAccessToken()
    const [isLoading, setIsLoading] = useState(false)
    const [reasonsLists, setReasonsLists] = useState([])

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ContactUsSchema>({ resolver: zodResolver(ContactUsValidationSchema) })

    const submitHandler = async (data: ContactUsSchema) => {
        try {
            setIsLoading(true)
            const response = await FetchHelper.post(config.API_ENDPOINTS.CONTACT_US, data)

            if (response.status_code == config.STATUS_CODES.SUCCESS) {
                toast.success(response.message)
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

    const getReasonList = async () => {
        try {
            setIsLoading(true)
            const response = await FetchHelper.get(config.API_ENDPOINTS.CONTACT_US_GET_REASONS_LIST)

            if (response.status_code == config.STATUS_CODES.SUCCESS) {
                setReasonsLists(response.data)
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
    useEffect(() => {
        getReasonList()
    }, [])

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
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (accessToken) getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])

    return (
        <CustomLayout user={user} isLoading={isLoading}>
            <section className="common-header-section ">
                <div className="container contact-us">
                    <div className="row">
                        <div className="col-md-6 col-lg-7 col-sm-12">
                            <h1 className="common-header-title title">
                                Contact
                                <br />
                                <span className="common-header-highlight highlight">
                                    &nbsp;Us&nbsp;
                                </span>
                            </h1>
                            <p className="common-header-description description">
                                Ready to experience a cleaner, fresher space? Fill out the form
                                below, and we&apos;ll provide you with a free, no-obligation quote
                                tailored to your needs.
                            </p>
                            <div>
                                <ul>
                                    <li>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </li>
                                    <li>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </li>
                                    <li>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </li>
                                    <li>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-5 col-sm-12 form">
                            <h6 className="mb-3">Let&apos;s get started</h6>
                            <Form onSubmit={handleSubmit(submitHandler)}>
                                <Form.Group className="mb-4" controlId="full_name">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={user?.full_name}
                                        placeholder="Enter your full name"
                                        isInvalid={!!errors?.full_name?.message}
                                        {...register("full_name")}
                                    />
                                    {errors.full_name && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.full_name.message}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-4" controlId="phone_number">
                                            <Form.Label>Phone Number</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter your phone number"
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
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-4" controlId="email_address">
                                            <Form.Label>Email Id</Form.Label>
                                            <Form.Control
                                                type="email"
                                                value={user?.email}
                                                placeholder="Enter your email address"
                                                isInvalid={!!errors?.email?.message}
                                                {...register("email")}
                                            />
                                            {errors.email && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.email.message}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-4" controlId="reason">
                                    <Form.Label>Reason</Form.Label>
                                    <Form.Select
                                        aria-label="reason"
                                        {...register("reason")}
                                        isInvalid={!!errors?.reason?.message}
                                    >
                                        <option value="">Select a reason</option>
                                        {reasonsLists.map((item, index) => (
                                            <option value={item} key={index}>
                                                {item}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    {errors.reason && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.reason.message}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="message">
                                    <Form.Label>Message</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Type your message here"
                                        {...register("message")}
                                        isInvalid={!!errors?.message?.message}
                                    />
                                    {errors.message && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.message.message}
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                                <div className="d-grid gap-2">
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
                                            "Submit"
                                        )}
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        </CustomLayout>
    )
}
