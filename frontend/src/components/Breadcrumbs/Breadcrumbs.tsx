import { Link, useLocation } from "react-router-dom";
import "./Breadcrumbs.sass"
import {FaHome, FaChevronRight} from "react-icons/fa";
import {useGroup} from "../../hooks/groups/useGroup";

const Breadcrumbs = () => {

    const { group, setGroup } = useGroup()

    const resetSelectedGroup = () => setGroup(undefined)

    const location = useLocation()

    let currentLink = ''

    const topics = {
        "groups": "Список групп",
        "groups-table": "Таблица групп",
        "groups": "Группы",
        "faculties": "Факультеты",
        "draft": "Черновик",
        "lessons": "Занятия",
        "home": "Главная",
        "profile": "Профиль",
        "login": "Вход",
        "register": "Регистрация"
    }

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`

        if (currentLink.match(new RegExp('lessons/(\d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <FaChevronRight className={"chevron-icon"}/>

                    <Link to={currentLink}>
                        Новое занятие
                    </Link>

                </div>
            )
        }

        if (Object.keys(topics).find(x => x == crumb))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <FaChevronRight className={"chevron-icon"}/>

                    <Link to={currentLink} onClick={resetSelectedGroup}>
                        { topics[crumb] }
                    </Link>

                </div>
            )
        }

        if (currentLink.match(new RegExp('groups/(\d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <FaChevronRight className={"chevron-icon"}/>

                    <Link to={currentLink}>
                        { group?.name}
                    </Link>

                </div>
            )
        }
    });

    return (
        <div className="breadcrumbs">

            <div className="crumb">

                <Link to={"/"}>
                    <FaHome className={"home-icon"}/>
                </Link>


            </div>

            {crumbs}

        </div>
    )
}

export default Breadcrumbs;