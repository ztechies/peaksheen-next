import React from "react"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface StripeProviderProps {
    children: React.ReactNode
    paymentIntent: string
}

const StripeProvider: React.FC<StripeProviderProps> = ({ children, paymentIntent }) => {
    const appearance = {
        theme: "stripe" as const,
        variables: {
            colorIcon: "#6772e5",
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        },
    }

    const options = {
        clientSecret: paymentIntent,
        appearance,
    }
    return (
        <Elements stripe={stripePromise} options={options}>
            {children}
        </Elements>
    )
}

export default StripeProvider
