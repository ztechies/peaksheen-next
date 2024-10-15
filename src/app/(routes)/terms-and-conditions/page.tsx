"use client"
import React, { useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import CustomLayout from "@/app/components/common/CustomLayout"
import SideBar from "@/app/components/terms-and-conditions/Sidebar"
import Content from "@/app/components/terms-and-conditions/Content"

const PrivacyPolicy = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    return (
        <CustomLayout>
            <Container fluid>
                <Row>
                    <Col md={3} className="bg-light">
                        <SideBar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
                    </Col>
                    <Col md={9}>
                        <Content activeIndex={activeIndex} />
                    </Col>
                </Row>
            </Container>
        </CustomLayout>
    )
}

export default PrivacyPolicy
