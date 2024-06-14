import "./ProfileMenu.sass"
import {useEffect, useState} from "react";
import Hamburger from "../Hamburger/Hamburger";
import {Link} from "react-router-dom";
import UserInfo from "./UserInfo/UserInfo";
import {useDesktop} from "../../../hooks/other/useDesktop.ts";
import {useAuth} from "/src/hooks/users/useAuth.ts";

const ProfileMenu = () => {

    const {is_authenticated, is_moderator, user_name, auth} = useAuth()

    const {isDesktopMedium} = useDesktop();

    useEffect(() => {
        auth()
    }, []);

    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div className={"profile-menu-wrapper"}>

            <div className={"menu-wrapper " + (isOpen ? "open" : "")}>

                <Link to="/home" className="menu-item" onClick={(e) => setIsOpen(false)}>
                    <span className="item">Главная</span>
                </Link>

                <Link to="/groups" className="menu-item" onClick={(e) => setIsOpen(false)}>
                    <span className="item">Список групп</span>
                </Link>

                {is_authenticated && is_moderator &&
                    <Link to="/groups-table" className="menu-item" onClick={(e) => setIsOpen(false)}>
                        <span className="item">Таблица групп</span>
                    </Link>
                }

                <Link to="/faculties" className="menu-item" onClick={(e) => setIsOpen(false)}>
                    <span className="item">Факультеты</span>
                </Link>

                {is_authenticated &&
                    <Link to="/lessons" className="menu-item" onClick={(e) => setIsOpen(false)}>
                        <span className="item">Занятия</span>
                    </Link>
                }

                {!is_authenticated &&
                    <Link to="/auth" className="menu-item" onClick={(e) => setIsOpen(false)}>
                        <span className="item">Вход</span>
                    </Link>
                }

                { is_authenticated && !isDesktopMedium &&
                    <Link to="/profile" className="menu-item" onClick={(e) => setIsOpen(false)}>
                        <span className="item">{user_name}</span>
                    </Link>
                }

                { is_authenticated && isDesktopMedium && <UserInfo />}

            </div>

            <Hamburger isOpen={isOpen} setIsOpen={setIsOpen} />

        </div>
    )
}

export default ProfileMenu;