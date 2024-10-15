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
import Link from "next/link"
import Image from "next/image"
import GoogleSignInIcon from "../../../../public/images/google-login.svg"
import FacebookSignInIcon from "../../../../public/images/facebook-login.svg"
import AppleSignInIcon from "../../../../public/images/apple-login.svg"
import ReCAPTCHAComponent from "../../components/common/ReCAPTCHA"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { SigninSchema, SigninValidationSchema } from "@/validations/auth/signin"
import { Spinner } from "react-bootstrap"

export default function SignIn() {
    const [user, setUser] = useState<User>()
    const router = useRouter()
    const accessToken = getAccessToken()
    const [captchaToken, setCaptchaToken] = useState<string | null>(null)
    const [captchaValid, setCaptchaValid] = useState<boolean>(true)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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
    } = useForm<SigninSchema>({ resolver: zodResolver(SigninValidationSchema) })
    const submitHandler = async (data: SigninSchema) => {
        try {
            if (!captchaToken || !captchaValid) {
                toast.error("Please complete/verify captcha")
                return
            }
            setIsLoading(true)
            const requestData = {
                email: data.email_address,
                password: data.password,
                captchaToken,
            }
            const response = await FetchHelper.post(config.API_ENDPOINTS.LOGIN_CLIENT, requestData)
            if (response.status_code == config.STATUS_CODES.SUCCESS) {
                toast.success(response.message)
                localStorage.setItem(
                    config.LOCAL_STORAGE_VARIABLES.ACCESS_TOKEN,
                    response?.data?.token,
                )
                localStorage.setItem(
                    config.LOCAL_STORAGE_VARIABLES.USER_EMAIL,
                    response?.data?.email,
                )
                localStorage.setItem(
                    config.LOCAL_STORAGE_VARIABLES.USER_FULLNAME,
                    response?.data?.full_name,
                )
                setIsLoading(true)
                router.push("/booking/1/create")
            } else {
                toast.error(response.message)
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

    return (
        <CustomLayout user={user} isLoading={isLoading}>
            <section className="py-4">
                <div className="container">
                    <div className="row justify-content-center sign-in">
                        <div className="col-md-6 col-lg-5 col-sm-12 form">
                            <h5 className="mb-3 text-center bold-text">Login now</h5>
                            <p className="text-center grey-text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            </p>
                            <Form onSubmit={handleSubmit(submitHandler)}>
                                <Row>
                                    <Form.Group className="mb-4" controlId="email_address">
                                        <Form.Label>Email Id</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email address"
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
                                    <Form.Group className="mb-2" controlId="password">
                                        <Form.Label>Password</Form.Label>
                                        <div className="input-group">
                                            <Form.Control
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter your password"
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
                                        <Form.Label className="float-end p-2">
                                            <Link href="/" className="grey-text">
                                                Forgot Password?
                                            </Link>
                                        </Form.Label>
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
                                                "Sigin"
                                            )}
                                        </button>
                                    </div>
                                </Row>
                                <Row className="p-3">
                                    <h6>
                                        <span>Or Sign in with</span>
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
                                        New user?{" "}
                                        <Link href="/sign-up" className="text-decoration-none">
                                            <span className="bold-text text-dark ">
                                                Create account
                                            </span>
                                        </Link>
                                    </p>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        </CustomLayout>
    )
}
