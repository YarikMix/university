import "./Header.sass"
import logo from "./Logo.png"
import ProfileMenu from "./ProfileMenu/ProfileMenu";

const Header = () => {

    return (
        <div className={"header-wrapper"}>
            <img src={logo} className={"logo"}  alt=""/>

            <ProfileMenu />

        </div>
    );
}

export default Header;
