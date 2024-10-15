"use client"
import { User } from "@/types/auth/user"
import { config } from "@/utils/constants"
import { logout } from "@/utils/logout"
import { useEffect, useState } from "react"
import CustomLayout from "./components/common/CustomLayout"
import { FetchHelper } from "@/services/fetch-helper"
import { getAccessToken } from "@/utils/common"
import HeaderSection from "../app/components/home/header-section"
import ServiceStepsSection from "../app/components/home/service-steps"
import ServiceHighlights from "./components/common/ServiceHighlights"
import chooseFrequencyIcon from "../../public/images/home/icons/cleaning-person.svg"
import selectDurationIcon from "../../public/images/home/icons/clock.svg"
import cleaningTimeIcon from "../../public/images/home/icons/calendar.svg"
import SectionRight from "../app/components/common/SectionRight"
import SectionLeft from "../app/components/common/SectionLeft"
import TrustSheildIcon from "../../public/images/home/icons/trust-sheild.svg"
import AreaLocatorIcon from "../../public/images/home/icons/area-locator.svg"
import CleaningServiceVarient from "../../public/images/home/cleaning-variant-2.png"
import CleaningServicesArea from "../../public/images/home/service-area.png"
import { useRouter } from "next/navigation"

export default function Home() {
    const [user, setUser] = useState<User>()
    const accessToken = getAccessToken()
    const router = useRouter()

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

    const steps = [
        {
            icon: chooseFrequencyIcon,
            title: "Choose Frequency",
            description: "Ad-hoc, Weekly,\nFortnightly",
            colSize: "col-md-4 col-lg-4 col-sm-12",
        },
        {
            icon: selectDurationIcon,
            title: "Select Duration",
            description: "Length of the\ncleaning session",
            colSize: "col-md-4 col-lg-4 col-sm-12",
        },
        {
            icon: cleaningTimeIcon,
            title: "Cleaning Time",
            description: "At your chosen\ntime & place",
            colSize: "col-md-4 col-lg-4 col-sm-12",
        },
    ]

    const handleClick = () => {
        router.push("/booking/1/create")
    }
    return (
        <CustomLayout user={user}>
            <HeaderSection />
            <ServiceStepsSection steps={steps} />
            <ServiceHighlights>
                <SectionRight
                    title="Trusted Cleaning Services"
                    description="Local, experienced, DBS-checked, and vetted."
                    icon={TrustSheildIcon}
                    iconAlt="Shield Icon"
                    iconWidth={100}
                    iconHeight={100}
                    buttonTitle="Book your cleaning"
                    image={CleaningServiceVarient}
                    imageAlt="Cleaning Service"
                    buttonHandleClick={handleClick}
                />

                <SectionLeft
                    title="We serve all Greater<br/>Machester Area"
                    description="Our local expertise guarantees a service that truly meets your needs."
                    icon={AreaLocatorIcon}
                    iconAlt="Area locator"
                    iconWidth={100}
                    iconHeight={100}
                    buttonTitle="Book your cleaning"
                    image={CleaningServicesArea}
                    imageAlt="Cleaning Service Area"
                    buttonHandleClick={handleClick}
                />
            </ServiceHighlights>
        </CustomLayout>
    )
}
