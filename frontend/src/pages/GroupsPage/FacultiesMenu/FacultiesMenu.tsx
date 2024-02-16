import {useEffect} from "react";
import {FacultyItemAny} from "../../../utils/consts";
import {useGroups} from "../../../hooks/groups/useGroups";
import FacultyItem from "./FacultyItem/FacultyItem";
import "./FacultsMenu.sass"
import {api} from "../../../utils/api";

const FacultiesMenu = () => {
    const {faculties, setFaculties} = useGroups()

    const fetchData = async () => {
        const {data} = await api.get(`faculties/search/`)
        setFaculties(data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const items = faculties.map(faculty => (
        <FacultyItem faculty={faculty} key={faculty.id} />
    ))

    return (
        <div className={"faculty-wrapper"}>
            <span>Факультет</span>

            <FacultyItem faculty={FacultyItemAny} />

            { items }

        </div>
    )
}

export default FacultiesMenu;