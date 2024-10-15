import React from "react"

interface ServiceStepsSectionProps {
    heading: string
    headingDesc: string
    blocks: {
        title: string
        description: string
    }[]
}

const SectionOne: React.FC<ServiceStepsSectionProps> = ({ heading, headingDesc, blocks }) => {
    return (
        <div className="bg-color-sectionOne py-5">
            <div className="container text-md-center text-left px-4">
                <h2 className="display-6 fw-bold text-color">{heading}</h2>
                <p className="mt-3 lead text-secondary text-lg">{headingDesc}</p>
            </div>

            <div className="container">
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2">
                    {blocks &&
                        blocks.map((block, index) => {
                            return (
                                <div className="col" key={index}>
                                    <div className="h-100">
                                        <div className="card-body">
                                            <h3 className="h5 fw-semibold text-color text-xl">
                                                {block.title}
                                            </h3>
                                            <p className="text-secondary">{block.description}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )
}

export default SectionOne
