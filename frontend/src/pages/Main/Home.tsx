import { useNavigate } from "react-router-dom";
import { logoutApi } from "../../api/auth";

function HomePage() {
    const navigate = useNavigate()
    return (
        <>
            <h1>Home page</h1>
            <button onClick={() => navigate('auth/login')}>Логин</button>
            <button onClick={() => navigate('auth/register')}>Регистрация</button>
            <button onClick={() => logoutApi()}>Выйти</button>
        </>
    );
}

export default HomePage
