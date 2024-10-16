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
import SetAvailbilitySection from "../../components/join-our-team/set-availbility-section"

export default function JoinOurTeam() {
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
    const steps = [
        {
            icon: "/Images/join-our-team/icons/availability.svg",
            title: "Set your availability",
            description: "Lorem ipsum\ndolor sit amet.",
            colSize: "col-md-4 col-lg-4 col-sm-12",
        },
        {
            icon: "/Images/join-our-team/icons/verification.svg",
            title: "Background check",
            description: "Lorem ipsum\ndolor sit amet.",
            colSize: "col-md-4 col-lg-4 col-sm-12",
        },
        {
            icon: "/Images/join-our-team/icons/search-job.svg",
            title: "Find your first job",
            description: "Lorem ipsum\ndolor sit amet.",
            colSize: "col-md-4 col-lg-4 col-sm-12",
        },
    ]

    useEffect(() => {
        if (accessToken) getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <CustomLayout user={user}>
            <CommonPageHeader
                titleLineOne="Be your own"
                titleLineTwo="&nbsp;boss&nbsp;"
                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
                            Sed do eiusmod tempor incididunt."
                image={"/Images/join-our-team/join-our-team.png"}
                imageAlt="Be your own boss"
            />
            <ServiceStepsSection steps={steps} />
            <SetAvailbilitySection />
        </CustomLayout>
    )
}
