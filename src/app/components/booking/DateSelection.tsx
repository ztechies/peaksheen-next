"use client"
import { useState, useEffect } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import StepperCircles from "./StepperCircles"
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/material_blue.css"
import "@/styles/scss/custom/flatpicker-calendar.scss"
import {
    BookingStepStepTwoValidationSchema,
    BookingStepStepTwoSchema,
} from "@/validations/auth/bookingStepTwo"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { Spinner } from "react-bootstrap"
import { FetchHelper } from "@/services/fetch-helper"
import { config } from "@/utils/constants"
import { useRouter, useParams } from "next/navigation"
import { handleError } from "@/utils/handle-error"
import CustomLayout from "@/app/components/common/CustomLayout"
import { User } from "@/types/auth/user"

interface prevDataProps {
    cleaningDate: string
    cleaningTime: string
    parking_options: string
    access_forcleaners: string
}

const addDays = (date: Date, days: number) => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
}

const dateOptions = {
    maxDate: addDays(new Date(), 30),
    altInputClass: "hide",
    dateFormat: "d-m-Y",
    minDate: new Date(),
    inline: true,
    allowInput: false,
    enableTime: false,
}

const timeOptions = {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: false,
    defaultDate: "10:00",
    inline: true,
}
const SelectBookingDate = ({
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
    tempBookinId?: string
    getCurrentBooking: () => void
    loading: string
}) => {
    const router = useRouter()
    const routeParams = useParams<{ step: string; id: string }>()
    const [isLoading, setIsLoading] = useState(false)
    const [cleaningDate, setCleaningDate] = useState<Date>(new Date())
    const [cleaningTime, setCleaningTime] = useState("10:00")

    const formatDate = (date: Date) => {
        const day = date.getDate().toString().padStart(2, "0")
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear()
        return `${day}-${month}-${year}`
    }

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<BookingStepStepTwoSchema>({
        resolver: zodResolver(BookingStepStepTwoValidationSchema),
    })
    const submitHandler = async (data: BookingStepStepTwoSchema) => {
        try {
            setIsLoading(true)
            const requestData = {
                cleaning_date: formatDate(cleaningDate),
                start_time: cleaningTime,
                parking_options: data.parking_option,
                access_for_cleaners: data.access_forcleaners,
            }
            const apiUrl = new URL(
                `${config.API_ENDPOINTS.CREATE_TEMP_BOOKIN_STEP_NEXT}2/${routeParams.id ?? ""}`,
            )
            const response = await FetchHelper.patch(apiUrl, requestData)
            if (response.status_code == config.STATUS_CODES.SUCCESS) {
                setIsLoading(true)
                router.push(`/booking/3/${response.data.booking_id}`)
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
    useEffect(() => {
        if (prevData?.parking_options) {
            setValue("parking_option", prevData?.parking_options)
        }
        if (prevData?.access_forcleaners) {
            setValue("access_forcleaners", prevData?.access_forcleaners)
        }
    }, [prevData, setValue])

    useEffect(() => {
        if (routeParams.id != "create" && routeParams.step === "2") {
            getCurrentBooking()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routeParams.id, routeParams.step, tempBookinId])

    return (
        <CustomLayout user={user} isLoading={loading == "yes" ? true : isLoading}>
            <div className="container mt-4 mb-5">
                <Row className="justify-content-center">
                    <Col className="col-md-6 col-lg-6 col-sm-12 text-center">
                        <h2 className="regular-font">Manage Booking</h2>
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
                <Row className="justify-content-center booking-date-selection">
                    <Col className="col-md-7 col-lg-7 col-sm-12">
                        <Card className="booking-card">
                            <Card.Body>
                                <Card.Title className="regular-font mb-4">
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
                                <Form onSubmit={handleSubmit(submitHandler)}>
                                    <Form.Label className="grey-text">
                                        Select Day for cleaning
                                    </Form.Label>
                                    <Row className="justify-content-center calendar-row">
                                        <Flatpickr
                                            data-input
                                            options={dateOptions}
                                            value={
                                                prevData?.cleaningDate ? prevData?.cleaningDate : ""
                                            }
                                            onChange={(selectedDates) => {
                                                console.log("date clicked", selectedDates[0])
                                                setCleaningDate(selectedDates[0])
                                            }}
                                        ></Flatpickr>
                                    </Row>
                                    <Form.Label className="grey-text mt-4">
                                        Starting Time
                                    </Form.Label>
                                    <Row className=" mb-3 time-row">
                                        <Flatpickr
                                            data-input
                                            value={
                                                prevData?.cleaningTime
                                                    ? prevData?.cleaningTime
                                                    : "10:00"
                                            }
                                            options={timeOptions}
                                            // eslint-disable-next-line
                                            onChange={(selectedDates, dateStr, instance) => {
                                                setCleaningTime(dateStr)
                                            }}
                                        ></Flatpickr>
                                    </Row>
                                    <Row>
                                        <Form.Group className="mb-4" controlId="parking_options">
                                            <Form.Label className="grey-text">
                                                Parking options
                                            </Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                className="parking_options"
                                                {...register("parking_option")}
                                                isInvalid={!!errors?.parking_option?.message}
                                            />
                                            {errors.parking_option && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.parking_option.message}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group
                                            className="mb-4"
                                            controlId="access_for_cleaners"
                                        >
                                            <Form.Label className="grey-text">
                                                Access for cleaners
                                            </Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={3}
                                                className="access_for_cleaners"
                                                {...register("access_forcleaners")}
                                                isInvalid={!!errors?.access_forcleaners?.message}
                                            />
                                            {errors.access_forcleaners && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.access_forcleaners.message}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </Row>
                                    <Row>
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
                                                "Continue"
                                            )}
                                        </button>
                                    </Row>
                                </Form>
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

export default SelectBookingDate
