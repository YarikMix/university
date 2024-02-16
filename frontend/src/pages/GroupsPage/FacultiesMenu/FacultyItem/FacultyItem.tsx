import "./FacultyItem.sass"
import {useEffect, useState} from "react";
import {useGroups} from "../../../../hooks/groups/useGroups";
import {Faculty} from "../../../../utils/types";

const FacultyItem = ({faculty}:{faculty:Faculty}) => {

	const {selectedFaculties, setSelectedFaculties} = useGroups()

	const [selected, setSelected] = useState(false)

	const handleClick = () => {
		let faculties = []

		setSelected(!selectedFaculties.includes(faculty.id))

		if (selected){
			faculties = selectedFaculties.filter((el) => el !== faculty.id)
		} else {
			faculties = [...selectedFaculties, faculty.id ]
		}

		setSelectedFaculties(faculties)
	}

	useEffect(() => {
		setSelected(selectedFaculties.includes(faculty.id))
	}, [])

	return (
		<button className={"faculty-item " + (selected ? "chosen" : "")} onClick={handleClick}>
			{faculty.name}
		</button>
	)
}

export default FacultyItem;