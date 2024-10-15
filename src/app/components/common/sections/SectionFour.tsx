import React from "react"
import Image from "next/image"
import { LuCheckCircle } from "react-icons/lu"

/**
 * Custom component renders the div with image being right side and content on left which can be reused.
 * @param {object} props - The props object containing image data.
 * @returns {JSX.Element} The rendered element
 */
const SectionFour = ({ section_4_img }: { section_4_img: string }) => {
    return (
        <div className="d-flex justify-content-center align-items-center py-5 bg-color-sectionOne">
            <div className="container max-w-7xl p-6">
                <div className="row g-4">
                    {/* Image Section for md and Larger */}
                    <div className="col-md-6 d-none d-md-block">
                        {section_4_img && (
                            <Image
                                src={section_4_img}
                                alt="section_4_img"
                                className="img-fluid rounded"
                                width={650}
                                height={700}
                            />
                        )}
                    </div>

                    {/* Text Section */}
                    <div className="col-md-6">
                        <h2 className="display-6 font-weight-bold mb-4 text-color">
                            Why be a self-employed cleaner?
                        </h2>

                        {/* Image Section for Mobile */}
                        <div className="d-md-none mb-4">
                            {section_4_img && (
                                <Image
                                    src={section_4_img}
                                    alt="section_4_img"
                                    className="img-fluid rounded"
                                    width={650}
                                    height={700}
                                />
                            )}
                        </div>

                        <ul className="list-unstyled mb-8 text-lg">
                            <li className="d-flex align-items-start mb-3">
                                <span className="me-3">
                                    <LuCheckCircle size={23} className="text-color" />
                                </span>
                                <div>
                                    When you are self-employed, you have great flexibility. You
                                    choose how many hours you work and at what times of day. For
                                    instance, if you have young children, you may wish to focus on
                                    working during school time.
                                </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                                <span className="me-3">
                                    <LuCheckCircle size={23} className="text-color" />
                                </span>
                                <div>
                                    Similarly, working just mornings, afternoons, or evenings may
                                    work best for you.
                                </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                                <span className="me-3">
                                    <LuCheckCircle size={23} className="text-color" />
                                </span>
                                <div>
                                    Choosing where you work and when has many benefits, helping you
                                    to avoid expensive child-minding costs and disrupting family
                                    life. If you find that you prefer working with specific clients,
                                    then our bookings team can tailor your work schedule to suit.
                                </div>
                            </li>
                            <li className="d-flex align-items-start mb-3">
                                <span className="me-3">
                                    <LuCheckCircle size={23} className="text-color" />
                                </span>
                                <div>
                                    Being self-employed and working from a home base in Manchester
                                    means that you can deduct some costs from your earnings so that
                                    you pay less tax.
                                </div>
                            </li>
                            <li className="d-flex align-items-start">
                                <span className="me-3 flex-shrink-0">
                                    <LuCheckCircle size={23} className="text-color" />
                                </span>
                                <div>
                                    Don’t worry if you are unsure as to which expenses are
                                    deductible; simply contact{" "}
                                    <a
                                        href="https://www.gov.uk/government/collections/self-employment-detailed-information"
                                        className="text-primary text-decoration-underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        HMRC
                                    </a>{" "}
                                    for details of allowable expenses. The Gov.uk website is very
                                    informative.
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionFour
