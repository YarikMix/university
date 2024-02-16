import "./Pagination.sass"
import React from "react";
import {FaAngleLeft, FaAngleRight, FaAnglesLeft, FaAnglesRight} from "react-icons/fa6";

const Pagination = ({pageIndex, pageCount, gotoPage, canPreviousPage, previousPage, canNextPage, nextPage}) => {
    return (
        <div className="pagination-wrapper">

            <div className="pagination-container">
                <button className="button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    <FaAnglesLeft />
                </button>

                <button className="button" onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <FaAngleLeft />
                </button>

                <div className="links-container">

                    {pageIndex >= 3 &&
                        <button className="button" onClick={() => gotoPage(0)}>
                            {1}
                        </button>
                    }

                    {pageIndex >= 3 &&
                        <span>...</span>
                    }

                    {pageIndex >= 1 &&
                        <button className="button" onClick={() => gotoPage(pageIndex - 1)}>
                            { pageIndex }
                        </button>
                    }

                    <button className="button selected" onClick={() => gotoPage(pageIndex)}>
                        { pageIndex + 1 }
                    </button>

                    {pageIndex < pageCount - 1 &&
                        <button className="button" onClick={() => gotoPage(pageIndex + 1)}>
                            { pageIndex + 2 }
                        </button>
                    }

                    { pageIndex <= pageCount - 3 &&
                        <span>...</span>
                    }

                    { pageIndex <= pageCount - 3 &&
                        <button className="button" onClick={() => gotoPage(pageCount - 1)}>
                            { pageCount }
                        </button>
                    }

                </div>

                <button className="button" onClick={() => nextPage()} disabled={!canNextPage}>
                    <FaAngleRight />
                </button>

                <button className="button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    <FaAnglesRight />
                </button>

            </div>

        </div>
    )
}

export default Pagination