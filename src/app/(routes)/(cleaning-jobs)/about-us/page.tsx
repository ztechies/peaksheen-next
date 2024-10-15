"use client"

import CustomLayout from "@/app/components/common/CustomLayout"
import { useContent } from "@/app/context/ContentContext"
import { FetchHelper } from "@/services/fetch-helper"
import { User } from "@/types/auth/user"
import { getAccessToken } from "@/utils/common"
import { config } from "@/utils/constants"
import { logout } from "@/utils/logout"
import { useEffect, useState } from "react"
import { FaFacebook } from "react-icons/fa"

const AboutComp = () => {
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
            <div className="min-vh-100 d-flex align-items-center justify-content-center about-bg text-center">
                <div className="mx-auto w-75">
                    <h1 className="display-4 text-white mb-4"> About Us </h1>
                    <p className="text-white mb-4 text-lg">{content?.about_us_content}</p>
                    <div className="mt-5">
                        <a
                            href={content?.about_us_facebook_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover-text-secondary"
                        >
                            <FaFacebook size={32} />
                        </a>
                    </div>
                </div>
            </div>
        </CustomLayout>
    )
}

export default AboutComp
