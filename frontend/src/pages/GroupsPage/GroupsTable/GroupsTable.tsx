import {COURSES, EDUCATION_TYPES} from "../../../utils/consts";
import React, {useEffect} from "react";
import {useGroups} from "../../../hooks/groups/useGroups";
import {useGroupEditForm} from "../../../hooks/groups/useGroupEditForm";
import {useCustomTable} from "../../../hooks/other/useCustomTable";
import CustomTable from "../../../components/CustomTable/CustomTable";
import {useDesktop} from "../../../hooks/other/useDesktop";
import {useQuery} from "react-query";
import AddGroupForm from "../GroupsForms/AddGroupForm/AddGroupForm";
import EditGroupForm from "../GroupsForms/EditGroupForm/EditGroupForm";
import "../GroupsForms/GroupForms.sass"
import GroupsFilters from "../GroupsFilters/GroupsFilters";

const GroupsTable = () => {

    useEffect(() => {
        document.title = "Таблица групп"
    }, [])

    const COLUMNS = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Название",
            accessor: "name",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Факультет",
            accessor: "faculty",
            Cell: ({ value }) => { return value.name }
        },
        {
            Header: "Курс",
            accessor: "course",
            Cell: ({ value }) => { return COURSES.find(course => value == course.id).name.replace(" курс", "") }
        },
        {
            Header: "Вариант обучения",
            accessor: "education_type",
            Cell: ({ value }) => { return EDUCATION_TYPES.find(education_type => value == education_type.id).name }
        }
    ]

    const {openEditForm} = useGroupEditForm()

    const {searchGroups, selectedFaculties, query, course, education_type, queryPageIndex, queryPageSize, totalCount, setGroupsPage, setGroupsPageSize, setGroupsPageTotalCount} = useGroups()

    const {is800} = useDesktop()

    const fetchData = async () => {
        const data = await searchGroups()

        if (queryPageIndex * queryPageSize > data["totalCount"]) {
            gotoPage(0)
        }

        return data
    }

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["groups", selectedFaculties, query, course, education_type, queryPageIndex, queryPageSize],
        () => fetchData(),
        {
            keepPreviousData: true,
        }
    );

    const {
        getTableProps,
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
    } = useCustomTable(
        "groups",
        COLUMNS,
        queryPageIndex,
        queryPageSize,
        totalCount,
        isSuccess,
        data,
        setGroupsPage,
        setGroupsPageSize,
        setGroupsPageTotalCount,
        [
            {
                column: "course",
                flag: is800
            },
            {
                column: "education_type",
                flag: is800
            },
            {
                column: "faculty",
                flag: is800
            }
        ],
        [is800]
    )

    return (
        <div className="groups-wrapper">

            <GroupsFilters refetch={refetch} goto={gotoPage}/>

            <CustomTable
                getTableProps={getTableProps}
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                nextPage={nextPage}
                canNextPage={canNextPage}
                previousPage={previousPage}
                canPreviousPage={canPreviousPage}
                gotoPage={gotoPage}
                pageCount={pageCount}
                pageIndex={pageIndex}
                pageSize={pageSize}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={openEditForm}
            />

        </div>

    )
}

export default GroupsTable