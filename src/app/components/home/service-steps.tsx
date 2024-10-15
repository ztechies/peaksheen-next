import React from "react"
import ServiceStepSection from "../../components/common/ServiceStepSection"
import ServiceInfoSection from "../../components/common/ServiceInfoSection"
import { StaticImageData } from "next/image"

interface Step {
    colSize: string
    icon: StaticImageData
    title: string
    description: string
}

interface ServiceStepsSectionProps {
    steps: Step[]
}

const ServiceStepsSection: React.FC<ServiceStepsSectionProps> = ({ steps }) => {
    return (
        <ServiceStepSection>
            {steps.map((step, index) => (
                <div className={step.colSize} key={index}>
                    <ServiceInfoSection
                        icon={step.icon}
                        title={step.title}
                        description={step.description}
                    />
                </div>
            ))}
        </ServiceStepSection>
    )
}

export default ServiceStepsSection
