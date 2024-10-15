import React from "react"
import { Nav } from "react-bootstrap"

interface SidebarProps {
    activeIndex: number
    setActiveIndex: (index: number) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeIndex, setActiveIndex }) => {
    const options = [
        "Scope of Services",
        "Service Schedule",
        "Pricing & Payment Terms",
        "Supplies & Equipment",
        "Access to Property",
        "Vetting & Monitoring of Cleaners",
        "Insurance & Liability",
        "Confidentiality",
    ]

    return (
        <Nav
            className="flex-column p-3 terms-sidebar"
            style={{ backgroundColor: "#f7fdf7", minHeight: "100vh" }}
        >
            {options.map((option, index) => (
                <Nav.Link
                    key={index}
                    active={activeIndex === index}
                    onClick={() => setActiveIndex(index)}
                    className="d-flex align-items-center terms-sidebar-nav"
                >
                    <span className="badge bg-success me-2 terms-badge">{index + 1}</span>
                    {option}
                </Nav.Link>
            ))}
        </Nav>
    )
}

export default Sidebar
