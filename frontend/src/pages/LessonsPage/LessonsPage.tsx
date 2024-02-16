import "./LessonsPage.sass"
import React, {useEffect} from "react";
import {LessonsTable} from "./LessonsTable/LessonsTable";
import LessonsFilters from "./LessonsFilters/LessonsFilters";
import {useAuth} from "../../hooks/users/useAuth";
import {useNavigate } from "react-router-dom";

const LessonsPage = () => {

	const {is_authenticated} = useAuth()

	const navigate = useNavigate()

	useEffect(() => {
		if (!is_authenticated) {
			navigate("/auth/login/")
		}

		document.title = "Занятия"

	}, [])

	return (

		<div className="lessons-wrapper">

			<div className="top">

				<LessonsFilters />

			</div>

			<div className="bottom">

				<LessonsTable />

			</div>

		</div>
	)
}

export default LessonsPage;