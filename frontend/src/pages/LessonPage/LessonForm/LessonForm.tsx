import GroupsTagList from "../../../components/GroupsTagList/GroupsTagList";
import * as React from "react";
import {debounce} from "lodash";
import {useEffect, useRef} from "react";
import {useDraftLesson} from "../../../hooks/lessons/useDraftLesson";

const LessonForm = () => {

    const {lesson, setDiscipline, setTeacher} = useDraftLesson()

    const updateDiscipline = debounce((e) => setDiscipline(e.target.value), 100)
    const updateTeacher = debounce((e) => setTeacher(e.target.value), 100)

    const input1 = useRef<HTMLInputElement>(null)
    const input2 = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (lesson != undefined)
        {
            input1.current.value = lesson.discipline
            input2.current.value = lesson.teacher
        }
    }, [])

    return (
        <div className="inputs-container">

            <GroupsTagList lesson={lesson} readOnly={false}/>

            <div className="input-container">
                <span>Дисциплина</span>
                <input type="text" placeholder="Дисциплина" name="discipline" ref={input1} onChange={updateDiscipline} />
            </div>

            <div className="input-container">
                <span>Преподаватель</span>
                <input type="text" placeholder="Преподаватель" name="teacher" ref={input2} onChange={updateTeacher} />
            </div>

            <input type="hidden" name="day_of_week" value={lesson.day_of_week}/>

            <input type="hidden" name="time" value={lesson.time}/>

        </div>
    )
}

export default LessonForm