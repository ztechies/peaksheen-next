import Image from "next/image"
import PeaskSheenBlueLogo from "../../../../public/images/logo/peaksheen-logo-blue-.svg"
import NotificationIcon from "../../../../public/images/admin-dashboard/notifications.png"
import ProfileIcon from "../../../../public/images/profile-icon.png"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { usePathname } from "next/navigation"

const Navbars = () => {
    const pathname = usePathname()
    const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "PeakSheen"

    const isActive = (path: string) => (pathname === path ? "active" : "")
    const divStyle = {
        maxWidth: "150px",
    }

    return (
        <div className="container-fluid p-0">
            <div className="container-fluid">
                <Navbar collapseOnSelect expand="lg" bg="" variant="">
                    <Navbar.Brand href="/" className="ms-2">
                        <Image
                            className="company-logo me-md-5 me-lg-5"
                            src={PeaskSheenBlueLogo}
                            alt={appName}
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="">
                            <Nav.Link href="/" className={`me-2 ${isActive("/")}`}>
                                Home
                            </Nav.Link>
                            <Nav.Link
                                href="/cleaning-jobs"
                                className={`me-2 ${isActive("/cleaning-jobs")}`}
                            >
                                Join our team
                            </Nav.Link>
                            <Nav.Link
                                href="/how-it-works"
                                className={`me-2 ${isActive("/how-it-works")}`}
                            >
                                How It works
                            </Nav.Link>
                            <Nav.Link href="/faq" className={`me-2 ${isActive("/faq")}`}>
                                FAQ
                            </Nav.Link>
                            <Nav.Link href="/contact" className={`me-2 ${isActive("/contact")}`}>
                                Contact
                            </Nav.Link>
                            <Nav.Link href="/about-us" className={`me-2 ${isActive("/about-us")}`}>
                                About us
                            </Nav.Link>
                        </Nav>
                        <Nav className="ms-auto float-end">
                            <Nav.Link href={""} className="me-2">
                                <button className="btn me-2 button-global">+ Create a job</button>
                            </Nav.Link>
                            <Nav.Link href="" className="me-2">
                                <Image
                                    className=""
                                    src={NotificationIcon}
                                    alt={appName}
                                    width={35}
                                />
                                <span className="badge">19</span>
                            </Nav.Link>
                            <div className="text-end me-3 ms-2 profile">
                                <span className="name">Joseph John</span>
                                <br />
                                <span
                                    className="d-inline-block text-truncate email"
                                    style={divStyle}
                                >
                                    joseph123@gmail.com
                                </span>
                            </div>
                            <div>
                                <Image
                                    className="cursor-pointer"
                                    src={ProfileIcon}
                                    alt={appName}
                                    width={50}
                                />
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    )
}
export default Navbars
