"use client"
import CustomLayout from "../../components/common/CustomLayout"
import { useEffect, useState } from "react"
import { FetchHelper } from "@/services/fetch-helper"
import { config } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { getAccessToken } from "@/utils/common"
import { useRouter } from "next/navigation"
import { User } from "@/types/auth/user"
import toast from "react-hot-toast"
import WithAuth from "@/app/components/auth/Auth"
import Datatable from "@/app/components/DataTable/Datatable"
import { logout } from "@/utils/logout"

const MyBookings = () => {
    const accessToken = getAccessToken()
    const [user, setUser] = useState<User>()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const [totalPage, setPage] = useState(10)
    // eslint-disable-next-line
    const [page, setPageSize] = useState(10)

    // eslint-disable-next-line
    const [filterBy, setfilterBy] = useState<{ [key: string]: string | unknown } | null>(null)
    const [tableData, setTableData] = useState([{}])

    const getUser = async () => {
        try {
            setIsLoading(true)
            const response = await FetchHelper.get(config.API_ENDPOINTS.GET_USER_BY_TOKEN)
            if (response.data) {
                setUser(response.data)
                getBookings()
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            logout()
            setIsLoading(true)
            router.push("/sign-in")
        } finally {
            setIsLoading(false)
        }
    }

    const getBookings = async () => {
        try {
            setIsLoading(true)
            const response = await FetchHelper.get(config.API_ENDPOINTS.GET_MY_BOOKINGS)
            if (response.data) {
                setTableData(response.data)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error?.response?.data?.data?.error_message) {
                toast.error(error?.response?.data?.data?.error_message)
            } else if (error?.response?.data?.message) {
                toast.error(error?.response?.data?.message)
            } else {
                handleError(error)
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (accessToken) getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])

    const columns = [
        {
            header: "Booking Date",
            accessorKey: "booking_date",
        },
        {
            header: "Schedule Date",
            accessorKey: "scheduled_date",
        },
        {
            header: "Schedule Time",
            accessorKey: "scheduled_time",
        },
        {
            header: "Status",
            accessorKey: "status",
        },
        {
            header: "Per Hour Price",
            accessorKey: "per_hour_rate",
        },
        {
            header: "Cleaning Hours",
            accessorKey: "cleaning_hours",
        },
        {
            header: "Total Price",
            accessorKey: "total_amount",
        },
        {
            header: "Cleaner Details",
            accessorKey: "cleaner_details",
        },
    ]
    return (
        <>
            <CustomLayout user={user} isLoading={isLoading}>
                <section className="mt-4">
                    <div className="container my-bookings">
                        <Datatable
                            tableType="Demo"
                            clearFilter={() => setfilterBy(null)}
                            // fetchData={fetchData}
                            setfilterBy={setfilterBy}
                            // setsortBy={setsortBy}
                            totalPage={totalPage}
                            setPage={setPage}
                            setpageSize={setPageSize}
                            data={tableData}
                            columns={columns}
                        />
                    </div>
                </section>
            </CustomLayout>
        </>
    )
}

export default WithAuth(MyBookings)
