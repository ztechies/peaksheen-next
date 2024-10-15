import React, { MouseEventHandler } from "react"
import Image from "next/image"
import { StaticImageData } from "next/image"

/**
 * Custom component renders the div with image being right side and content on left which can be resued 
 
 * @param {objec} [props] = The props object
 * @returns {JSX.Element} The rendered element
 */
const SectionLeft = ({
    title,
    description,
    icon,
    iconAlt,
    iconWidth,
    iconHeight,
    buttonTitle,
    image,
    imageAlt,
    buttonHandleClick,
}: {
    title: string
    description: string
    icon: StaticImageData
    iconAlt: string
    iconWidth: number
    iconHeight: number
    buttonTitle: string
    image: StaticImageData
    imageAlt: string
    buttonHandleClick: MouseEventHandler<HTMLButtonElement>
}) => {
    const Datatitle = title
    const Datadescription = description
    return (
        <div className="row mb-3 section-left-content">
            <div className="col-md-6 descriptive-image">
                <Image src={image} alt={imageAlt} className="img-fluid rounded" />
            </div>
            <div className="col-md-6 content">
                <div className="ms-md-2 ms-lg-4 ms-sm-2">
                    <div className="section-icon mb-md-2 mb-lg-4 mb-sm-2 ">
                        <Image
                            src={icon}
                            alt={iconAlt}
                            width={iconWidth}
                            height={iconHeight}
                            className="section-icon"
                        />
                    </div>
                    <h2
                        className="section-title mb-md-2 mb-lg-4 mb-sm-2 mt-sm-4"
                        dangerouslySetInnerHTML={{ __html: Datatitle }}
                    ></h2>
                    <p
                        className="section-description mb-md-2 mb-lg-4 mb-sm-2 my-sm-3"
                        dangerouslySetInnerHTML={{ __html: Datadescription }}
                    ></p>
                    <button
                        type="submit"
                        className="btn button-global mb-sm-3 section-button"
                        onClick={buttonHandleClick}
                    >
                        {buttonTitle}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SectionLeft
