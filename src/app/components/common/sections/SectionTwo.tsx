import React from "react"
import Image from "next/image"
import { LuCheckCircle } from "react-icons/lu"
import SectionThree from "./SectionThree"
import SectionFour from "./SectionFour"
import SectionFive from "./SectionFive"

const SectionTwo = ({
    section_2_img,
    section_3_img,
    section_4_img,
    section_5_img,
}: {
    section_2_img: string
    section_3_img: string
    section_4_img: string
    section_5_img: string
}) => {
    return (
        <section className="py-md-3 py-lg-3 py-sm-4 bg-color-sectionTwo">
            <div className="py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-6 mb-4">
                            <h2 className="display-6 font-weight-bold mb-4 text-color">
                                How to begin working with Peaksheen as a self-employed cleaner
                            </h2>
                            {/* Image Section for Mobile */}
                            <div className="d-md-none mb-4">
                                {section_2_img && (
                                    <Image
                                        src={section_2_img}
                                        alt="section_2_img"
                                        className="img-fluid rounded"
                                        width={500}
                                        height={500}
                                    />
                                )}
                            </div>
                            <p className="mb-4 lead">
                                It’s very easy to begin working with Peaksheen as a self-employed
                                cleaner in Manchester. You should complete the employment
                                application form below and wait for our assessment team to get in
                                touch. Once we have checked your details and completed the necessary
                                DBS checks, you can begin working with us.
                            </p>
                            <p className="mb-4 lead">
                                You will need to let HMRC know that you are now self-employed. This
                                is very easy to do:
                            </p>
                            <ul className="list-unstyled mb-8 text-lg">
                                <li className="d-flex align-items-start mb-2">
                                    <span className="me-3">
                                        <LuCheckCircle size={23} className="text-color" />
                                    </span>
                                    <span>
                                        Go online to the HMRC website and register as self-employed
                                    </span>
                                </li>
                                <li className="d-flex align-items-start mb-2">
                                    <span className="me-3">
                                        <LuCheckCircle size={23} className="text-color" />
                                    </span>
                                    <span>Set up your online account with HMRC</span>
                                </li>
                                <li className="d-flex align-items-start mb-2">
                                    <span className="me-3">
                                        <LuCheckCircle size={23} className="text-color" />
                                    </span>
                                    <span>
                                        Enrol for self-assessment on the site so that you can manage
                                        any income tax payable
                                    </span>
                                </li>
                                <li className="d-flex align-items-start mb-2">
                                    <span className="me-3">
                                        <LuCheckCircle size={23} className="text-color" />
                                    </span>
                                    <span>
                                        You will receive a UTR number (Unique Taxpayer Reference)
                                        within 10 days
                                    </span>
                                </li>
                                <li className="d-flex align-items-start mb-2">
                                    <span className="me-3">
                                        <LuCheckCircle size={23} className="text-color" />
                                    </span>
                                    <span>
                                        You will also receive an activation code from HMRC to enable
                                        you to complete the setup of your online account (may take
                                        up to 10 days)
                                    </span>
                                </li>
                            </ul>
                        </div>
                        {/* Image Section for md and Larger */}
                        <div className="col-md-6 d-none d-md-block">
                            {section_2_img && (
                                <Image
                                    src={section_2_img}
                                    alt="section_2_img"
                                    className="img-fluid rounded"
                                    width={650}
                                    height={700}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <SectionThree section_3_img={section_3_img} />
            <SectionFour section_4_img={section_4_img} />
            <SectionFive section_5_img={section_5_img} />
        </section>
    )
}

export default SectionTwo
