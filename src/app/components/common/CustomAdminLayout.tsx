"use client"
import "@/styles/scss/custom/styles.scss"
import { User } from "@/types/auth/user"
import { Toaster } from "react-hot-toast"
import Navbar from "./DashbaordNavbar"
import SideBar from "./DashboardSideBar"
import Row from "react-bootstrap/Row"

const CustomAdminLayout = ({ children }: { children: React.ReactNode; user?: User }) => {
    return (
        <div>
            <Toaster />
            <Navbar />
            <div className="container-fluid p-0">
                <Row>
                    <SideBar />
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">{children}</main>
                </Row>
            </div>
        </div>
    )
}

export default CustomAdminLayout
