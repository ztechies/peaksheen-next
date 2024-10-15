import Image from "next/image"
import PeaskSheenBlueLogo from "../../../../public/images/logo/peaksheen-logo-blue-.svg"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import { usePathname, useRouter } from "next/navigation"
import { User } from "@/types/auth/user"
import { logout } from "@/utils/logout"

const Navbars = (props: { user?: User }) => {
    const router = useRouter()
    const pathname = usePathname()
    const appName = process.env.NEXT_PUBLIC_APP_NAME ?? "PeakSheen"

    const isActive = (path: string) => (pathname === path ? "active" : "")

    const handleNextStep = () => {
        router.push("/booking/1/create")
    }
    const divStyle = {
        maxWidth: "150px",
    }

    const handleLogout = () => {
        logout()
        router.push("/sign-in")
    }
    return (
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
                    <Nav className="ms-auto">
                        {props.user && (
                            <div className=" me-3 ms-2">
                                <a
                                    className="text-decoration-none grey-text v-cursor-pointer"
                                    title="Profile"
                                    href="/profile"
                                >
                                    {props.user.full_name}
                                </a>
                                <br />
                                <a
                                    className="d-inline-block text-decoration-none grey-text v-cursor-pointer"
                                    style={divStyle}
                                    onClick={handleLogout}
                                >
                                    logout
                                </a>
                            </div>
                        )}
                        {props.user == null && (
                            <Nav.Link
                                href={pathname === "/sign-in" ? "/sign-up" : "/sign-in"}
                                className={`me-2 ${isActive("/sign-in") || isActive("/sign-up")}`}
                            >
                                Login/Signup
                            </Nav.Link>
                        )}
                        <button className="btn me-2 button-global" onClick={handleNextStep}>
                            Book a cleaning
                        </button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Navbars
