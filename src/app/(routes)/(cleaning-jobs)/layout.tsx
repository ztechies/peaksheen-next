import { ContentProvider } from "@/app/context/ContentContext"
import React, { ReactNode } from "react"

const CleaningJobLayout = ({ children }: { children: ReactNode }) => {
    return <ContentProvider>{children}</ContentProvider>
}

export default CleaningJobLayout
