"use client"

import { FormDataFieldType } from "@/types/components/form"
import { formFieldValues } from "@/utils/helpers"
import React, { FormEventHandler, useEffect, useState } from "react"
import { Spinner } from "react-bootstrap"
import Form from "react-bootstrap/Form"
import {
    Control,
    Controller,
    FieldErrors,
    RegisterOptions,
    SubmitHandler,
    UseFormRegisterReturn,
} from "react-hook-form"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import Select from "react-select"

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleSubmit: (data: any) => FormEventHandler<HTMLFormElement>
    onSubmitHandle: SubmitHandler<FormDataFieldType>
    register: (name: string, options?: RegisterOptions) => UseFormRegisterReturn
    errors: FieldErrors<FormDataFieldType>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: Control<FormDataFieldType | any>
    findAddress: () => Promise<void>
    isSubmitting: boolean
    isFinding: boolean
}

const ApplicationForm: React.FC<Props> = ({
    register,
    handleSubmit,
    errors,
    onSubmitHandle,
    control,
    findAddress,
    isSubmitting,
    isFinding,
}) => {
    const [dayArr, setDayArr] = useState<string[]>([])
    useEffect(() => {
        for (let i = 3; i <= 30; i++) {
            setDayArr((prev: string[]) => [...prev, i.toString()])
        }
    }, [])
    return (
        <div className="container-fluid pt-5 py-5 px-3 application-form ">
            <div
                className={`container bg-opacity-80 rounded-md p-4 col-md-12 col-lg-8 col-xl-5 form booking-card ${
                    isSubmitting ? "opacity-80" : ""
                }`}
            >
                <h3 className="text-center h3 mb-4">Application Form</h3>
                <Form onSubmit={handleSubmit(onSubmitHandle)}>
                    <div className="row">
                        {/* Name Field */}
                        <div className="col-md-6 mb-4">
                            <Form.Group controlId="name">
                                <Form.Label>Name*</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your full name"
                                    {...register("name", { required: "Name is required" })}
                                    isInvalid={!!errors?.name?.message}
                                />
                                {errors.name && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name.message}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                        </div>

                        <div className="col-md-6 mb-4">
                            <Form.Group controlId="postcode">
                                <Form.Label>Postcode*</Form.Label>
                                <div className="d-flex">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Postcode"
                                        maxLength={8}
                                        {...register("postcode", {
                                            required: "Postcode is required",
                                        })}
                                        isInvalid={!!errors.postcode}
                                    />
                                    <button
                                        type="button"
                                        onClick={findAddress}
                                        className="ms-3 custom-btn-2"
                                    >
                                        {isFinding ? (
                                            <>
                                                <Spinner animation="border" size="sm" />{" "}
                                                <span className="pl-2">Finding...</span>
                                            </>
                                        ) : (
                                            "Find address"
                                        )}
                                    </button>
                                </div>
                                {errors.postcode && (
                                    <Form.Text className="text-danger">
                                        {errors.postcode.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </div>

                        {/* Address Field */}
                        <div className="col-md-6 mb-4">
                            <Form.Group controlId="address">
                                <Form.Label>Address*</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    placeholder="Enter house name/number manually"
                                    {...register("address", { required: "Address is required" })}
                                    isInvalid={!!errors?.address?.message}
                                />
                                {errors.address && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.address.message}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                        </div>

                        {/* Email Field */}
                        <div className="col-md-6 mb-4">
                            <Form.Group controlId="email">
                                <Form.Label>Email*</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    isInvalid={!!errors?.email?.message}
                                />
                                {errors.email && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email.message}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                        </div>

                        {/* Mobile Number Field */}
                        <div className="col-md-6 mb-4">
                            <Form.Group controlId="mobileNumber">
                                <Form.Label>Mobile*</Form.Label>
                                <Controller
                                    name="mobileNumber"
                                    control={control}
                                    rules={{ required: "Mobile number is required" }}
                                    render={({ field }) => (
                                        <PhoneInput
                                            country={"gb"}
                                            value={field.value}
                                            onChange={(phone) => field.onChange(phone)}
                                            placeholder="Enter Mobile Number"
                                            disableDropdown={true}
                                            countryCodeEditable={false}
                                        />
                                    )}
                                />
                                {errors.mobileNumber && (
                                    <Form.Text className="text-danger">
                                        {errors.mobileNumber.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </div>

                        {/* Cleaning Experience Field */}
                        <div className="col-md-6 mb-4">
                            <Form.Group controlId="cleaningExperienceYear">
                                <Form.Label>Cleaning Experience*</Form.Label>
                                <div className="d-flex">
                                    <Form.Control
                                        type="number"
                                        placeholder="Years"
                                        {...register("cleaningExperienceYear", {
                                            required: "Cleaning experience in years is required",
                                            max: {
                                                value: 20,
                                                message: "Maximum experience allowed is 20 years",
                                            },
                                        })}
                                        onKeyDown={(e) => {
                                            if (["-", "e", "+"].includes(e.key)) e.preventDefault()
                                        }}
                                        isInvalid={!!errors.cleaningExperienceYear}
                                    />
                                    <Controller
                                        name="cleaningExperienceMonth"
                                        control={control}
                                        rules={{
                                            required: "Cleaning experience in months is required",
                                        }}
                                        render={({ field }) => (
                                            <Form.Select
                                                {...field}
                                                className="ms-3"
                                                isInvalid={!!errors.cleaningExperienceMonth}
                                            >
                                                <option value="">Select Month</option>
                                                {Array.from({ length: 13 }, (_, index) => (
                                                    <option key={index} value={index + 1}>
                                                        {index} Month
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        )}
                                    />
                                </div>
                                {/* Display error messages */}
                                {(errors.cleaningExperienceYear ||
                                    errors.cleaningExperienceMonth) && (
                                    <Form.Text className="text-danger">
                                        {errors.cleaningExperienceYear?.message ||
                                            errors.cleaningExperienceMonth?.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </div>

                        {/* DBS Check Field */}
                        <div className="col-md-6 mb-4">
                            <Form.Group controlId="dbs_check">
                                <Form.Label>DBS Check*</Form.Label>
                                <div className="d-flex">
                                    <Form.Check
                                        inline
                                        type="radio"
                                        id="yesDBS"
                                        label="Yes"
                                        value="yes"
                                        {...register("dbs_check", {
                                            required: "DBS check is required",
                                        })}
                                        isInvalid={!!errors.dbs_check}
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        id="noDBS"
                                        label="No"
                                        value="no"
                                        {...register("dbs_check", {
                                            required: "DBS check is required",
                                        })}
                                        isInvalid={!!errors.dbs_check}
                                    />
                                </div>
                                {/* Display error message */}
                                {errors.dbs_check && (
                                    <Form.Text className="text-danger">
                                        {errors.dbs_check.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </div>

                        {/* Own Transport Field */}
                        <div className="col-md-6 mb-4">
                            <Form.Group controlId="own_transport">
                                <Form.Label>Own Transport*</Form.Label>
                                <div className="d-flex">
                                    <Form.Check
                                        inline
                                        type="radio"
                                        id="yesTransport"
                                        label="Yes"
                                        value="yes"
                                        {...register("own_transport", {
                                            required: "Own Transport is required.",
                                        })}
                                        isInvalid={!!errors.own_transport}
                                    />
                                    <Form.Check
                                        inline
                                        type="radio"
                                        id="noTransport"
                                        label="No"
                                        value="no"
                                        {...register("own_transport", {
                                            required: "Own Transport is required",
                                        })}
                                        isInvalid={!!errors.own_transport}
                                    />
                                </div>
                                {/* Display error message */}
                                {errors.own_transport && (
                                    <Form.Text className="text-danger">
                                        {errors.own_transport.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </div>

                        {/* Certificate Date Field */}
                        <div className="col-md-6 mb-4">
                            <Form.Group controlId="certificateDate">
                                <Form.Label>Certificate Date*</Form.Label>
                                <Controller
                                    name="certificateDate"
                                    control={control}
                                    rules={{ required: "Certificate date is required" }}
                                    render={({ field }) => (
                                        <Form.Control
                                            type="date"
                                            value={field.value || ""}
                                            onChange={field.onChange}
                                            placeholder="Pick a date"
                                            className={`form-control ${
                                                errors.certificateDate ? "is-invalid" : ""
                                            }`}
                                            max={new Date().toISOString().split("T")[0]} // Prevent future dates
                                        />
                                    )}
                                />
                                {errors.certificateDate && (
                                    <Form.Control.Feedback type="invalid">
                                        {errors.certificateDate.message}
                                    </Form.Control.Feedback>
                                )}
                            </Form.Group>
                        </div>

                        <div className="col-md-6 mb-4">
                            <Form.Group controlId="selectedDays">
                                <Form.Label>Preferred Days to Work*</Form.Label>
                                <Controller
                                    name="selectedDays"
                                    control={control}
                                    rules={{ required: "Preferred days required" }}
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <Select
                                            closeMenuOnSelect={false}
                                            options={formFieldValues.daysList}
                                            isMulti
                                            onChange={(selectedOptions) => {
                                                onChange(selectedOptions)
                                            }}
                                            onBlur={onBlur}
                                            value={value}
                                            ref={ref}
                                        />
                                    )}
                                />
                                {/* Error handling */}
                                {errors.selectedDays && (
                                    <Form.Text className="text-danger">
                                        {errors.selectedDays.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </div>

                        {/* Work Areas Field */}
                        <div className="col-md-6 mb-4">
                            <Form.Group controlId="preferredHours">
                                <Form.Label>Preferred Hours (per week)*</Form.Label>
                                <Controller
                                    name="preferredHours"
                                    control={control}
                                    rules={{ required: "Preferred hours required" }}
                                    render={({ field }) => (
                                        <Form.Select
                                            {...field}
                                            className={`form-control ${
                                                errors?.preferredHours ? "is-invalid" : ""
                                            }`}
                                        >
                                            <option value="">Select Work Area</option>
                                            {dayArr.map((area, index) => (
                                                <option key={index} value={area}>
                                                    {area}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    )}
                                />
                                {/* Display error message */}
                                {errors.preferredHours && (
                                    <Form.Text className="text-danger">
                                        {errors.preferredHours.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </div>

                        <div className="col-md-6 mb-4">
                            <Form.Group controlId="selectedAreas">
                                <Form.Label>Areas Available to Work*</Form.Label>
                                <Controller
                                    name="selectedAreas"
                                    control={control}
                                    rules={{ required: "Minimum one area is required" }}
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <Select
                                            closeMenuOnSelect={false}
                                            options={formFieldValues.nearestAreas}
                                            isMulti
                                            onChange={(selectedOptions) => {
                                                onChange(selectedOptions)
                                            }}
                                            onBlur={onBlur}
                                            value={value}
                                            ref={ref}
                                        />
                                    )}
                                />
                                {/* Error handling */}
                                {errors.selectedAreas && (
                                    <Form.Text className="text-danger">
                                        {errors.selectedAreas.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </div>
                        {/* Right to Work Field */}
                        <div className="col-md-6">
                            <Form.Group controlId="rights">
                                <Form.Label>Right to work (for UK)*</Form.Label>
                                <Controller
                                    name="rights"
                                    control={control}
                                    rules={{ required: "Right to work required" }}
                                    render={({ field }) => (
                                        <Form.Select
                                            {...field}
                                            className={`form-control ${
                                                errors?.rights ? "is-invalid" : ""
                                            }`}
                                        >
                                            <option value="">Select Right to Work</option>
                                            {formFieldValues.rightsArr.map((area, index) => (
                                                <option key={index} value={area}>
                                                    {area}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    )}
                                />
                                {/* Display error message */}
                                {errors.rights && (
                                    <Form.Text className="text-danger">
                                        {errors.rights.message}
                                    </Form.Text>
                                )}
                            </Form.Group>
                        </div>
                        <div className="col-md-6 mb-4">
                            <Form.Group controlId="cv">
                                <Form.Label>Choose CV*</Form.Label>
                                <div className="p-1 border-2 border-gray-500 rounded-lg">
                                    <Controller
                                        name="cv"
                                        control={control}
                                        rules={{
                                            required: "CV is required",
                                            validate: {
                                                acceptedFormats: (value) => {
                                                    const file = value?.[0] // Check if file exists
                                                    const allowedTypes = [
                                                        "application/pdf",
                                                        "application/msword",
                                                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                                    ]
                                                    return file && allowedTypes.includes(file.type)
                                                        ? true
                                                        : "Only PDF or DOC files are allowed"
                                                },
                                                fileSizeLimit: (value) => {
                                                    const file = value?.[0] // Check if file exists
                                                    const maxSizeInBytes = 3 * 1024 * 1024 // 3MB
                                                    return file && file.size <= maxSizeInBytes
                                                        ? true
                                                        : "File size should be less than 3MB"
                                                },
                                            },
                                        }}
                                        render={({
                                            field: { onChange, onBlur, ref },
                                            fieldState: { error },
                                        }) => (
                                            <>
                                                <Form.Control
                                                    type="file"
                                                    onChange={(
                                                        e: React.ChangeEvent<HTMLInputElement>,
                                                    ) => onChange(e.target.files)}
                                                    onBlur={onBlur}
                                                    ref={ref}
                                                    className={`block w-full text-sm text-gray-500 ${
                                                        error ? "is-invalid" : ""
                                                    }`}
                                                />
                                                {error && (
                                                    <Form.Control.Feedback type="invalid">
                                                        {error.message}
                                                    </Form.Control.Feedback>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>
                                <small className="text-gray-500 text-xs mx-2 text-muted">
                                    PDF or DOC files are allowed
                                </small>{" "}
                                <br />
                            </Form.Group>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button
                                type="submit"
                                className="d-flex align-items-center custom-btn-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Spinner animation="border" size="sm" />
                                        <span className="ps-2">Submitting...</span>
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default ApplicationForm
