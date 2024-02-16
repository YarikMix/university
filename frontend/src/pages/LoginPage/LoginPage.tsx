import "./LoginPage.sass"
import {Link, useNavigate } from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useEffect} from "react";

const LoginPage = () => {

    const navigate = useNavigate()

    const { login, auth } = useAuth()


    const handleSubmit = async (e) => {

        e.preventDefault()

        const formData = new FormData(e.target as HTMLFormElement)

        const flag = await login(formData)

        if (flag) {

            navigate("/spares")

        }
    }


    const handleAuth = async () => {
        const flag = await auth()
        if (flag) {
            navigate("/spares")
        }
    }

    useEffect(() => {
        handleAuth()
    }, []);


    return (
        <div className="login-page-wrapper">
            <div className="header">

                <span>Вход</span>

            </div>

            <form className="inputs-container" onSubmit={handleSubmit}>

                <div className="input-item">
                    <input type="email" name="email" placeholder="Почта" required/>
                </div>

                <div className="input-item">
                    <input type="password" name="password"  placeholder="Пароль" required/>
                </div>

                <div className="sign-up-link-container">
                    <Link to="/register" className="link">
                        <span> Ещё нет аккаунта? </span>
                    </Link>
                </div>

                <button type="submit">Войти</button>

            </form>
        </div>
    )
}

export default LoginPage;