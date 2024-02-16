import "./CustomTable.sass"
import Pagination from "../Pagination/Pagination";
import React from "react";
import Loader from "../Loader/Loader";

const CustomTable = ({getTableBodyProps, headerGroups, page, nextPage, canNextPage, previousPage, canPreviousPage, gotoPage, pageCount, pageIndex, pageSize, prepareRow, isLoading, children, onClick}) => {

    if (isLoading) {
        return (
            <div className="table-wrapper">

                {children}

                <Loader />

            </div>
        )
    }

    const onTdClicked = (row, e) => {
        if (e.target.tagName != "BUTTON") {
            onClick(row.values.id)
        }
    }

    return (
        <div className="table-wrapper">

            { children }

            <table>
                <thead>
                {
                    headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map( (column: any) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))
                }
                </thead>
                <tbody {...getTableBodyProps()}>
                {
                    page.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} onClick={(e) => onTdClicked(row, e)}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>
                                        {cell.column.id === 'id' ? pageSize * pageIndex + i + 1 : cell.render('Cell')}
                                    </td>
                                })}
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>

            <Pagination
                pageIndex={pageIndex}
                pageCount={pageCount}
                gotoPage={gotoPage}
                canPreviousPage={canPreviousPage}
                previousPage={previousPage}
                canNextPage={canNextPage}
                nextPage={nextPage}
            />

        </div>

    )
}

export default CustomTable