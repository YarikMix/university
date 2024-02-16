import "./LessonPage.sass"
import LessonTimePicker from "./LessonTimePicker/LessonTimePicker";
import TrashButton from "/src/components/TrashButton/TrashButton";
import {useDraftLesson} from "/src/hooks/lessons/useDraftLesson";
import {useToken} from "/src/hooks/users/useToken";
import {
	infoMessage,
	lessonAddMessage,
	lessonDeleteMessage,
	lessonSaveMessage,
	requestErrorMessage
} from "/src/utils/toasts";
import {useNavigate} from "react-router-dom";
import CustomButton from "/src/components/CustomButton/CustomButton";
import {variables} from "/src/utils/variables";
import {useEffect} from "react";
import * as React from "react";
import {api} from "../../utils/api";
import LessonForm from "./LessonForm/LessonForm";

const LessonPage = () => {

	const {lesson, busy_days, setLesson, saveLesson, fetchBusyDays} = useDraftLesson()

	const {access_token} = useToken()

	useEffect(() => {
		if (!lesson) {
			navigate("/groups/")
		}

		document.title = "Занятие"

		fetchBusyDays()
	}, [])

	const navigate = useNavigate()

	const deleteLesson = async () => {

		try {

			const response = await api.delete(`lessons/${lesson.id}/delete/`, {
				headers: {
					'authorization': access_token
				}
			})

			if (response.status == 200)
			{
				setLesson(undefined)

				lessonDeleteMessage(lesson.id)

				navigate("/groups-list")
			}

		} catch (e) {
			requestErrorMessage()
		}
	}

	const updateLessonStatus = async () => {

		try {

			const response = await api.put(`lessons/${lesson.id}/update_status_user/`, {}, {
				headers: {
					'authorization': access_token
				}
			})

			if (response.status == 200) {

				navigate("/lessons")

				setLesson(undefined)

				lessonAddMessage(lesson.id)

				infoMessage(`Отправлен запрос на определение аудтории для занятия №${lesson.id}!`)

			}

		} catch (e) {
			requestErrorMessage()
		}
	}

	const handleCreate = async(e) => {

		e.preventDefault()

		await saveLesson()

		if (lesson.groups.length == 0) {
			infoMessage("Занятие должно содержать хотя бы одну группу!")
			return
		}

		if (!lesson.discipline) {
			infoMessage("Пожалуйста укажите дисциплину!")
			return
		}

		if (!lesson.teacher) {
			infoMessage("Пожалуйста укажите преподавателя!")
			return
		}

		if (busy_days.find(item => item[0] == lesson.day_of_week && item[1] == lesson.time)) {
			infoMessage("У одной из групп уже есть занятие на это время!")
			return
		}

		await updateLessonStatus()

	}

	const handleSave = async(e) => {
		e.preventDefault()

		await saveLesson()

		lessonSaveMessage(lesson.id)
	}

	if (lesson == undefined)
	{
		return (
			<div className="lesson-page-wrapper empty">
				<h1>Пусто</h1>
			</div>
		)
	}

	return (
		<div className="lesson-page-wrapper">

			<div className="top-container">
				<h3>Новое занятие</h3>
			</div>

			<div className="bottom-container">

				<div className="left-container">

					<LessonForm />

					<div className="buttons-container">
						<CustomButton bg={variables.primary} text="Отправить" onClick={handleCreate}/>
						<CustomButton bg={variables.green} text="Сохранить" onClick={handleSave}/>
						<CustomButton  bg={variables.red} text="Удалить"  onClick={deleteLesson} />
					</div>

				</div>

				<div className="right-container">

					<LessonTimePicker />

				</div>

			</div>

		</div>
	)
}

export default LessonPage;