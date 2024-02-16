import "./LessonForm.sass"
import {LESSON_DAY, LESSON_TIME} from "/src/utils/consts";
import * as React from "react";
import GroupsTagList from "/src/components/GroupsTagList/GroupsTagList";
import PopUpWindow from "../../../components/popUpWindow/popUpWindow";
import {useLessonForm} from "../../../hooks/lessons/useLessonForm";
import LessonField from "./LessonField/LessonField";
import {ru} from "../../../utils/momentLocalization";
import moment from "moment";
import LessonStatus from "./LessonStatus/LessonStatus";
import CustomButton from "../../../components/CustomButton/CustomButton";
import {variables} from "../../../utils/variables";
import {useAuth} from "../../../hooks/users/useAuth";
import LessonAudienceField from "./LessonAudienceField/LessonAudienceField";
import {useQuery} from "react-query";
import {useEffect, useState} from "react";
import {errorMessage, successMessage} from "../../../utils/toasts";


const LessonForm = ({refetch}) => {

	const { lesson, isOpen, closeForm, setLesson, acceptLesson, dismissLesson, fetchLesson } = useLessonForm(refetch)

	const [lastLesson, setLastLesson] = useState(undefined)

	useEffect(() => {
		console.log("lesson change")
		if (!lastLesson || !lesson) {
			console.log("lastLesson is undefined")
			return
		}

		console.log(lastLesson)

		if (lastLesson.id != lesson.id) {
			return
		}

		console.log("Был: " + lastLesson?.audience_status)
		console.log("Стал: " + lesson?.audience_status)

		if (lastLesson?.audience_status == 2 && lesson?.audience_status == 3) {
			errorMessage(`Не удалось найти аудиторию для занятия №${lesson?.id}!`)
		}
		if (lastLesson?.audience_status != 4 && lesson?.audience_status == 4) {
			successMessage(`Аудитория для занятия №${lesson?.id} успешно найдена!`)
		}

		setLastLesson(lesson)

	}, [lesson])

	const {is_moderator} = useAuth()

	const handleSubmit = (e) => {
		e.preventDefault()
	}

	useQuery(
		["lesson-form", isOpen],
		() => fetchLesson(lesson.id),
		{
			onSuccess: (data) => {
				console.log("Get data!")
				console.log(data)
				setLesson(data)
			},
			refetchInterval: () => (isOpen ? 1000 : false),
			refetchOnWindowFocus: false,
			cacheTime: 0,
			keepPreviousData: false
		}
	)

	if (lesson == undefined) {
		return (
			<PopUpWindow isOpen={isOpen} setClose={closeForm}>

			</PopUpWindow>
		)
	}

	return (
		<PopUpWindow isOpen={isOpen} setClose={closeForm}>

			<form className="input-container-wrapper" onSubmit={handleSubmit}>

				<div className="top-container">

					<h3>Занятие №{lesson.id}</h3>

				</div>

				<div className="bottom-container">

					<div className="top-row">

						<div className="left">

							<LessonStatus lesson={lesson} />

							<LessonField title="Создатель" id="user" value={lesson.user.name} />

							<GroupsTagList lesson={lesson} readOnly={true} setLesson={setLesson} />

						</div>

						<div className="right">

							<div className="container">
								<LessonField title="Время" id="lesson_time" value={LESSON_TIME.find(time => time.id == lesson.time).name} />
								<LessonField title="День недели" id="day_of_week" value={LESSON_DAY.find(day => day.id == lesson.day_of_week)?.full_name} />
							</div>

							<div className="container">
								<LessonField title="Дисциплина" id="discipline" value={lesson.discipline} />
								<LessonAudienceField />
							</div>

							<div className="container">
								<LessonField title="Преподаватель" id="teacher" value={lesson.teacher} />
								<LessonField title="Дата формирования" id="date_created" value={moment(lesson.date_created).locale(ru()).format("D MMMM HH:mm")} />
							</div>

							<div className="container">
								<LessonField title="Дата отправления" id="date_of_formation" value={moment(lesson.date_of_formation).locale(ru()).format("D MMMM HH:mm")} />
								<LessonField title="Дата завершения" id="date_complete" value={![2, 5].includes(lesson.status) ? moment(lesson.date_complete).locale(ru()).format("D MMMM HH:mm") : "Не завершен"} />
							</div>

							{is_moderator && lesson.status == 2 &&
								<div className="buttons-container">
									<CustomButton bg={variables.green} text="Принять" onClick={(e) => acceptLesson(lesson.id)} />
									<CustomButton bg={variables.red} text="Отклонить" onClick={(e) => dismissLesson(lesson.id)} />
								</div>
							}

						</div>
					</div>

				</div>

			</form>

		</PopUpWindow>
	)
}

export default LessonForm;