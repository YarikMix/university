import {useDispatch, useSelector} from 'react-redux'
import {
	updateDay,
	updateLesson,
	updateTime,
	updateGroups,
	updateDiscipline,
	updateAudience,
	updateTeacher,
	updateBusyDays
} from "../../store/lessons/draftLessonSlice"
import {useToken} from "../users/useToken"
import {api} from "../../utils/api";
import {groupAddedMessage, groupAlreadyAddedMessage, groupRemoveMessage, requestErrorMessage} from "../../utils/toasts";

export function useDraftLesson() {

	const {access_token} = useToken()

	const lesson = useSelector(state => state.draftLesson.lesson)

	const busy_days = useSelector(state => state.draftLesson.busy_days)

	const is_draft = lesson?.status == 1

	const dispatch = useDispatch()

	const setLesson = (value) => {
		dispatch(updateLesson(value))
	}

	const setGroups = (value) => {
		dispatch(updateGroups(value))
	}

	const setDay = (value) => {
		dispatch(updateDay(value))
	}

	const setTime = (value) => {
		dispatch(updateTime(value))
	}

	const setDiscipline = (value) => {
		dispatch(updateDiscipline(value))
	}

	const setAudience = (value) => {
		dispatch(updateAudience(value))
	}

	const setTeacher = (value) => {
		dispatch(updateTeacher(value))
	}

	const setBusyDays = (value) => {
		dispatch(updateBusyDays(value))
	}

	const saveLesson = async () => {

		await api.put(`lessons/${lesson.id}/update/`, lesson,{
			headers: {
				'authorization': access_token
			}
		})

	}

	const fetchBusyDays = async () => {

		const {data} = await api.post("groups/schedule/", {
			groups: lesson.groups.map(group => group.id)
		})

		setBusyDays(data)
	}

	const addGroupToLesson = async (group) => {

		try {
			const response = await api.post(`groups/${group.id}/add_to_lesson/`, {}, {
				headers: {
					'authorization': access_token
				},
			});

			if (response.status == 200) {
				groupAddedMessage(group.name, response.data["id"])
				setLesson(response.data)
			}

		} catch (e)
		{
			if (e.response.status == 409) {
				groupAlreadyAddedMessage()
			} else {
				requestErrorMessage()
			}
		}
	}

	const deleteGroupFromLesson = async (group) => {
		const response = await api.delete(`lessons/${lesson.id}/delete_group/${group.id}/`, {
			headers: {
				'authorization': access_token
			}
		});

		if (response.status == 200) {
			setGroups(response.data["groups"])
			groupRemoveMessage(group?.name, lesson.id)
		}
	}

	const fetchLesson = async (lesson_id) => {
		const {data} = await api.get(`lessons/${lesson_id}`, {
			headers: {
				'authorization': access_token
			}
		})
		setLesson(data)
	}


	return {
		lesson,
		busy_days,
		is_draft,
		setBusyDays,
		setLesson,
		setGroups,
		setDay,
		setTime,
		setDiscipline,
		setAudience,
		setTeacher,
		saveLesson,
		fetchBusyDays,
		addGroupToLesson,
		deleteGroupFromLesson,
		fetchLesson
	};
}