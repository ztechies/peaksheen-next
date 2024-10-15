"use client"

import CustomLayout from "@/app/components/common/CustomLayout"
import Link from "next/link"

const AcknowledgementPage = () => {
    return (
        <>
            <CustomLayout>
                <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light px-3">
                    <div
                        className="p-4 bg-white w-100 rounded-2 shadow-lg"
                        style={{ maxWidth: "500px", opacity: 0.95 }}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="text-success d-block mx-auto my-4"
                            style={{ width: "80px", height: "80px" }}
                        >
                            <path
                                fill="currentColor"
                                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
                            />
                        </svg>
                        <div className="text-center">
                            <h3 className="h5 text-gray-900 font-weight-bold">
                                Thank you for your application!
                            </h3>
                            <p className="text-secondary my-3">
                                We appreciate your interest in joining our team of professional
                                freelance cleaners. Your application has been successfully submitted
                                and is currently under review.
                            </p>
                            <div className="text-center mt-4">
                                <Link href="/cleaning-jobs">
                                    <button className="custom-btn-2">Go to Home Page</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </CustomLayout>
        </>
    )
}

export default AcknowledgementPage
