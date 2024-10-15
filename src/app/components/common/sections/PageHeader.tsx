import React from "react"
import Link from "next/link"

/**
 * Custom component renders the header which can be reused
 * @param {object} [props] = The props object
 * @returns {JSX.Element} The rendered element
 */

interface CommonPageHeaderProps {
    titleLineOne: string
    description: string
    image: string
}

const CleaningHeroSection: React.FC<CommonPageHeaderProps> = ({
    titleLineOne,
    description,
    image,
}) => {
    return (
        <section className="common-header-section" style={{ backgroundImage: `url(${image})` }}>
            <div className="overlay"></div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 mb-md-5 mb-lg-6 mb-sm-2">
                        <h1 className="common-header-title text-white">{titleLineOne}</h1>
                        <p className="common-header-description text-white">{description}</p>
                        <Link href={"/cleaning-jobs/application-form"}>
                            <button type="button" className="custom-btn">
                                Apply now
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CleaningHeroSection
