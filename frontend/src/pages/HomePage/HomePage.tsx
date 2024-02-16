import "./HomePage.sass"
import image from "./student.png"
import {useEffect} from "react";

const HomePage = () => {

	useEffect(() => {
		document.title = "Главная"
	}, [])

	return (
		<div className="home-page-wrapper">

			<div className="text-container">
				<h1>Добро пожаловать в электронный университет!</h1>
				<h3>Здесь вы можете узнать свое расписание</h3>
			</div>

			<img src={image} className="image" alt=""/>

			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="wave">
				<path fill="#373c4f" fillOpacity="1" d="M0,160L80,165.3C160,171,320,181,480,197.3C640,213,800,235,960,224C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
			</svg>

		</div>
	)
}

export default HomePage;