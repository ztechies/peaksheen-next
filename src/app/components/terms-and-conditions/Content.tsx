import React from "react"

interface ContentProps {
    activeIndex: number
}

const contentData = [
    { title: "Scope of Services", content: "Lorem ipsum dolor sit amet..." },
    { title: "Service Schedule", content: "Ut enim ad minim veniam..." },
    { title: "Pricing & Payment Terms", content: "Duis aute irure dolor..." },
    { title: "Supplies & Equipment", content: "Excepteur sint occaecat..." },
    { title: "Access to Property", content: "Lorem ipsum dolor sit amet..." },
    { title: "Vetting & Monitoring of Cleaners", content: "Ut enim ad minim veniam..." },
    { title: "Insurance & Liability", content: "Duis aute irure dolor..." },
    { title: "Confidentiality", content: "Excepteur sint occaecat..." },
]

const Content: React.FC<ContentProps> = ({ activeIndex }) => {
    const activeContent = contentData[activeIndex]

    return (
        <div className="p-5">
            <h4 className="regular-font mb-4">Terms & Conditions</h4>
            <h5 className="regular-font">{activeContent.title}</h5>
            <p
                className="grey-text"
                dangerouslySetInnerHTML={{ __html: activeContent.content }}
            ></p>
        </div>
    )
}

export default Content
