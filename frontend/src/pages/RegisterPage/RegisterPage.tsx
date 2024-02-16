import "./RegisterPage.sass"
import {useEffect} from "react";
import {useAuth} from "../../hooks/users/useAuth";
import {Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {

    const navigate = useNavigate()

    const { register, auth } = useAuth()


    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData:FormData = new FormData(e.target as HTMLFormElement)

        const flag = await register(formData)

        if (flag) {

            navigate("/auth/login")

        }
    }

    const handleAuth = async () => {
        const flag = await auth()

        if (flag) {
            navigate("/home")
        }
    }

    useEffect(() => {
        handleAuth()
    }, []);

    return (
        <div className="login-page-wrapper">
            <div className="header">

                <span>Регистрация</span>

            </div>

            <form className="inputs-container" onSubmit={handleSubmit}>

                <div className="input-item">
                    <input type="email" name="email" placeholder="Почта" required/>
                </div>

                <div className="input-item">
                    <input type="text" name="name" placeholder="Имя" required/>
                </div>

                <div className="input-item">
                    <input type="password" name="password"  placeholder="Пароль" required/>
                </div>

                <div className="sign-up-link-container">
                    <Link to="/login" className="link">
                        <span>Уже есть аккаунт?</span>
                    </Link>
                </div>

                <button type="submit">Создать аккаунт</button>

            </form>
        </div>
    )
}

export default RegisterPage;