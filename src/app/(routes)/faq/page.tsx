"use client"
import { User } from "@/types/auth/user"
import { config } from "@/utils/constants"
import { logout } from "@/utils/logout"
import { useEffect, useState } from "react"
import CustomLayout from "../../components/common/CustomLayout"
import { FetchHelper } from "@/services/fetch-helper"
import { getAccessToken } from "@/utils/common"
import CommonPageHeader from "../../components/common/CommonPageHeader"
import FaqImage from "../../../../public/images/faq/faq.png"
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"

export default function Faq() {
    const [user, setUser] = useState<User>()
    const accessToken = getAccessToken()

    const getUser = async () => {
        try {
            const response = await FetchHelper.get(config.API_ENDPOINTS.GET_USER_BY_TOKEN)
            if (response.data) {
                setUser(response.data)
            }
        } catch (error) {
            logout()
        }
    }

    useEffect(() => {
        if (accessToken) getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [activeKey, setActiveKey] = useState("0")

    const toggleAccordion = (key: string) => {
        setActiveKey(activeKey === key ? "" : key)
    }

    const faqs = [
        {
            question: "How many hours do I need?",
            answer: "The number of hours you need depends on several factors, including the size of your home, the number of rooms, and the level of detail required for the cleaning. You may want to prioritize certain rooms or tasks based on your preferences. Ultimately, the choice is yours—whether you prefer a quicker clean or more thorough coverage.",
        },
        {
            question: "What does the hourly rate include?",
            answer: "Our hourly rates are all-inclusive, covering both the cleaner's wage and our agency fee. This transparent pricing ensures there are no hidden costs, giving you peace of mind that you're receiving a fair rate for quality service.",
        },
        {
            question: "How do you vet the cleaners?",
            answer: "Our vetting process is thorough to ensure only the best cleaners join our team. It starts with a telephone interview, followed by a more detailed interview conducted in the applicant's home. We require proof of ID, address, and references before adding them to our database. Additionally, we continuously monitor all cleaners throughout their time with us to maintain high standards.",
        },
        {
            question: "Will I have to be at home when my cleaner visits?",
            answer: "No, you don't need to be at home during the cleaner's visit. Our cleaners are thoroughly vetted and are trusted to hold your house keys if you choose. We provide a Key Acknowledgement Form for your cleaner to sign, giving you added assurance.",
        },
        {
            question: "Do I have to supply cleaning products and equipment?",
            answer: "Yes, clients are required to provide all cleaning products and equipment. This allows you to specify the substances used in your home, ensuring they meet your preferences. Please note that due to health and safety regulations, bleach is a banned substance and cannot be used by our cleaners.",
        },
        {
            question: "Do you have insurance cover?",
            answer: 'Yes, we have comprehensive insurance cover, including a minimum of £1,000,000 in public liability insurance. This indemnity cover protects you, though it is important to note that it is not a "new for old" policy, and there is a £100 excess per claim. This approach helps us keep costs reasonable while providing adequate protection.',
        },
    ]
    return (
        <CustomLayout user={user}>
            <CommonPageHeader
                titleLineOne="FAQ"
                titleLineTwo=""
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
                            Sed do eiusmod tempor incididunt."
                image={FaqImage}
                imageAlt="FAQ"
            />

            <section className="grey-background">
                <div className="container py-5">
                    <div className="row">
                        <div className="col">
                            <h2 className="text-center mb-4">Frequently Asked Questions</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-8 col-lg-5 col-sm-12 text-center text-muted ">
                            <p className="mb-5">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                                ad minim.Sed
                            </p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-8 col-sm-12">
                            <Accordion activeKey={activeKey}>
                                {faqs.map((faq, index) => (
                                    <Card key={index} className="mb-3 faq-card">
                                        <Accordion
                                            as={Card.Header}
                                            className="d-flex justify-content-between align-items-center"
                                            onClick={() => toggleAccordion(index.toString())}
                                            style={{
                                                cursor: "pointer",
                                            }}
                                        >
                                            {`${index + 1}. ${faq.question}`}
                                            <span>
                                                {activeKey === index.toString() ? "-" : "+"}
                                            </span>
                                        </Accordion>
                                        <Accordion.Collapse eventKey={index.toString()}>
                                            <Card.Body>{faq.answer}</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </div>
            </section>
        </CustomLayout>
    )
}
