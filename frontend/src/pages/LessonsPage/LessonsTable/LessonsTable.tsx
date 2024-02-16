import React from "react";
import {anyUsersOption, STATUSES} from "../../../utils/consts";
import {useLessonForm} from "../../../hooks/lessons/useLessonForm";
import CustomButton from "../../../components/CustomButton/CustomButton";
import {variables} from "../../../utils/variables";
import {ru} from "../../../utils/momentLocalization";
import moment from "moment";
import {useLessons} from "../../../hooks/lessons/useLessons";
import LessonForm from "../LessonForm/LessonForm";
import {useCustomTable} from "../../../hooks/other/useCustomTable";
import CustomTable from "../../../components/CustomTable/CustomTable";
import {useDesktop} from "../../../hooks/other/useDesktop";
import {useQuery} from "react-query";
import {useAuth} from "../../../hooks/users/useAuth";

export const LessonsTable = () => {

	const {is_moderator} = useAuth()

	const COLUMNS = [
		{
			Header: "№",
			accessor: "id"
		},
		{
			Header: "Статус",
			accessor: "status",
			Cell: ({ value }) => { return STATUSES.find(status => status.id == value).name }
		},
		{
			Header: "Дата формирования",
			accessor: "date_of_formation",
			Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM HH:mm") }
		},
		{
			Header: "Пользователь",
			accessor: "user",
			Cell: ({ value }) => { return value.name }
		},
		{
			Header: "Аудитория",
			accessor: "audience",
			Cell: ({ value }) => { return value }
		},
		{
			Header: "Статус аудитории",
			accessor: "audience_status",
			Cell: ({ value }) => {
				if (value == 1) return "Не найдена"
				if (value == 2) return "Определяется"
				if (value == 3) return "Не удалось найти"
				if (value == 4) return "Найдена"
				return value
			}
		}
	]

	if (is_moderator) {
		COLUMNS.push({
			Header: "",
			accessor: "accept_button",
			Cell: ({ cell }) => (
				is_moderator && cell.row.values.status == 2 && <CustomButton bg={variables.green} text="Принять" onClick={(e) => acceptLesson(cell.row.values.id)}/>
			)
		})

		COLUMNS.push({
			Header: "",
			accessor: "dismiss_button",
			Cell: ({ cell }) => (
				is_moderator && cell.row.values.status == 2 && <CustomButton bg={variables.red} text="Отклонить" onClick={(e) => dismissLesson(cell.row.values.id)}/>
			)
		})
	}

	const {date, status, user, queryPageIndex, queryPageSize, totalCount, setLessonsPage, setLessonsPageSize, setLessonsPageTotalCount, setUsers, searchLessons} = useLessons()

	const {isDesktopMedium, isMobile, is900} = useDesktop()

	const fetchData = async () => {
		const data = await searchLessons()

		if (queryPageIndex * queryPageSize > data["totalCount"]) {
			gotoPage(0)
		}
		return data
	}

	const { isLoading, data, isSuccess, refetch } = useQuery(
		["lessons", date, status, user, queryPageIndex, queryPageSize],
		() => fetchData(),
		{
			refetchInterval: 2000,
			refetchOnWindowFocus: false,
			cacheTime: 0,
			keepPreviousData: false,
		}
	);

	const {showModal, acceptLesson, dismissLesson} = useLessonForm(refetch)

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
		pageIndex,
		pageSize,
		prepareRow
	} = useCustomTable(
		"lessons",
		COLUMNS,
		queryPageIndex,
		queryPageSize,
		totalCount,
		isSuccess,
		data,
		setLessonsPage,
		setLessonsPageSize,
		setLessonsPageTotalCount,
		[
			{
				column: "date_of_formation",
				flag: is900
			},
			{
				column: "status",
				flag: isMobile
			},
			{
				column: "accept_button",
				flag: is_moderator && isDesktopMedium
			},
			{
				column: "dismiss_button",
				flag: is_moderator && isDesktopMedium
			}
		],
		[isDesktopMedium, isMobile, is900]
	)

	return (
		<div>

			<CustomTable
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
				onClick={showModal}
			/>

			<LessonForm refetch={refetch}/>

		</div>
	)
}