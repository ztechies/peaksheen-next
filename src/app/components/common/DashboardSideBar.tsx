"use client"
import DashboardIcon from "../../../../public/images/admin-dashboard/dashboard.svg"
import PaymentsIcon from "../../../../public/images/admin-dashboard/payments.png"
import SupportIcon from "../../../../public/images/admin-dashboard/support.png"
import NotificationsIcon from "../../../../public/images/admin-dashboard/notifications.svg"
import PreferenceIcon from "../../../../public/images/admin-dashboard/preference.svg"
import SideBarMenuList from "./DashbaordSideBarMenuList"

const Sidebar = () => {
    const menu = [
        { icon: DashboardIcon, name: "Dashboard", id: 1, path: "/dashboard", isactive: "active" },
        { icon: PaymentsIcon, name: "Payments", id: 2, isactive: "" },
        { icon: SupportIcon, name: "Support", id: 3, isactive: "" },
        { icon: NotificationsIcon, name: "Notifications", id: 4, isactive: "" },
        { icon: PreferenceIcon, name: "Preferences", id: 5, isactive: "" },
    ]

    // const [active, setActive] = useState(1)

    return (
        <>
            <nav id="sidebarMenu" className="cursor-pointer col-md-3 col-lg-2 d-md-block  sidebar">
                <div className="position-sticky pt-3">
                    <SideBarMenuList menu={menu} />
                </div>
            </nav>
        </>
    )
}

export default Sidebar
