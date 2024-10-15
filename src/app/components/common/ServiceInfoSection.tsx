import React from "react"
import Image from "next/image"
import { StaticImageData } from "next/image"

/**
 * Custom component renders the StepSection which can be resued
 
 * @param {objec} [props] = The props object
 * @returns {JSX.Element} The rendered element
 */
const ServiceInfoSection = ({
    icon,
    title,
    description,
}: {
    icon: StaticImageData
    title: string
    description: string
}) => {
    return (
        <div className="service-step d-flex align-items-center p-3">
            <Image src={icon} alt={title} width={50} height={50} className="me-3" />
            <div className="service-content">
                <h5 className="service-step-title">{title}</h5>
                <p className="service-step-description">{description}</p>
            </div>
        </div>
    )
}

export default ServiceInfoSection
