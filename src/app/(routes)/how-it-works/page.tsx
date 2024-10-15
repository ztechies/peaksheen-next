"use client"
import { User } from "@/types/auth/user"
import { config } from "@/utils/constants"
import { logout } from "@/utils/logout"
import { useEffect, useState } from "react"
import CustomLayout from "../../components/common/CustomLayout"
import { FetchHelper } from "@/services/fetch-helper"
import { getAccessToken } from "@/utils/common"
import CommonPageHeader from "../../components/common/CommonPageHeader"
import ServiceStepsSection from "../../components/home/service-steps"
import ChooseFrequencyIcon from "../../../../public/images/home/icons/cleaning-person.svg"
import SelectDurationIcon from "../../../../public/images/home/icons/clock.svg"
import CleaningTimeIcon from "../../../../public/images/home/icons/calendar.svg"
import ClearnerAnimationImage from "../../../../public/images/how-it-works/cleaner-animation.png"
import ServiceHighlights from "../../components/common/ServiceHighlights"
import SectionRight from "../../components/common/SectionRight"
import SectionLeft from "../../components/common/SectionLeft"
import ReportsIcon from "../../../../public/images/how-it-works/icons/reports.svg"
import HourGlassIcon from "../../../../public/images/how-it-works/icons/hour-glass.svg"
import StopWatchIcon from "../../../../public/images/how-it-works/icons/stopwatch.svg"
import PersonCleaningImage from "../../../../public/images/how-it-works/person-cleaning-railing.png"
import CleaningTimeImage from "../../../../public/images/how-it-works/cleaning-time.png"
import CleaningHandImage from "../../../../public/images/how-it-works/cleaning-hand.png"
import { useRouter } from "next/navigation"

export default function HowItWorks() {
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
    const steps = [
        {
            icon: ChooseFrequencyIcon,
            title: "Choose Frequency",
            description: "Ad-hoc, Weekly,\nFortnightly",
            colSize: "col-md-4 col-lg-4 col-sm-12",
        },
        {
            icon: SelectDurationIcon,
            title: "Select Duration",
            description: "Length of the\ncleaning session",
            colSize: "col-md-4 col-lg-4 col-sm-12",
        },
        {
            icon: CleaningTimeIcon,
            title: "Cleaning Time",
            description: "At your chosen\ntime & place",
            colSize: "col-md-4 col-lg-4 col-sm-12",
        },
    ]

    useEffect(() => {
        if (accessToken) getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClick = () => {
        router.push("/booking/1/create")
    }

    return (
        <CustomLayout user={user}>
            <CommonPageHeader
                titleLineOne="How it"
                titleLineTwo="&nbsp;works&nbsp;"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
                            Sed do eiusmod tempor incididunt."
                image={ClearnerAnimationImage}
                imageAlt="How it works"
            />
            <ServiceStepsSection steps={steps} />
            <ServiceHighlights>
                <SectionRight
                    title="Set Frequency"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                            tempor incididunt"
                    icon={ReportsIcon}
                    iconAlt="Reports Icon"
                    iconWidth={100}
                    iconHeight={100}
                    buttonTitle="Create a job"
                    image={PersonCleaningImage}
                    imageAlt="Cleaning Service"
                    buttonHandleClick={handleClick}
                />

                <SectionLeft
                    title="Select Duration"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                            tempor incididunt"
                    icon={HourGlassIcon}
                    iconAlt="Timely cleaning"
                    iconWidth={100}
                    iconHeight={100}
                    buttonTitle="Reliable Cleaning"
                    image={CleaningTimeImage}
                    imageAlt="Reliable Cleaning"
                    buttonHandleClick={handleClick}
                />
                <SectionRight
                    title="Cleaning time"
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                            tempor incididunt"
                    icon={StopWatchIcon}
                    iconAlt="Cleaning time"
                    iconWidth={100}
                    iconHeight={100}
                    buttonTitle="Create a job"
                    image={CleaningHandImage}
                    imageAlt="Cleaning on time"
                    buttonHandleClick={handleClick}
                />
            </ServiceHighlights>
        </CustomLayout>
    )
}
