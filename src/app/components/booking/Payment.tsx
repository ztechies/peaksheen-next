import Row from "react-bootstrap/Row"
import StepperCircles from "./StepperCircles"

const ThankYouForBooking = ({
    prevStep,
    currentStep,
}: {
    prevStep: () => void
    currentStep: number
}) => {
    return (
        <div>
            <h1>Thank you for booking </h1>
            <Row>
                <button className="btn button-global" onClick={prevStep}>
                    back
                </button>
            </Row>
            <StepperCircles currentStep={currentStep} />
        </div>
    )
}

export default ThankYouForBooking
