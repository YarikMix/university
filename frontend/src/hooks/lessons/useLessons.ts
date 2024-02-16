import {useDispatch, useSelector} from 'react-redux';
import {
	pageChanged,
	pageSizeChanged,
	totalCountChanged,
	updateDate,
	updateStatus,
	updateUser
} from "../../store/lessons/lessonsSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";

export function useLessons() {
	const queryPageIndex = useSelector(state => state.lessons.queryPageIndex)
	const queryPageSize = useSelector(state => state.lessons.queryPageSize)
	const totalCount = useSelector(state => state.lessons.totalCount)
	const status = useSelector(state => state.lessons.status)
	const user = useSelector(state => state.lessons.user)
	const users = useSelector(state => state.lessons.users)
	const date = useSelector(state => state.lessons.date)

	const dispatch = useDispatch()

	const setLessonsPage = (value) => {
		dispatch(pageChanged(value))
	}

	const setLessonsPageSize = (value) => {
		dispatch(pageSizeChanged(value))
	}

	const setLessonsPageTotalCount = (value) => {
		dispatch(totalCountChanged(value))
	}

	const setStatus = (value) => {
		dispatch(updateStatus(value))
	}

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const setDate = (value) => {
		dispatch(updateDate(value))
	}

	const searchLessons = async () => {

		const offset = queryPageIndex * queryPageSize

		const {access_token} = useToken()

		const {data} = await api.get(`lessons/search`, {
			params: {
				status: status,
				date_start: date.start,
				date_end: date.end,
				offset: offset,
				limit: queryPageSize
			},
			headers: {
				'authorization': access_token
			}
		})

		data["lessons"] = data["lessons"].filter(lesson => lesson.user.name.includes(user))

		return data
	}


	return {
		queryPageIndex,
		queryPageSize,
		totalCount,
		status,
		user,
		users,
		date,
		setLessonsPage,
		setLessonsPageSize,
		setLessonsPageTotalCount,
		setStatus,
		setUser,
		setDate,
		searchLessons
	};
}