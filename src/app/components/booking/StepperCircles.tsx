import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { useRouter } from "next/navigation"

const StepperCircles = ({
    currentStep,
    tempBookinId,
}: {
    currentStep: number
    tempBookinId?: string
}) => {
    const router = useRouter()
    const stepperInfo = [1, 2, 3]

    const handleClick = (step: number) => {
        if (step === currentStep) return
        if (step < currentStep) {
            router.push(`/booking/${step}/${tempBookinId}`)
        }
    }

    return (
        <Row className="justify-content-center">
            <Col className="col-md-2 col-lg-2 col-sm-12">
                <ButtonGroup className="text-center">
                    {stepperInfo.map((data, idx) => (
                        <span
                            key={idx}
                            id={`stepper-${idx}`}
                            className={
                                currentStep === data
                                    ? "stepper active-stepper v-cursor-pointer"
                                    : "stepper v-cursor-pointer"
                            }
                            onClick={() => handleClick(data)}
                        ></span>
                    ))}
                </ButtonGroup>
            </Col>
        </Row>
    )
}
export default StepperCircles
