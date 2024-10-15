import React, { useState, useEffect } from "react"
import Image from "next/image"
import ScheduleServiceIcon from "../../../../public/images/join-our-team/icons/schedule-service-time.svg"
import OrdersHistoryImage from "../../../../public/images/join-our-team/orders-history.png"
import UserFormIcon from "../../../../public/images/join-our-team/icons/user-forms.svg"
import StarIcon from "../../../../public/images/join-our-team/icons/star.svg"
import CleaningRatingImage from "../../../../public/images/join-our-team/cleaning-rating.png"
import SectionLeft from "../common/SectionLeft"
import SectionRight from "../common/SectionRight"
import { useRouter } from "next/navigation"

const SetAvailbilitySection = () => {
    const [totalHours, setTotalHours] = useState(16)
    const [monthlyIncome, setMonthlyIncome] = useState(800)
    const basePrice = 12.5
    const [backgroundStyle, setBackgroundStyle] = useState("")
    const router = useRouter()

    const handleInputChange = (event: { target: { value: string } }) => {
        const newValue = event.target.value
        setTotalHours(parseInt(newValue))
    }

    useEffect(() => {
        const percentageValue = (totalHours / 48) * 100
        setBackgroundStyle(
            `linear-gradient(to right, #24bb61 ${percentageValue}%, #eff2f4 ${percentageValue}%)`,
        )
        const monthTotal = totalHours * basePrice * 4
        setMonthlyIncome(monthTotal)
    }, [totalHours])

    const handleClick = () => {
        router.push("/booking/1/create")
    }

    return (
        <section className="availability-section my-md-3 my-lg-3 my-sm-4">
            <div className="container">
                <div className="row mb-5">
                    <div className="col-lg-6 availability-left">
                        <div className="availability-content">
                            <div className="availability-icon">
                                <Image
                                    src={ScheduleServiceIcon}
                                    alt="Availability Icon"
                                    width={90}
                                    height={90}
                                />
                            </div>
                            <h2 className="availability-title">Set your availability</h2>
                            <p className="availability-description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                            <button className="btn button-global availability-button">
                                Start getting jobs
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-6 availability-right">
                        <div className="availability-card">
                            <div className="availability-toggle">
                                Your availability
                                <div className="availability-hours">
                                    <span className="bold-text">{totalHours}h&nbsp;</span>
                                    <span>per week</span>
                                </div>
                            </div>
                            <div className="availability-slider">
                                <input
                                    type="range"
                                    min="0"
                                    max="48"
                                    value={totalHours}
                                    className="custom-range"
                                    onChange={handleInputChange}
                                    style={{ background: backgroundStyle }}
                                />
                            </div>
                            <div className="availability-estimation p-3">
                                <span className="title">YOUR ESTIMATION</span>
                                <div className="row">
                                    <div className="col p-md-4 p-lg-4 p-sm-2">
                                        <div className="earnings">
                                            <span className="title">Earn</span>
                                            <h5 className="pt-md-4 pt-lg-4 pt-sm-2 rate">
                                                ${basePrice}/<span className="regular-text">h</span>
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="col p-md-4 p-lg-4 p-sm-2">
                                        <div className="total">
                                            <span className="title">Up to</span>
                                            <h5 className="pt-md-4 pt-lg-4 pt-sm-2 rate">
                                                ${monthlyIncome}/
                                                <span className="regular-text">month</span>
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SectionLeft
                    title="Accept the jobs that work<br />for you"
                    description="Local, experienced, DBS-checked, and vetted."
                    icon={UserFormIcon}
                    iconAlt="Shield Icon"
                    iconWidth={100}
                    iconHeight={100}
                    buttonTitle="Apply now"
                    image={OrdersHistoryImage}
                    imageAlt="Orders History"
                    buttonHandleClick={handleClick}
                />
                <SectionRight
                    title="Trusted Cleaning Services"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                    icon={StarIcon}
                    iconAlt="Shield Icon"
                    iconWidth={100}
                    iconHeight={100}
                    buttonTitle="Start now"
                    image={CleaningRatingImage}
                    imageAlt="Cleaning Service"
                    buttonHandleClick={handleClick}
                />
            </div>
        </section>
    )
}

export default SetAvailbilitySection
