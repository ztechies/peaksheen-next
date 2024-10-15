import React from "react"

/**
 * Custom component renders the StepSection which can be resued
 
 * @param {objec} [props] = The props object
 * @returns {JSX.Element} The rendered element
 */
const ServiceStepSection = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className="service-steps-section py-2 my-5">
            <div className="container">
                <div className="row justify-content-center">{children}</div>
            </div>
        </section>
    )
}

export default ServiceStepSection
