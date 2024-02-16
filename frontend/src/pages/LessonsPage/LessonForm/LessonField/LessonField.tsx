import * as React from "react";
import "./LessonField.sass"

const LessonField = ({title, id, value}) => {
	return (
		<div className="lesson-field-container">

			<span>{title}</span>

			<div className="field" id={id} >
				{value}
			</div>

		</div>
	)
}

export default LessonField;