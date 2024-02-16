import "../LessonField/LessonField.sass"
import {useLessonForm} from "../../../../hooks/lessons/useLessonForm";
import * as React from "react";
import ClockAnimated from "./ClockAnimated/ClockAnimated";

const LessonAudienceField = () => {

    const { lesson } = useLessonForm(null)

    return (
        <div className="lesson-field-container">
            <span>Аудитория</span>

            <div className="field" >
                {lesson.audience_status == 1 && "Не определена"}
                {lesson.audience_status == 2 && "Определяется"}
                {lesson.audience_status == 3 && "Не удалось найти"}
                {lesson.audience_status == 4 && lesson.audience}
                {lesson.audience_status == 2 && <ClockAnimated />}
            </div>

        </div>
    )
}

export default LessonAudienceField