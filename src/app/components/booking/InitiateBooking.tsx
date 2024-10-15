"use client"
import { useState, useEffect } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import ToggleButton from "react-bootstrap/ToggleButton"
import { BsCheck } from "react-icons/bs"
import StepperCircles from "./StepperCircles"
import { FetchHelper } from "@/services/fetch-helper"
import { config } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import toast from "react-hot-toast"
import { useRouter, useParams } from "next/navigation"
import CustomLayout from "@/app/components/common/CustomLayout"
import { User } from "@/types/auth/user"

interface prevDataProps {
    frequecyOfCleans: string
    hoursOfCleaning: string
}
const InitiateBooking = ({
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
    tempBookinId: string
    getCurrentBooking: () => void
    loading: string
}) => {
    const router = useRouter()
    const routeParams = useParams<{ step: string; id: string }>()
    const [frequecyOfCleans, setFrequecyOfCleans] = useState("")
    const [hoursOfCleaning, setHoursOfCleaning] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const cleaningFrequency = [
        { name: "Weekly", value: "Weekly" },
        { name: "Fortnightly", value: "Fortnightly" },
        { name: "One-off", value: "One-off" },
    ]
    const cleanigHours = [
        { name: "3", value: "3" },
        { name: "4", value: "4" },
        { name: "5", value: "5" },
        { name: "6", value: "6" },
        { name: "7", value: "7" },
    ]

    const handleCreateTempBooking = async () => {
        try {
            setIsLoading(true)
            const requestData = {
                clean_frequency: frequecyOfCleans,
                cleaning_hours: hoursOfCleaning,
            }
            let response
            if (routeParams.id === "create") {
                response = await FetchHelper.post(
                    config.API_ENDPOINTS.CREATE_TEMP_BOOKING_STEP_ONE,
                    requestData,
                )
            } else if (
                routeParams.id != "create" &&
                routeParams.id != null &&
                routeParams.id != undefined
            ) {
                const apiUrl = new URL(
                    `${config.API_ENDPOINTS.CREATE_TEMP_BOOKIN_STEP_NEXT}1/${routeParams.id ?? ""}`,
                )
                response = await FetchHelper.patch(apiUrl, requestData)
            } else {
                toast.error("Something went wrong. Please re-start the booking process")
                router.push("/booking/1/create")
            }

            if (response.status_code == config.STATUS_CODES.SUCCESS) {
                setIsLoading(true)
                router.push(`/booking/2/${response.data.booking_id}`)
            } else {
                toast.error(response.message)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error?.response?.data?.data?.error_message) {
                toast.error(error?.response?.data?.data?.error_message)
            } else if (
                error?.response?.data?.status_code &&
                error?.response?.data?.status_code == config.STATUS_CODES.UNAUTHORIZED
            ) {
                toast.error(error?.response?.data?.message)
                router.push("/sign-in")
            } else if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message)
            } else {
                handleError(error)
            }
            console.log("here")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (routeParams.id != "create" && routeParams.step == "1") {
            getCurrentBooking()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routeParams.id, routeParams.step, router])

    useEffect(() => {
        if (
            prevData?.frequecyOfCleans != null &&
            prevData.frequecyOfCleans != undefined &&
            prevData.frequecyOfCleans != ""
        ) {
            setFrequecyOfCleans(prevData?.frequecyOfCleans)
        }
        if (
            prevData?.hoursOfCleaning != null &&
            prevData.hoursOfCleaning != undefined &&
            prevData.hoursOfCleaning != ""
        ) {
            setHoursOfCleaning(prevData?.hoursOfCleaning)
        }
    }, [prevData])
    return (
        <CustomLayout user={user} isLoading={loading == "yes" ? true : isLoading}>
            <div className="container mt-4 mb-5">
                <Row className="justify-content-center">
                    <Col className="col-md-6 col-lg-6 col-sm-12 text-center">
                        <h2 className="regular-font">Manage Bookings</h2>
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
                <Row className="justify-content-center">
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

                                <Row>
                                    <Form.Label>Frequency of cleans</Form.Label>
                                    <ButtonGroup style={{ padding: "5px" }}>
                                        {cleaningFrequency.map((radio, idx) => (
                                            <ToggleButton
                                                key={idx}
                                                id={`radio-${idx}`}
                                                type="radio"
                                                className={
                                                    frequecyOfCleans === radio.value
                                                        ? "grey-text frequency active-frequency"
                                                        : "grey-text frequency inactive-frequency"
                                                }
                                                name="frequency_of_cleans"
                                                value={radio.value}
                                                checked={frequecyOfCleans === radio.value}
                                                onChange={(e) =>
                                                    setFrequecyOfCleans(e.currentTarget.value)
                                                }
                                            >
                                                {radio.name}{" "}
                                                {frequecyOfCleans === radio.value ? (
                                                    <BsCheck className="check" />
                                                ) : (
                                                    ""
                                                )}
                                            </ToggleButton>
                                        ))}
                                    </ButtonGroup>
                                </Row>
                                <Row className="mt-4">
                                    <Form.Label>Hours of cleaning</Form.Label>
                                    <ButtonGroup style={{ padding: "5px" }}>
                                        {cleanigHours.map((radio, idx) => (
                                            <ToggleButton
                                                key={idx}
                                                id={`hours-${idx}`}
                                                type="radio"
                                                className={
                                                    hoursOfCleaning === radio.value
                                                        ? "grey-text hours active-hours"
                                                        : "grey-text hours inactive-hours"
                                                }
                                                name="hours_of_cleans"
                                                value={radio.value}
                                                checked={hoursOfCleaning === radio.value}
                                                onChange={(e) =>
                                                    setHoursOfCleaning(e.currentTarget.value)
                                                }
                                            >
                                                {radio.name}
                                            </ToggleButton>
                                        ))}
                                    </ButtonGroup>
                                </Row>
                                <Row className="mt-4">
                                    <Form.Group className="mb-4" controlId="full_name">
                                        <Form.Label>Discount Code</Form.Label>
                                        <div className="search-row">
                                            <Form.Control className="discount-code" type="text" />
                                            <button className="btn button-global">Apply</button>
                                        </div>
                                    </Form.Group>
                                </Row>
                                <Row className="mx-1">
                                    <button
                                        className="btn button-global"
                                        onClick={handleCreateTempBooking}
                                    >
                                        Continue
                                    </button>
                                </Row>
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

export default InitiateBooking
