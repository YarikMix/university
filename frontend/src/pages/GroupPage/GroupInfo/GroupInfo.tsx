import "./GroupInfo.sass"
import FacultyIcon from "/src/components/FacultyIcon/FacultyIcon";
import {useEffect} from "react";
import {COURSES, EDUCATION_TYPES} from "/src/utils/consts";
import {useGroup} from "/src/hooks/groups/useGroup";
import {api} from "../../../utils/api";

const GroupInfo = ({ group_id }) => {

    const { group, setGroup } = useGroup()

    const fetchData = async () => {

        const {data} = await api.get(`groups/${group_id}`);

        setGroup(data)

        document.title = data["name"]

    };

    useEffect(() => {
        group_id && fetchData()
    }, [])

    if (group == undefined)
    {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className={"group-info-wrapper"}>

            <FacultyIcon className="faculty-image" faculty={group.faculty}/>

            <div className="group-info-details">
                <h3>Группа {group.name}</h3>
                <span>Факультет: {group.faculty.name}</span>
                <span>Курс: {COURSES.find(course => course.id == group?.course)?.name}</span>
                <span>Вариант обучения: {EDUCATION_TYPES.find(education_type => education_type.id == group?.education_type)?.name}</span>
                <span>Год начала обучения: {group.year_begin}</span>
                <span>Год конца обучения: {group.year_end}</span>
            </div>
        </div>
    )
}

export default  GroupInfo;