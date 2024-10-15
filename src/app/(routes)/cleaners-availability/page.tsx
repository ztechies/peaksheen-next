"use client"
import CustomLayout from "../../components/common/CustomLayout"
import { useEffect, useState } from "react"
import { FetchHelper } from "@/services/fetch-helper"
import { config } from "@/utils/constants"
import { handleError } from "@/utils/handle-error"
import { getAccessToken } from "@/utils/common"
import { User } from "@/types/auth/user"
import toast from "react-hot-toast"
import Datatable from "@/app/components/DataTable/Datatable"
import { useSearchParams } from "next/navigation"
import { Spinner } from "react-bootstrap"
import { logout } from "@/utils/logout"

type Cleaner = {
    first_name: string
    last_name: string
    email: string
    phone_number: string
    address: string
    rating: string
}

const CleanersList = () => {
    const [cleaners, setCleaners] = useState<Cleaner[]>([])
    const [offset, setOffset] = useState<number>(0)
    const [hasMore, setHasMore] = useState<boolean>(false)

    const accessToken = getAccessToken()
    const [user, setUser] = useState<User>()
    const [isLoading, setIsLoading] = useState(false)
    const [totalPage, setPage] = useState(1)
    // eslint-disable-next-line
    const [page, setPageSize] = useState(config.PER_PAGE_PAGINATION_LIMIT)

    // eslint-disable-next-line
    const [filterBy, setfilterBy] = useState<{ [key: string]: string | unknown } | null>(null)

    const queryParams = useSearchParams()
    const emailAddress = queryParams.get("email")
    const postCode = queryParams.get("postal_code")

    const getCleaners = async () => {
        try {
            setIsLoading(true)
            const requesData = {
                email: emailAddress,
                postal_code: postCode,
                offset,
            }
            const response = await FetchHelper.post(
                config.API_ENDPOINTS.GET_CLEANERS_BY_PINCODE,
                requesData,
            )
            if (response.data && response.status_code === config.STATUS_CODES.SUCCESS) {
                const newCleaners: Cleaner[] = response.data
                setCleaners((prevCleaners) => [...prevCleaners, ...newCleaners])
                setOffset(response.next_offset)
                setHasMore(response.has_more)
            } else if (response.status_code === config.STATUS_CODES.NO_CONTENT) {
                setHasMore(false)
                toast.error(response?.message)
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

    const getUser = async () => {
        try {
            setIsLoading(true)
            const response = await FetchHelper.get(config.API_ENDPOINTS.GET_USER_BY_TOKEN)
            if (response.data) {
                setUser(response.data)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            logout()
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (accessToken) getUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken])

    // Handler for the "Load More" button
    const handleLoadMore = () => {
        getCleaners()
    }

    useEffect(() => {
        if (emailAddress && postCode) {
            getCleaners()
        } else {
            toast.error("Invalid Search Parameters. Please try again")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emailAddress, postCode])

    const columns = [
        {
            header: "First Name",
            accessorKey: "first_name",
        },
        {
            header: "Last Name",
            accessorKey: "last_name",
        },
        {
            header: "Mobile",
            accessorKey: "phone_number",
        },
        {
            header: "Ratings",
            accessorKey: "rating",
        },
        {
            header: "Address",
            accessorKey: "address",
        },
    ]
    return (
        <div>
            <CustomLayout user={user} isLoading={isLoading}>
                <section className="mt-4">
                    <div className="container cleaners-availability">
                        <Datatable
                            tableType="Cleaner-Availability"
                            clearFilter={() => setfilterBy(null)}
                            setfilterBy={setfilterBy}
                            totalPage={totalPage}
                            setPage={setPage}
                            setpageSize={setPageSize}
                            data={cleaners}
                            columns={columns}
                        />
                    </div>
                    <div className="text-center my-4">
                        {hasMore && (
                            <button
                                className={`btn button-global ${isLoading ? "disabled" : ""} `}
                                type="button"
                                onClick={handleLoadMore}
                            >
                                {isLoading ? (
                                    <Spinner
                                        animation="border"
                                        role="status"
                                        variant="light"
                                        size="sm"
                                    />
                                ) : (
                                    "Load More"
                                )}
                            </button>
                        )}
                    </div>
                </section>
            </CustomLayout>
        </div>
    )
}

export default CleanersList
