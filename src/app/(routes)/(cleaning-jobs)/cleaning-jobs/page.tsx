"use client"
import { User } from "@/types/auth/user"
import { config } from "@/utils/constants"
import { logout } from "@/utils/logout"
import { useEffect, useState } from "react"
import CustomLayout from "../../../components/common/CustomLayout"
import { FetchHelper } from "@/services/fetch-helper"
import { getAccessToken } from "@/utils/common"
import { useContent } from "@/app/context/ContentContext"
import SectionOne from "@/app/components/common/sections/sectionOne"
import SectionTwo from "@/app/components/common/sections/SectionTwo"
import CleaningHeroSection from "@/app/components/common/sections/PageHeader"

export default function JoinOurTeam() {
    const [user, setUser] = useState<User>()
    const accessToken = getAccessToken()
    const { content, isLoading } = useContent()

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
    }, [accessToken])

    return (
        <CustomLayout user={user} isLoading={isLoading}>
            <CleaningHeroSection
                titleLineOne={content?.landingPage_heading ?? ""}
                description={content?.landingPage_desc ?? ""}
                image={content?.landingPage_bg_img ?? ""}
            />
            <SectionOne
                heading={content?.section_1_heading ?? ""}
                headingDesc={content?.section_1_heading_desc ?? ""}
                blocks={content?.section_1_blocks ?? []}
            />
            <SectionTwo
                section_2_img={content?.section_2_img ?? ""}
                section_3_img={content?.section_3_img ?? ""}
                section_4_img={content?.section_4_img ?? ""}
                section_5_img={content?.section_5_img ?? ""}
            />
        </CustomLayout>
    )
}
