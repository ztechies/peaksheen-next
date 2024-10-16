import React, { MouseEventHandler } from "react"
import Image from "next/image"


/**
 * Custom component renders the div with image being right side and content on left which can be resued 
 
 * @param {objec} [props] = The props object
 * @returns {JSX.Element} The rendered element
 */
const SectionRight = ({
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
    icon: string
    iconAlt: string
    iconWidth: number
    iconHeight: number
    buttonTitle: string
    image: string
    imageAlt: string
    buttonHandleClick: MouseEventHandler<HTMLButtonElement>
}) => {
    const Datatitle = title
    const Datadescription = description
    return (
        <div className="row mb-5 section-right-content">
            <div className="col-md-6 py-sm-3 py-md-1 py-lg-1">
                <div className="mb-md-2 mb-lg-4 mb-sm-2 section-icon">
                    <Image
                        src={icon}
                        alt={iconAlt}
                        width={iconWidth}
                        height={iconHeight}
                        className="section-icon"
                    />
                </div>
                <h2
                    className="section-title mb-md-2 mb-lg-4 mb-sm-2 "
                    dangerouslySetInnerHTML={{ __html: Datatitle }}
                ></h2>
                <p
                    className="section-description mb-md-2 mb-lg-4 mb-sm-2 "
                    dangerouslySetInnerHTML={{ __html: Datadescription }}
                ></p>
                <button
                    type="button"
                    className="btn button-global mb-sm-3"
                    onClick={buttonHandleClick}
                >
                    {buttonTitle}
                </button>
            </div>
            <div className="col-md-6 descriptive-image">
                <Image src={image} alt={imageAlt} className="img-fluid rounded" width={500}
                        height={500} />
            </div>
        </div>
    )
}

export default SectionRight
