"use client"
import { User } from "@/types/auth/user"
import { config } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { logout } from "@/utils/logout"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import CustomLayout from "../../components/common/CustomLayout"
import { FetchHelper } from "@/services/fetch-helper"
import { getAccessToken } from "@/utils/common"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Link from "next/link"
import Image from "next/image"
import GoogleSignInIcon from "../../../../public/images/google-login.svg"
import FacebookSignInIcon from "../../../../public/images/facebook-login.svg"
import AppleSignInIcon from "../../../../public/images/apple-login.svg"
import ReCAPTCHAComponent from "../../components/common/ReCAPTCHA"
import { SignupSchema, SignupValidationSchema } from "@/validations/auth/signup"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { Spinner } from "react-bootstrap"
import { FaEye, FaEyeSlash } from "react-icons/fa"

export default function SignIn() {
    const [user, setUser] = useState<User>()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const accessToken = getAccessToken()
    const [captchaToken, setCaptchaToken] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [captchaValid, setCaptchaValid] = useState<boolean>(true)

    const handleCaptchaVerify = (token: string | null) => {
        setCaptchaToken(token)
        if (token) {
            setCaptchaValid(true) // Captcha is valid
        }
    }

    const handleCaptchaExpired = () => {
        setCaptchaValid(false) // Captcha expired
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupSchema>({ resolver: zodResolver(SignupValidationSchema) })
    const submitHandler = async (data: SignupSchema) => {
        try {
            if (!captchaToken || !captchaValid) {
                toast.error("Please complete/verify captcha")
                return
            }
            setIsLoading(true)
            const requestData = {
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email_address.toLowerCase(),
                phone_number: data.phone_number,
                password: data.password,
                password_confirmation: data.password_confirmation,
                country_phonecode: data.country_phonecode,
                captchaToken,
            }
            const response = await FetchHelper.post(
                config.API_ENDPOINTS.REGISTER_CLIENT,
                requestData,
            )
            if (response.status_code == config.STATUS_CODES.SUCCESS) {
                toast.success(response.message)
                // router.push("/booking/")
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
                router.push("/booking/1/create")
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
    useEffect(() => {
        if (accessToken) getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])
    return (
        <CustomLayout user={user} isLoading={isLoading}>
            <section className="py-4">
                <div className="container">
                    <div className="row justify-content-center sign-in">
                        <div className="col-md-6 col-lg-5 col-sm-12 form">
                            <h5 className="mb-3 text-center bold-text">Register</h5>
                            <p className="text-center grey-text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </p>
                            <Form onSubmit={handleSubmit(submitHandler)}>
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
                                    <Form.Group className="mb-4" controlId="email_address">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder=""
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
                                    <Form.Group className="mb-4" controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <div className="input-group">
                                            <Form.Control
                                                type={showPassword ? "text" : "password"}
                                                placeholder=""
                                                isInvalid={!!errors?.password?.message}
                                                {...register("password")}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                            {errors.password && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.password.message}
                                                </Form.Control.Feedback>
                                            )}
                                        </div>
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group className="mb-2" controlId="password_confirmation">
                                        <Form.Label>Confirm Password</Form.Label>
                                        <div className="input-group">
                                            <Form.Control
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder=""
                                                isInvalid={!!errors?.password_confirmation?.message}
                                                {...register("password_confirmation")}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                onClick={() =>
                                                    setShowConfirmPassword(!showConfirmPassword)
                                                }
                                            >
                                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                            {errors.password_confirmation && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.password_confirmation.message}
                                                </Form.Control.Feedback>
                                            )}
                                        </div>
                                    </Form.Group>
                                </Row>
                                <Row className="mt-3 mb-3">
                                    <Form.Control
                                        type="hidden"
                                        isInvalid={!!errors?.captcha?.message}
                                        value={captchaToken || ""}
                                        {...register("captcha")}
                                    />
                                    <ReCAPTCHAComponent
                                        onVerify={handleCaptchaVerify}
                                        onExpired={handleCaptchaExpired}
                                    />

                                    {errors.captcha && (
                                        <Form.Control.Feedback type="invalid">
                                            {errors.captcha.message}
                                        </Form.Control.Feedback>
                                    )}
                                </Row>
                                <Row>
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
                                                "Register"
                                            )}
                                        </button>
                                    </div>
                                </Row>
                            </Form>
                            <Row className="p-3">
                                <h6>
                                    <span>Or Sign up with</span>
                                </h6>
                            </Row>
                            <Row>
                                <div className="text-center">
                                    <Image
                                        className="cursor-pointer me-3"
                                        src={GoogleSignInIcon}
                                        alt="Google-Sign-In"
                                        width={50}
                                        height={50}
                                    />
                                    <Image
                                        className="cursor-pointer me-3"
                                        src={FacebookSignInIcon}
                                        alt="Facebook-Sign-In"
                                        width={50}
                                        height={50}
                                    />
                                    <Image
                                        className="cursor-pointer me-3"
                                        src={AppleSignInIcon}
                                        alt="Apple-Sign-In"
                                        width={50}
                                        height={50}
                                    />
                                </div>
                            </Row>
                            <Row className="mt-4">
                                <p className="text-center grey-text">
                                    Already have an account?{" "}
                                    <Link href="/sign-in" className="text-decoration-none">
                                        <span className="bold-text text-dark ">Sign in</span>
                                    </Link>
                                </p>
                            </Row>
                        </div>
                    </div>
                </div>
            </section>
        </CustomLayout>
    )
}
