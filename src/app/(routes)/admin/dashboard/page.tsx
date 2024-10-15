"use client"
import React from "react"
import CustomAdminLayout from "@/app/components/common/CustomAdminLayout"
import DashboardBreadCrumbs from "@/app/components/common/DashboardBreadcrumb"
import HomeIcon from "../../../../../public/images/admin-dashboard/home.svg"
import BookingIcon from "../../../../../public/images/admin-dashboard/booking-icon.svg"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "next/image"
import dynamic from "next/dynamic"
import Card from "react-bootstrap/Card"
// import Datatable from "@/app/components/DataTable/Datatable"

const PieChart = dynamic(() => import("../../../components/common/PieChart"), {
    ssr: false,
})
const BarChartSingle = dynamic(() => import("../../../components/common/BarChartSingle"), {
    ssr: false,
})

const BarChartDouble = dynamic(() => import("../../../components/common/BarchartStacked"), {
    ssr: false,
})

const BarChartHorizontal = dynamic(() => import("../../../components/common/HorizontalBars"), {
    ssr: false,
})

const Dashboard = () => {
    const breadCrumbList = [
        { title: "Home", link: "", id: 1 },
        { title: "Library", link: "", id: 2 },
        { title: "Data", link: "", id: 3 },
    ]
    const pieChartData = [
        { name: "Group C", value: 25 },
        { name: "Group B", value: 10 },
        { name: "Group A", value: 65 },
    ]
    const barChartData = [
        { name: "Mon", value: 18 },
        { name: "Tue", value: 12 },
        { name: "Wed", value: 10 },
        { name: "Thu", value: 15 },
        { name: "Fri", value: 22 },
        { name: "Sat", value: 14 },
        { name: "Sun", value: 16 },
    ]

    const userRegistrationData = [
        { name: "Jan", buyers: 20, cleaners: 15 },
        { name: "Feb", buyers: 12, cleaners: 10 },
        { name: "Mar", buyers: 18, cleaners: 12 },
        { name: "Apr", buyers: 15, cleaners: 14 },
        { name: "May", buyers: 16, cleaners: 11 },
        { name: "Jun", buyers: 21, cleaners: 16 },
        { name: "Jul", buyers: 25, cleaners: 20 },
        { name: "Aug", buyers: 19, cleaners: 13 },
    ]

    const topServicesData = [
        { name: "Deep Cleaning", value: 10 },
        { name: "Floor Cleaning", value: 65 },
        { name: "Bathroom Cleaning", value: 50 },
        { name: "Kitchen Cleaning", value: 46 },
    ]

    // const [totalPage, setPage] = useState(10)
    // const [page, setPageSize] = useState(10)
    // const [sortBy, setsortBy] = useState<string | null>(null)
    // const [filterBy, setfilterBy] = useState<{ [key: string]: string | unknown } | null>(null)
    // const verificationTableData = [
    //     {
    //         buyer: "Michal",
    //         cleaner: "Wayne",
    //         booking_date: "1/15/2024",
    //         cleaning_date: "11/12/2023",
    //         price: "$26",
    //         hours: "14",
    //         status: "Cancelled",
    //         feedback: "2.8",
    //     },
    //     {
    //         buyer: "Viole",
    //         cleaner: "Sissy",
    //         booking_date: "10/5/2023",
    //         cleaning_date: "11/30/2023",
    //         price: "$34",
    //         hours: "14",
    //         status: "In Progress",
    //         feedback: "3.3",
    //     },
    //     {
    //         buyer: "Cleveland",
    //         cleaner: "Jewel",
    //         booking_date: "5/2/2024",
    //         cleaning_date: "2/5/2024",
    //         price: "$34",
    //         hours: "24",
    //         status: "Cancelled",
    //         feedback: "3.7",
    //     },
    //     {
    //         buyer: "Merridie",
    //         cleaner: "Kim",
    //         booking_date: "11/24/2023",
    //         cleaning_date: "1/1/2024",
    //         price: "$56",
    //         hours: "19",
    //         status: "Cancelled",
    //         feedback: "2.9",
    //     },
    //     {
    //         buyer: "Augustine",
    //         cleaner: "Jordan",
    //         booking_date: "5/22/2024",
    //         cleaning_date: "1/13/2024",
    //         price: "$76",
    //         hours: "13",
    //         status: "Cancelled",
    //         feedback: "4.3",
    //     },
    //     {
    //         buyer: "Evelin",
    //         cleaner: "Amy",
    //         booking_date: "9/20/2023",
    //         cleaning_date: "4/6/2024",
    //         price: "$22",
    //         hours: "8",
    //         status: "Cancelled",
    //         feedback: "2.8",
    //     },
    //     {
    //         buyer: "Kipper",
    //         cleaner: "Cletus",
    //         booking_date: "2/20/2024",
    //         cleaning_date: "5/21/2024",
    //         price: "$123",
    //         hours: "13",
    //         status: "Cancelled",
    //         feedback: "1.4",
    //     },
    //     {
    //         buyer: "Lulu",
    //         cleaner: "Burnard",
    //         booking_date: "1/26/2024",
    //         cleaning_date: "4/24/2024",
    //         price: "$34",
    //         hours: "9",
    //         status: "Cancelled",
    //         feedback: "3.6",
    //     },
    //     {
    //         buyer: "Amelita",
    //         cleaner: "Kimbell",
    //         booking_date: "3/3/2024",
    //         cleaning_date: "7/9/2024",
    //         price: "$12",
    //         hours: "8",
    //         status: "Cancelled",
    //         feedback: "4.4",
    //     },
    //     {
    //         buyer: "Kory",
    //         cleaner: "Opalina",
    //         booking_date: "3/13/2024",
    //         cleaning_date: "5/8/2024",
    //         price: "$33",
    //         hours: "11",
    //         status: "In Progress",
    //         feedback: "3.3",
    //     },
    // ]
    // const columns = [
    //     {
    //         header: "Byuer",
    //         accessorKey: "buyer",
    //     },
    //     {
    //         header: "Cleaner",
    //         accessorKey: "cleaner",
    //     },
    //     {
    //         header: "Booking Date",
    //         accessorKey: "booking_date",
    //     },
    //     {
    //         header: "Cleaning Date",
    //         accessorKey: "cleaning_date",
    //     },
    //     {
    //         header: "Price",
    //         accessorKey: "price",
    //     },
    //     {
    //         header: "Hours",
    //         accessorKey: "hours",
    //     },
    //     {
    //         header: "Status",
    //         accessorKey: "status",
    //     },
    //     {
    //         header: "Feedback",
    //         accessorKey: "feedback",
    //     },
    //     {
    //         header: "Action",
    //         accessorKey: "",
    //     },
    // ]
    return (
        <CustomAdminLayout>
            <DashboardBreadCrumbs items={breadCrumbList} />
            <h4>Dashboard</h4>
            <Row className="pt-3">
                <div className="grey-text">
                    <Image
                        className="cursor-pointer me-3"
                        src={HomeIcon}
                        alt="Home"
                        width={25}
                        height={25}
                    />
                    My Properties
                </div>
            </Row>
            <Row className="mt-3 mb-3">
                <Col className="col-md-3 col-lg-3 col-sm-12">
                    <Card className="custom-card">
                        <Card.Body>
                            <Card.Title>Total Earnings</Card.Title>
                            {/* Adjust width and height as needed */}
                            <PieChart
                                data={pieChartData}
                                width={325}
                                height={317}
                                innerRadius={80}
                                outerRadius={120}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="col-md-6 col-lg-8 col-sm-12"></Col>
            </Row>
            <Row className="mt-4 mb-2">
                <Col className="col-md-3 col-lg-3 col-sm-12">
                    <Card className="custom-card">
                        <Card.Body>
                            <Card.Title>Total Earnings</Card.Title>
                            <BarChartSingle data={barChartData} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="col-md-6 col-lg-6 col-sm-12">
                    <Card className="custom-card horizontal-bars">
                        <Card.Body>
                            <Card.Title>Top Services</Card.Title>
                            <BarChartHorizontal data={topServicesData} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="col-md-3 col-lg-3 col-sm-12">
                    <Col className="col">
                        <Card className="custom-card">
                            <Card.Body>
                                <Card.Title>User Registration</Card.Title>
                                <BarChartDouble data={userRegistrationData} />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col"></Col>
                </Col>
            </Row>
            <Row className="pt-3">
                <div className="grey-text">
                    <Image
                        className="cursor-pointer me-3"
                        src={BookingIcon}
                        alt="Booking"
                        width={25}
                        height={25}
                    />
                    Bookings
                </div>
            </Row>
            <Row>
                {/* <Datatable
                    tableType="Demo"
                    clearFilter={() => setfilterBy(null)}
                    // fetchData={fetchData}
                    setfilterBy={setfilterBy}
                    // setsortBy={setsortBy}
                    totalPage={totalPage}
                    setPage={setPage}
                    setpageSize={setPageSize}
                    data={verificationTableData}
                    columns={columns}
                /> */}
            </Row>
        </CustomAdminLayout>
    )
}
export default Dashboard
