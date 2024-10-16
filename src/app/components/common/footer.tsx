import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "PeakSheen"
    return (
        <footer className="footer mt-auto">
            <div className="container">
                <div className="row mt-4">
                    <div className="col-md-3 mb-4 mb-md-0">
                        <div className="footer-logo">
                            <Image
                                src={"/Images/logo/peaksheen-logo-blue-.svg"}
                                alt={appName}
                                width={200}
                                height={70}
                            />
                        </div>
                    </div>
                    <div className="col-md-3 mb-4 mb-md-0">
                        <h5 className="footer-heading">For Cleaners</h5>
                        <ul className="list-unstyled">
                            <li>
                                <Link href="/">Become a Cleaner</Link>
                            </li>
                            <li>
                                <Link href="/">Cleaner Welcome Pack</Link>
                            </li>
                            <li>
                                <Link href="/">View and Accept Jobs</Link>
                            </li>
                            <li>
                                <Link href="/">Support and Resources</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3 mb-4 mb-md-0">
                        <h5 className="footer-heading">For Clients</h5>
                        <ul className="list-unstyled">
                            <li>
                                <Link href="/">Client Welcome Pack</Link>
                            </li>
                            <li>
                                <Link href="/">Manage Bookings</Link>
                            </li>
                            <li>
                                <Link href="/">Client Support</Link>
                            </li>
                            <li>
                                <Link href="/">Create a Job</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5 className="footer-heading">More Information</h5>
                        <ul className="list-unstyled">
                            <li>
                                <Link href="/">Cleaning Checklist</Link>
                            </li>
                            <li>
                                <Link href="/">Product Checklist</Link>
                            </li>
                            <li>
                                <Link href="/terms-and-conditions">Terms & Conditions</Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy">Privacy Policy</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="row mt-3 mb-1">
                    <hr />
                    <div className="col">
                        <p className="regular-font white-text">
                            Copywrite &copy; 2024 All Rights Reserved
                        </p>
                    </div>
                    <div className="col text-end">
                        <div className="">
                            <Image
                                className="cursor-pointer me-3"
                                src={"/Images/social/x.svg"}
                                alt="x"
                                width={25}
                                height={25}
                            />
                            <Image
                                className="cursor-pointer me-3"
                                src={"/Images/social/facebook.svg"}
                                alt="Facebook"
                                width={25}
                                height={25}
                            />
                            <Image
                                className="cursor-pointer me-3"
                                src={"/Images/social/instagram.svg"}
                                alt="Instagram"
                                width={25}
                                height={25}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
