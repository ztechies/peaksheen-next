"use client"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    PaginationState,
    ColumnFiltersState,
    SortingState,
    getSortedRowModel, // Import getSortedRowModel
} from "@tanstack/react-table"
import React, { Dispatch, SetStateAction, useEffect } from "react"
import { BsChat, BsPhone } from "react-icons/bs"
import { BsArrowBarDown, BsArrowBarUp, BsStar } from "react-icons/bs"
import { Button } from "react-bootstrap"

function Datatable<T extends { [key: string]: string }>({
    data,
    totalPage,
    columns,
    setPage,
    // setsortBy, // Removed server-side sort prop
    setfilterBy,
    setpageSize,
    clearFilter,
    // tableType,
    // handleTabChange,
}: {
    data: T[]
    totalPage: number
    columns: ColumnDef<T>[]
    clearFilter: () => void
    setPage: Dispatch<SetStateAction<number>>
    setfilterBy: Dispatch<SetStateAction<{ [key: string]: string | unknown } | null>>
    // setsortBy: Dispatch<SetStateAction<string | null>>; // Removed server-side sort prop
    setpageSize: Dispatch<SetStateAction<number>>
    tableType: string
    handleTabChange?: (value: string) => void
}) {
    const [columnInformation, setColumnInformation] = React.useState<ColumnDef<T>[]>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    })
    const pagination = React.useMemo(
        () => ({
            pageIndex,
            pageSize,
        }),
        [pageIndex, pageSize],
    )

    // Initialize column sorting capabilities
    useEffect(() => {
        const columnsData = columns.map((col) => ({
            ...col,
            enableSorting: col.enableSorting !== false,
        }))
        setColumnInformation(columnsData)
    }, [columns])

    // Handle pagination and filtering without server-side sorting
    useEffect(() => {
        const debounceInterval = setTimeout(() => {
            const pageIndex2 = pageIndex + 1
            const filters: { [key: string]: string | unknown } = {}

            setPage(pageIndex2)
            setpageSize(pageSize)
            columnFilters.forEach(({ id, value }) => {
                if (["weight", "height"].includes(id)) {
                    filters[id] = encodeURI(String(value))
                } else {
                    filters[id] = value
                }
            })
            columnFilters.length > 0 ? setfilterBy(filters) : clearFilter()
            // Removed server-side sorting logic
        }, 500) // Reduced debounce time for better UX
        return () => {
            clearTimeout(debounceInterval)
        }
    }, [pageIndex, pageSize, columnFilters, setPage, setfilterBy, setpageSize, clearFilter])

    // Reset pagination when filters change
    useEffect(() => {
        setPagination((prevPagination) => ({
            ...prevPagination,
            pageIndex: 0,
        }))
    }, [columnFilters])

    // Configure the table with client-side sorting
    const table = useReactTable<T>({
        data,
        columns: columnInformation,
        pageCount: totalPage ?? -1,
        state: {
            sorting,
            columnFilters,
            pagination,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(), // Enable client-side sorting
        getPaginationRowModel: getSortedRowModel(), // Ensure pagination works with sorting
    })

    const { getRowModel, getHeaderGroups } = table

    return (
        <>
            <div style={{ textAlign: "right" }}>
                {!!columnFilters.length && (
                    <Button
                        style={{ margin: "11px 11px 0px 11px" }}
                        size="sm"
                        onClick={() => {
                            clearFilter()
                            setColumnFilters([])
                        }}
                    >
                        Clear
                    </Button>
                )}
            </div>

            <div className="table-responsive text-nowrap">
                <table className="table">
                    <thead>
                        {getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id}>
                                        <div
                                            {...{
                                                onClick: header.column.getToggleSortingHandler(),
                                            }}
                                            style={{
                                                margin: "10px",
                                                display: "flex",
                                                cursor: header.column.getCanSort()
                                                    ? "pointer"
                                                    : "default",
                                            }}
                                        >
                                            <span>
                                                {header.column.getIsSorted() ? (
                                                    header.column.getIsSorted() === "asc" ? (
                                                        <BsArrowBarDown />
                                                    ) : (
                                                        <BsArrowBarUp />
                                                    )
                                                ) : (
                                                    header.column.getCanSort()
                                                )}
                                            </span>
                                            <div className="header-no-wrap">
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                            </div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                style={{ borderStyle: "none", borderColor: "transparent" }}
                            >
                                {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    row.getVisibleCells().map((cell: any) => {
                                        return (
                                            <td key={cell.id}>
                                                {["buyer", "cleaner"].includes(cell.column.id) && (
                                                    <div>
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext(),
                                                        )}
                                                        <BsPhone style={{ marginRight: "5px" }} />
                                                        <BsChat style={{ marginRight: "5px" }} />
                                                    </div>
                                                )}
                                                {cell.column.id === "feedback" && (
                                                    <div>
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext(),
                                                        )}
                                                        <BsStar style={{ marginLeft: "5px" }} />
                                                    </div>
                                                )}
                                                {cell.column.id === "rating" && (
                                                    <div>
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext(),
                                                        )}
                                                        <BsStar style={{ marginLeft: "5px" }} />
                                                    </div>
                                                )}
                                                {![
                                                    "buyer",
                                                    "cleaner",
                                                    "feedback",
                                                    "rating",
                                                ].includes(cell.column.id) &&
                                                    flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext(),
                                                    )}
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default React.memo(Datatable)
