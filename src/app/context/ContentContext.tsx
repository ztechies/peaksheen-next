"use client"

import { createContext, useContext, useEffect, useState } from "react"
import staticContent from "../static_content.json"
import { contentContextInterface, contentState } from "@/types/components/form"
import { getContent } from "@/services/fetch-helper"

const ContentContext = createContext<contentContextInterface>({
    content: null,
    isLoading: true,
})

const ContentProvider = ({ children }: React.PropsWithChildren) => {
    const [content, setContent] = useState<contentState | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const fetchContent = async () => {
        try {
            const res = await getContent()
            if (res.data) {
                setContent(res.data)
            } else {
                setContent(staticContent)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setContent(staticContent)
            console.error("Error fetching content:", error.message)
        } finally {
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
        }
    }

    useEffect(() => {
        fetchContent()
    }, [])

    return (
        <ContentContext.Provider
            value={{
                content,
                isLoading,
            }}
        >
            {children}
        </ContentContext.Provider>
    )
}

const useContent = () => {
    const content = useContext(ContentContext)
    if (content === undefined) {
        throw new Error("useContent must be used within a ContentProvider")
    }
    return content
}

export { ContentProvider, useContent }
