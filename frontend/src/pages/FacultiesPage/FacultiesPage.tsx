import "./FacultiesPage.sass"
import {AnimatePresence, motion} from "framer-motion";
import {useFaculties} from "../../hooks/faculties/useFaculties";
import SearchBar from "../../components/SearchBar/SearchBar";
import FacultyCard from "./FacultyCard/FacultyCard";
import {useEffect} from "react";
import CustomButton from "../../components/CustomButton/CustomButton";
import {variables} from "../../utils/variables";
import {useFacultyAddForm} from "../../hooks/faculties/useFacultyAddForm";
import FacultyForms from "./FacultyForms/FacultyForms";
import {useAuth} from "../../hooks/users/useAuth";
import {api} from "../../utils/api";

const FacultiesPage = () => {

	const {is_moderator} = useAuth()

	const {openForm} = useFacultyAddForm()

	const { faculties, setFaculties, query, setQuery } = useFaculties()

	const cards = faculties.map(faculty  => (
		<FacultyCard faculty={faculty} key={faculty.id}/>
	))

	const searchFaculties = async () => {

		const {data} = await api.get(`faculties/search`, {
			params: {
				query: query
			}
		})

		setFaculties(data)

	}

	useEffect(() => {
		document.title = "Факультеты"
		searchFaculties()
	}, [query])


	return (
		<div className="faculties-wrapper">
			<div className="faculties-filters-container">
				<div className="top">

					<div className="left">
						<h3>Факультеты</h3>
					</div>

					<div className="right">
						{is_moderator && <CustomButton bg={variables.primary} text="Добавить факультет" onClick={openForm}/> }
						<SearchBar placeholder="Поиск факультетов..." query={query} setQuery={setQuery} width={275}/>
					</div>

				</div>
			</div>

			<motion.div className="faculties-list-wrapper">

				<AnimatePresence>

					{ cards }

				</AnimatePresence>

			</motion.div>

			<FacultyForms />

		</div>
	)
}

export default FacultiesPage;