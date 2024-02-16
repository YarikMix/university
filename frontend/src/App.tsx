import './styles/Main.sass'
import './styles/Reset.sass'
import './styles/Fonts.sass'
import {BrowserRouter, Route, Routes, Navigate, Outlet, useLocation } from 'react-router-dom';
import Header from "./components/Header/Header";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import GroupPage from "./pages/GroupPage/GroupPage";
import SignIn from "./pages/LoginPage/SignIn/SignIn";
import SignUp from "./pages/LoginPage/SignUp/SignUp";
import {Provider} from "react-redux"
import store from "./store/store"
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LessonConstructor from "./components/LessonConstructor/LessonConstructor";
import {useAuth} from "./hooks/users/useAuth";
import LessonPage from "./pages/LessonPage/LessonPage";
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import LessonsPage from "./pages/LessonsPage/LessonsPage";
import FacultiesPage from "./pages/FacultiesPage/FacultiesPage";
import {QueryClient, QueryClientProvider } from "react-query";
import GroupsList from "./pages/GroupsPage/GroupsList/GroupsList";
import GroupsTable from "./pages/GroupsPage/GroupsTable/GroupsTable";

const LoginFormLayout = () => {
	return (
		<div className="login-wrapper">
			<Outlet />
		</div>
	)
}

const TopPanelWrapper = () => {
	const {is_authenticated, is_moderator} = useAuth()
	const location = useLocation()

	return (
		<div className="top-panels-wrapper">
			<Breadcrumbs />
			{is_authenticated && !is_moderator && location.pathname.endsWith("groups-list") && <LessonConstructor /> }
		</div>
	)
}


function App() {

	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>

			<Provider store={store}>

				<BrowserRouter basename="/university">

					<div className="App">

						<div className="wrapper">

							<ToastContainer />

							<Header />

							<div className="content-wrapper">

								<TopPanelWrapper />

								<Routes>

									<Route path="/home" element={<HomePage />} />

									<Route path="/" element={<Navigate to="/home" replace />} />

									<Route path="/auth/" element={<LoginFormLayout />} >

										<Route path="" element={<Navigate to="login/" replace />} />

										<Route path="login/" element={<SignIn />} />

										<Route path="register/" element={<SignUp />} />

									</Route>

									<Route path="/profile" element={<ProfilePage />} />

									<Route path="/lessons" element={<LessonsPage />} />

									<Route path="/lessons/:id" element={<LessonPage />} />

									<Route path="/groups-list" element={<GroupsList />} />

									<Route path="/groups-table" element={<GroupsTable />} />

									<Route path="/groups/:id" element={<GroupPage />} />

									<Route path="/faculties" element={<FacultiesPage />} />

								</Routes>

							</div>

						</div>

					</div>

				</BrowserRouter>
			</Provider>

		</QueryClientProvider>
  )
}

export default App
