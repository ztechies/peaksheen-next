"use client"
import SideBarMenuList from "./DashbaordSideBarMenuList"

const Sidebar = () => {
    const menu = [
        {
            icon: "/Images/admin-dashboard/dashboard.svg",
            name: "Dashboard",
            id: 1,
            path: "/dashboard",
            isactive: "active",
        }, // Updated path
        { icon: "/Images/admin-dashboard/payments.png", name: "Payments", id: 2, isactive: "" }, // Updated path
        { icon: "/Images/admin-dashboard/support.png", name: "Support", id: 3, isactive: "" }, // Updated path
        {
            icon: "/Images/admin-dashboard/notifications.svg",
            name: "Notifications",
            id: 4,
            isactive: "",
        }, // Updated path
        {
            icon: "/Images/admin-dashboard/preference.svg",
            name: "Preferences",
            id: 5,
            isactive: "",
        }, // Updated path
    ]

    // const [active, setActive] = useState(1)

    return (
        <>
            <nav id="sidebarMenu" className="cursor-pointer col-md-3 col-lg-2 d-md-block sidebar">
                <div className="position-sticky pt-3">
                    <SideBarMenuList menu={menu} />
                </div>
            </nav>
        </>
    )
}

export default Sidebar
