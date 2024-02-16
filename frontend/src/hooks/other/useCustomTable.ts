import {TableInstance, usePagination,  useTable} from "react-table";
import {useEffect, useMemo} from "react";

export const useCustomTable = (key, COLUMNS, queryPageIndex, queryPageSize, totalCount, isSuccess, data, setPage, setPageSize, setPageTotalCount, media=[], mediaFlags=[]) => {

    const tableColumns = useMemo(() => COLUMNS, [])

    const tableInstance = useTable<TableInstance>({
        columns:tableColumns,
        data: isSuccess ? data[key] : [],
        initialState: {
            pageIndex: queryPageIndex,
            pageSize: queryPageSize
        },
        manualPagination: true,
        pageCount: isSuccess ? Math.ceil(totalCount / queryPageSize) : null
    }, usePagination)

    const {
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        canNextPage,
        previousPage,
        canPreviousPage,
        gotoPage,
        pageCount,
        state: { pageIndex, pageSize },
        prepareRow,
        columns
    } = tableInstance

    useEffect(() => {
        setPage(pageIndex)
    }, [pageIndex])

    useEffect(() => {
        // TODO что это 0_0
        setPageSize(pageSize)
        gotoPage(pageCount - 1)
    }, [pageSize, gotoPage])

    useEffect(() => {
        if (data != undefined)
        {
            setPageTotalCount(data["totalCount"])
        }
    }, [data])

    const updateMedia = () => {
        media.forEach(item => {
            columns.find(c => c.id == item.column)?.toggleHidden(!item.flag)
        })
    }

    useEffect(() => {
        updateMedia();
    }, [...mediaFlags])

    return {
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        canNextPage,
        previousPage,
        canPreviousPage,
        gotoPage,
        pageCount,
        pageIndex,
        pageSize,
        prepareRow
    }
}