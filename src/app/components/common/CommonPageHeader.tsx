import React from "react"
import Image from "next/image"
import { StaticImageData } from "next/image"

/**
 * Custom component renders the header which can be resued
 
 * @param {objec} [props] = The props object
 * @returns {JSX.Element} The rendered element
 */

interface CommonPageHeaderProps {
    titleLineOne: string
    titleLineTwo: string
    description: string
    image: StaticImageData // Ensure this is the correct type
    imageAlt: string
}
const CommonPageHeader: React.FC<CommonPageHeaderProps> = ({
    titleLineOne,
    titleLineTwo,
    description,
    image,
    imageAlt,
}) => {
    return (
        <section className="common-header-section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 mb-md-5 mb-lg-6 mb-sm-2">
                        <h1 className="common-header-title">
                            {titleLineOne}
                            <br />
                            <span className="common-header-highlight">{titleLineTwo}</span>
                        </h1>
                        <p className="common-header-description">{description}</p>
                    </div>
                    <div className="col-lg-6 text-center">
                        <Image src={image} alt={imageAlt} className="common-header-image" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CommonPageHeader
