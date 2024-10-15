import React from "react"
import { Spinner } from "react-bootstrap"

const FullPageLoader = ({ isLoading }: { isLoading: boolean }) => {
    return (
        isLoading && (
            <div className="full-page-loader">
                <Spinner animation="border" role="status" variant="primary" />
                <span>Loading...</span>
            </div>
        )
    )
}

export default FullPageLoader
