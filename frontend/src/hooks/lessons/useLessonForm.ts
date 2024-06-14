import {useDispatch, useSelector} from 'react-redux';
import {setOpen, updateLesson} from "../../store/lessons/lessonFormSliсe";
import {successMessage} from "../../utils/toasts";
import {api} from "../../modules/api.ts";

export function useLessonForm(refetch) {
	const isOpen = useSelector(state => state.lessonForm.isOpen);
	const lesson = useSelector(state => state.lessonForm.lesson);

	const dispatch = useDispatch()

	const openForm = () => {
		dispatch(setOpen(true))
	}

	const toggleForm = (value) => {
		dispatch(setOpen(value))
	}

	const closeForm = () => {
		dispatch(setOpen(false))
		// setLesson(undefined)
	}

	const setLesson = (value) => {
		dispatch(updateLesson(value))
	}

	const fetchLesson = async (id) => {

		const {data} = await api.get(`lessons/${id}`);

		return data

	}

	const acceptLesson = async (lesson_id) => {

		const formData = new FormData()

		formData.append("status", "3")

		const response = await api.put(`lessons/${lesson_id}/update_status_admin/`, formData);

		if (response.status == 200) {
			refetch()
			setLesson(response.data)
			successMessage(`Занятие №${lesson_id} успешно завершено!`)
		}
	}

	const dismissLesson = async (lesson_id) => {

		const formData = new FormData()

		formData.append("status", "4")

		const response = await api.put(`lessons/${lesson_id}/update_status_admin/`, formData);

		if (response.status == 200) {
			refetch()
			setLesson(response.data)
			successMessage(`Занятие №${lesson_id} успешно отклонено!`)
		}
	}

	const showModal = async (id) => {
		console.log("showModal")
		console.log(id)
		const data = await fetchLesson(id)
		setLesson(data)
		openForm()
	}

	return {
		isOpen,
		lesson,
		setLesson,
		openForm,
		toggleForm,
		closeForm,
		showModal,
		acceptLesson,
		dismissLesson,
		fetchLesson
	};
}