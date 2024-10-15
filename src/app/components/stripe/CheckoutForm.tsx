"use client"
import type { StripeError } from "@stripe/stripe-js"
import React, { useState } from "react"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "next/image"
import PrePaymentInfoImage from "../../../../public/images/booking/pre-payment.png"
import { useParams } from "next/navigation"
import toast from "react-hot-toast"

interface paymentInfoProps {
    currency: string
    currency_symbol: string
    payment_intent: string
    per_hour_rate: string
    service_selected: string
    total_amount: string
}

interface CheckoutFormProps {
    handleLoadingChange: (newValue: boolean) => void
    paymentInfo: paymentInfoProps
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
    handleLoadingChange,
    paymentInfo,
}): JSX.Element => {
    const [payment, setPayment] = React.useState<{
        status: "initial" | "processing" | "error"
    }>({ status: "initial" })
    const [errorMessage, setErrorMessage] = React.useState<string>("")
    const routeParams = useParams<{ id: string }>()

    const stripe = useStripe()
    const elements = useElements()

    const [isProcessing, setIsProcessing] = useState(false)
    // const [paymentSuccess, setPaymentSuccess] = useState(false)

    const PaymentStatus = ({ status }: { status: string }) => {
        switch (status) {
            case "processing":
            case "requires_payment_method":
            case "requires_confirmation":
                return <h6>Processing...</h6>

            case "requires_action":
                return <h6>Authenticating...</h6>

            case "succeeded":
                return <h6>Payment Succeeded</h6>

            case "error":
                return (
                    <>
                        <h6>Error</h6>
                        <p className="error-message text-danger">{errorMessage}</p>
                    </>
                )

            default:
                return null
        }
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        try {
            setIsProcessing(true)
            handleLoadingChange(true)
            e.preventDefault()
            // Abort if form isn't valid
            if (!e.currentTarget.reportValidity()) return
            if (!elements || !stripe) return

            setPayment({ status: "processing" })

            const { error: submitError } = await elements.submit()

            if (submitError) {
                setPayment({ status: "error" })
                setErrorMessage(submitError.message ?? "An unknown error occurred")
                setIsProcessing(false)
                handleLoadingChange(false)
                return
            }
            const clientSecret = paymentInfo.payment_intent
            const { error: confirmError } = await stripe!.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: `${window.location.origin}/booking/payment-confirmation/${
                        routeParams.id ?? ""
                    }`,
                },
            })

            if (confirmError) {
                setPayment({ status: "error" })
                setErrorMessage(confirmError.message ?? "An unknown error occurred")
                toast.error("An unknown error occurred")
            }
        } catch (err) {
            setIsProcessing(false)
            handleLoadingChange(false)
            const { message } = err as StripeError

            setPayment({ status: "error" })
            setErrorMessage(message ?? "An unknown error occurred")
            toast.error(
                "An unknown error occurred while payment. Please contact support for more details.",
            )
        } finally {
            handleLoadingChange(false)
            setIsProcessing(false)
        }
    }

    // useEffect(() => {
    //     if (!elements || !stripe) {
    //         toast.error("Unable to load the payment ")
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [elements,stripe])

    return (
        <div className="container mt-4 mb-5">
            {paymentInfo.payment_intent && elements && stripe && (
                <>
                    <Row className="justify-content-center">
                        <Col className="col-md-6 col-lg-6 col-sm-12 text-center">
                            <h2 className="regular-font">Manage Booking</h2>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col className="col-md-8 col-lg-8 col-sm-12 text-center">
                            <p className="text-center grey-text">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                                eveniet expedita natus suscipit aliquid mollitia eos! Modi obcaecati
                                deleniti, iure ut sunt sapiente culpa esse perspiciatis impedit,
                                vero tempore natus.
                            </p>
                        </Col>
                    </Row>

                    <Row className="justify-content-center text-center">
                        <p>
                            Test card details : 4242 4242 4242 4242
                            <br />
                            Expiry : future date
                            <br />
                            cvv : any 3 digits
                        </p>
                    </Row>
                    <Row className="justify-content-center">
                        <Col className="col-md-8 col-lg-7 col-sm-12">
                            <Row className="payment-card">
                                <Col className="px-0">
                                    <div className="position-relative">
                                        <Image
                                            src={PrePaymentInfoImage}
                                            alt="Image"
                                            className="img-fluid w-100"
                                        />
                                        <div className="position-absolute top-50 start-50 translate-middle text-center overlay">
                                            <div className="text-white">
                                                <h5 className="mb-4">Checkout</h5>
                                                <h1 className="mb-3 checkout-amount-text">
                                                    {paymentInfo.currency_symbol}
                                                    {paymentInfo.total_amount}
                                                </h1>
                                                <span className="button-global v-cursor-pointer no-curve-border">
                                                    {paymentInfo.service_selected} service
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col className="mt-4">
                                    <form onSubmit={handleSubmit}>
                                        <fieldset className="elements-style">
                                            <div className="FormRow elements-style">
                                                <PaymentElement />
                                            </div>
                                        </fieldset>
                                        <button
                                            className="btn button-global mt-4"
                                            type="submit"
                                            disabled={!stripe || isProcessing}
                                        >
                                            {isProcessing ? "Processing..." : "Pay Now"}
                                        </button>
                                    </form>
                                    <PaymentStatus status={payment.status} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </>
            )}
            {(paymentInfo.payment_intent == "" ||
                paymentInfo.payment_intent == undefined ||
                paymentInfo.payment_intent == null) && (
                <>
                    <Row className="justify-content-center">
                        <span className="alert alert-warning py-3 px-3 text-center">
                            Unable to load payment at the moment. Please try again later.
                        </span>
                    </Row>
                </>
            )}
            {(!elements || !stripe) && (
                <>
                    <Row className="justify-content-center">
                        <span className="alert alert-warning py-3 px-3 text-center">
                            Payment session expired. Please try again.
                        </span>
                    </Row>
                </>
            )}
        </div>
    )
}

export default CheckoutForm
