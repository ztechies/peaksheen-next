import Image from "next/image"
import { LuCheckCircle } from "react-icons/lu"

const SectionFive = ({ section_5_img }: { section_5_img: string }) => {
    return (
        <div className="d-flex justify-content-center align-items-center py-5">
            <div className="container p-6">
                <div className="row g-4">
                    {/* Text Section */}
                    <div className="col-md-6">
                        <h2 className="display-6 h-md-3 font-weight-bold mb-4 text-color">
                            Working as a self-employed cleaner
                        </h2>

                        {/* Image Section for Mobile */}
                        <div className="d-md-none mb-4">
                            {section_5_img && (
                                <Image
                                    src={section_5_img}
                                    alt="section_5_img"
                                    className="img-fluid rounded"
                                    width={650}
                                    height={700}
                                />
                            )}
                        </div>

                        <ul className="list-unstyled mb-4 text-lg">
                            <li className="d-flex align-items-start mb-2">
                                <span className="me-3">
                                    <LuCheckCircle size={23} className="text-color" />
                                </span>
                                <div>
                                    When you are self-employed, you need to fill in a Tax Return
                                    with HMRC each year by the 5th of April.
                                </div>
                            </li>
                            <li className="d-flex align-items-start mb-2">
                                <span className="me-3">
                                    <LuCheckCircle size={23} className="text-color" />
                                </span>
                                <div>
                                    This should show how much you have earned in the 12-month
                                    period.
                                </div>
                            </li>
                            <li className="d-flex align-items-start mb-2">
                                <span className="me-3">
                                    <LuCheckCircle size={23} className="text-color" />
                                </span>
                                <div>
                                    HMRC will use this information to calculate if you have to pay
                                    any income tax. This sum is due by the 31st of January of the
                                    following year.
                                </div>
                            </li>
                            <li className="d-flex align-items-start mb-2">
                                <span className="me-3">
                                    <LuCheckCircle size={23} className="text-color" />
                                </span>
                                <div>
                                    Don’t worry as you will not have to pay any income tax unless
                                    your self-employed profits are more than £12,570.
                                </div>
                            </li>
                            <li className="d-flex align-items-start">
                                <span className="me-3">
                                    <LuCheckCircle size={23} className="text-color" />
                                </span>
                                <div>
                                    Do remember to keep copies of all invoices and receipts to
                                    substantiate income and expenses.
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Image Section for md and Larger */}
                    <div className="col-md-6 d-none d-md-flex justify-content-start align-items-start mt-2">
                        {section_5_img && (
                            <Image
                                src={section_5_img}
                                alt="section_5_img"
                                className="img-fluid rounded"
                                width={650}
                                height={700}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SectionFive
