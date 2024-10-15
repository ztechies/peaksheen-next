import ReCAPTCHA from "react-google-recaptcha"

interface ReCAPTCHAComponentProps {
    onVerify: (token: string | null) => void
    onExpired: () => void
}

const ReCAPTCHAComponent = ({ onVerify, onExpired }: ReCAPTCHAComponentProps) => {
    const handleCaptchaChange = (value: string | null) => {
        if (value) {
            onVerify(value)
        }
    }

    const handleCaptchaExpired = () => {
        onExpired() // Notify parent that captcha expired
        onVerify(null) // Clear the token since it's expired
    }

    return (
        <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            onChange={handleCaptchaChange}
            onExpired={handleCaptchaExpired}
        />
    )
}

export default ReCAPTCHAComponent
