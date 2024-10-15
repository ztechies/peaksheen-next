import { PaginationPropType } from "@/types/components/pagination"
import classnames from "classnames"
import { DOTS, usePagination } from "./usePagination"

/**
 * TablePagination Component
 *
 * A pagination component for tables that includes page size selection and page navigation.
 *
 * @param {TablePaginationPropType} props - The properties passed to the component
 * @param {object} props.pagination - The current pagination state
 * @param {Function} props.setPagination - Function to update the pagination state
 * @param {number} props.totalCount - The total number of items to paginate
 *
 * @returns {JSX.Element} The pagination component with page size selection and page navigation
 */
const Pagination: React.FC<PaginationPropType> = (props) => {
    const { onChange, totalCount, siblingCount = 1, page, page_size } = props

    const paginationRange = usePagination({
        page,
        total: totalCount,
        siblingCount,
        page_size,
    })

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, page: number) => {
        onChange(event, page)
    }
    if (paginationRange) {
        if (page === 0 || paginationRange.length < 2) {
            return null
        }
    }

    const onPrevious = (event: React.MouseEvent<HTMLLIElement>) => {
        if (page > 1) onChange(event, page - 1)
    }
    let lastPage: number = page
    if (paginationRange) {
        lastPage = paginationRange[paginationRange.length - 1] as number
    }
    const onNext = (event: React.MouseEvent<HTMLLIElement>) => {
        if (page !== lastPage) onChange(event, page + 1)
    }

    return (
        <>
            <ul className="pagination">
                <li
                    onClick={(event) => onPrevious(event)}
                    className={classnames("paginate_button page-item previous", {
                        disabled: page === 1,
                    })}
                >
                    <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">
                            <i className="previous"></i>
                        </span>
                    </a>
                </li>
                {paginationRange &&
                    paginationRange.map((pageNumber, index) => {
                        if (pageNumber === DOTS) {
                            return (
                                <li key={pageNumber + index} className="pagination-item dots">
                                    &#8230;
                                </li>
                            )
                        }
                        return (
                            <>
                                <li
                                    key={pageNumber + index.toString()}
                                    className={`page-item paginate_button ${
                                        pageNumber === page ? "active" : ""
                                    } `}
                                >
                                    <a
                                        className={`page-link`}
                                        href="#"
                                        onClick={(event) =>
                                            handleClick(event, pageNumber as number)
                                        }
                                    >
                                        {pageNumber}
                                    </a>
                                </li>
                            </>
                        )
                    })}
                <li
                    className={classnames("page-item paginate_button next", {
                        disabled: page === lastPage,
                    })}
                    onClick={(event) => onNext(event)}
                >
                    <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">
                            <i className="next"></i>
                        </span>
                    </a>
                </li>
            </ul>
        </>
    )
}

export default Pagination
