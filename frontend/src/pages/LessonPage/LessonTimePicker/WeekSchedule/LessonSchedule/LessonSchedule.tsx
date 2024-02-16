import * as React from 'react'
import "./LessonSchecule.sass";
import {useDraftLesson} from "/src/hooks/lessons/useDraftLesson";
import {BsFillCheckCircleFill} from "react-icons/bs";
import {infoMessage} from "../../../../../utils/toasts";

const LessonSchedule = ({ day, time }) => {

    const { lesson, setDay, setTime, busy_days } = useDraftLesson()

    const flag = busy_days.find(item => item[0] == day.id && item[1] == time.id)

    const onChooseTime = async (e) => {

        if (flag) {
            infoMessage("У одной из групп уже есть занятие на это время!")
            return
        }

        e.target.classList.add("animate")

        setTimeout(() => {
            e.target.classList.remove("animate")
        }, 600)

        setDay(day.id)
        setTime(time.id)
    }

    const isSelected = lesson.day_of_week == day.id && lesson.time == time.id

    return (
        <div className={"lesson " + (flag ? "disabled" : "")} onClick={onChooseTime}>
            {isSelected && <BsFillCheckCircleFill />}
        </div>
    )
}

export default LessonSchedule;