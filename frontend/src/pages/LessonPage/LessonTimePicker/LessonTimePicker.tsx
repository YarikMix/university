import * as React from 'react'
import "./LessonTimePicker.sass"
import WeekSchedule from "./WeekSchedule/WeekSchedule";
import {LESSON_DAY, LESSON_TIME} from "/src/utils/consts";
import {useDraftLesson} from "../../../hooks/lessons/useDraftLesson";

const LessonTimePicker = () => {

    const {lesson} = useDraftLesson()

    const weeks = LESSON_TIME.map(time => {
        return (
            <WeekSchedule key={time.id} time={time}/>
        )
    })

    const days = LESSON_DAY.map(day => {
        return (
            <div className="day" key={day.id}>
                <span>{day.name}</span>
            </div>
        )
    })

    const selectedDay = LESSON_DAY.find(day => day.id == lesson.day_of_week)
    const selectedTime = LESSON_TIME.find(time => time.id == lesson.time)

    return (
        <div className={"group-schedule-wrapper"}>

            <div className="top">

                <div className="lesson-time">
                    <span>{selectedDay.full_name} {selectedTime.name}</span>
                </div>

            </div>

            <div className="bottom">

                <div className="days-container">

                    <div className={"corner"}></div>

                    <div className={"days"}>

                        {days}

                    </div>

                </div>

                <div className="lessons-container">

                    { weeks }

                </div>
            </div>

        </div>
    )
}

export default  LessonTimePicker;