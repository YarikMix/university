import "./LessonConstructor.sass"
import {useDraftLesson} from "../../hooks/lessons/useDraftLesson";
import {Link} from "react-router-dom";

const LessonConstructor = () => {

	const {lesson} = useDraftLesson()

	if (lesson == undefined) {
		return (
			<div className="lesson-constructor-container disabled">
				<span className="title">Новое занятие</span>
			</div>
		)
	}

	return (
		<Link to={`/lessons/${lesson.id}`} className="lesson-constructor-container">
			<span className="title">Новое занятие</span>
			{lesson.groups.length > 0 && <span className="badge">{lesson.groups.length}</span>}
		</Link>
	)
}

export default LessonConstructor;