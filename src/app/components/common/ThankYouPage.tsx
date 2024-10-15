import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

/**
 * Custom component renders the Thank you page, which can be reused for payment or registration or email verification etc.
 
 * @param {objec} [props] = The props object
 * @returns {JSX.Element} The rendered element
 */
const ThankYouPage = (props: { message?: string; subtext?: string; listPoints?: string[] }) => {
    return (
        <section className="container-fluid thank-you-section mb-5">
            <div className="success-background"></div>
            <div className="text-center">
                <h1 className="regular-font">{props.message}</h1>
                <Row className="text-center justify-content-center mt-4 mb-5">
                    <Col className=" col-md-8 col-lg-7 col-sm-12 ">
                        {props.subtext && <p className="grey-text">{props.subtext}</p>}
                    </Col>
                </Row>
                {props.listPoints && (
                    <Row className="justify-content-center mt-4 mb-5">
                        <Col className=" col-md-6 col-lg-6 col-sm-12 ">
                            <div className="alert alert-custom">
                                <ul>
                                    {props.listPoints.map((item, index) => (
                                        <li className="grey-text" key={index}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Col>
                    </Row>
                )}
            </div>
        </section>
    )
}

export default ThankYouPage
