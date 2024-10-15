import React from "react"
import Link from "next/link"
import { LuCheckCircle } from "react-icons/lu"
import Image from "next/image"

/**
 * Custom component renders the div with section_3_img being right side and content on left which can be resued
 * @param {objec} [props] = The props object
 * @returns {JSX.Element} The rendered element
 */

const SectionThree = ({ section_3_img }: { section_3_img: string }) => {
    return (
        <div className="position-relative h-auto">
            {section_3_img && (
                <Image
                    src={section_3_img}
                    alt="section_3_img"
                    className="position-absolute w-100 h-100 top-0 start-0 object-cover"
                    loading="eager"
                    width={650}
                    height={700}
                />
            )}
            <div className="position-relative d-flex justify-content-center align-items-center h-100 bg-color-opacity">
                <div className="container py-6 px-2 text-lg">
                    <div className="row text-white">
                        {/* Online Access Section */}
                        <div className="col-12 col-md-6 p-4">
                            <h2 className="display-4 font-weight-bold mb-4">
                                New to self-employment?
                            </h2>
                            <p className="mb-4 lead">
                                Don’t worry if this is your first time being self-employed. It’s
                                easier than you think.
                            </p>
                            <ul className="list-unstyled mb-4">
                                <li className="d-flex align-items-start mb-3">
                                    <span className="me-3">
                                        <LuCheckCircle size={23} className="list-icon-color" />
                                    </span>
                                    <span>
                                        You will need to register with{" "}
                                        <a
                                            href="https://www.gov.uk/government/collections/self-employment-detailed-information"
                                            className="text-info text-decoration-underline list-icon-color"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            HMRC
                                        </a>{" "}
                                        using this link.
                                    </span>
                                </li>
                                <li className="d-flex align-items-start mb-3">
                                    <span className="me-3">
                                        <LuCheckCircle size={23} className="list-icon-color" />
                                    </span>
                                    You won&lsquo;t pay any income tax until you earn more than
                                    £12,750 per year.
                                </li>
                                <li className="d-flex align-items-start mb-3">
                                    <span className="me-3">
                                        <LuCheckCircle size={23} className="list-icon-color" />
                                    </span>
                                    Work expenses can be offset against income so keep receipts of
                                    any travel, clothing, or supplies purchased.
                                </li>
                                <li className="d-flex align-items-start mb-3">
                                    <span className="me-3">
                                        <LuCheckCircle size={23} className="list-icon-color" />
                                    </span>
                                    Once registered with HMRC, simply fill in your tax return online
                                    each year.
                                </li>
                                <li className="d-flex align-items-start mb-3">
                                    <span className="me-3">
                                        <LuCheckCircle size={23} className="list-icon-color" />
                                    </span>
                                    Don’t forget that if you receive benefits you should let them
                                    know you have started work.
                                </li>
                                <li className="d-flex align-items-start mb-3">
                                    <span className="me-3">
                                        <LuCheckCircle size={23} className="list-icon-color" />
                                    </span>
                                    <span>
                                        In-work benefits such as{" "}
                                        <a
                                            href="https://www.gov.uk/universal-credit/how-to-claim"
                                            className="text-info text-decoration-underline list-icon-color"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Universal Credit
                                        </a>{" "}
                                        can be claimed if you fit the criteria.
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Support Section */}
                        <div className="col-12 col-md-6 p-4">
                            <h2 className="display-4 font-weight-bold mb-4">
                                How to join our team
                            </h2>
                            <p className="mb-4 lead">
                                Click on the link below to apply to work as a flexible full or
                                part-time cleaner in the Manchester area.
                            </p>
                            <ul className="list-unstyled mb-4">
                                <li className="d-flex align-items-start mb-3">
                                    <span className="me-3">
                                        <LuCheckCircle size={23} className="list-icon-color" />
                                    </span>
                                    All we ask is that you are reliable, honest, and hardworking,
                                    speak clear English, and can supply proof of experience.
                                </li>
                                <li className="d-flex align-items-start mb-3">
                                    <span className="me-3">
                                        <LuCheckCircle size={23} className="list-icon-color" />
                                    </span>
                                    All of our staff are fully DBS checked before starting work.
                                </li>
                                <li className="d-flex align-items-start mb-3">
                                    <span className="me-3">
                                        <LuCheckCircle size={23} className="list-icon-color" />
                                    </span>
                                    You need to be able to communicate well with each client,
                                    representing the company to a high standard.
                                </li>
                            </ul>
                            <p className="pt-3">
                                So what are you waiting for? Click on the link below and apply to
                                work as a self-employed cleaner today. The position brings with it
                                so many benefits and is fully flexible.
                            </p>
                            <p className="text-left pt-2">
                                <Link
                                    href={"/cleaning-jobs/application-form"}
                                    className="text-info text-lg text-left text-decoration-underline list-icon-color"
                                >
                                    Click here to apply
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionThree
