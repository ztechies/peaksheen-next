import React from "react"

interface ServiceBarProps {
    name: string
    value: number
    max?: number
    color?: string
    backgroundColor?: string
}

const ServiceBar: React.FC<ServiceBarProps> = ({
    name,
    value,
    max = 100,
    color = "#00C853",
    backgroundColor = "#E0F7FA",
}) => {
    return (
        <div className="service-bar-container">
            <div className="service-label">{name}</div>
            <div className="bar-background" style={{ backgroundColor }}>
                <div
                    className="bar-fill"
                    style={{
                        width: `${(value / max) * 100}%`,
                        backgroundColor: color,
                    }}
                />
            </div>
            <div className="value-label">{value}%</div>
        </div>
    )
}

const HorizontalBars = (props: { data: { name: string; value: number }[] }) => {
    return (
        <>
            {props.data.map((service, index) => (
                <ServiceBar key={index} name={service.name} value={service.value} />
            ))}
        </>
    )
}

export default HorizontalBars
