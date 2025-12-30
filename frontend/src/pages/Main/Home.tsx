import { useNavigate } from "react-router-dom";
import { URL_LOGIN, URL_PROFILE, URL_REGISTER } from "../../constants/constsUrlPath";
import { authService } from "../../services/authSerivce";
// import { useNotificationStore } from "../../store/notificationStore";
// import { useAuthStore } from "../../store/AuthStore";


function HomePage() {
    const navigate = useNavigate()
    // const { accessToken, isAuthenticated } = useAuthStore()
    // console.log('access=', accessToken, isAuthenticated)
    // const { queueNotifications, popNotifications } = useNotificationStore()
    
    // if (popNotifications[0]) {
    //     console.log('Notifications=', popNotifications, queueNotifications, popNotifications[0].count)

    // } else {
    //     console.log('Notification=', popNotifications, queueNotifications)
    // }
    
    return (
        <>
            <h1>Home page</h1>
            <button onClick={() => navigate(URL_LOGIN)}>Логин</button>
            <button onClick={() => navigate(URL_REGISTER)}>Регистрация</button>
            <button onClick={() => navigate(URL_PROFILE)}>Профиль</button>
            <button onClick={() => authService.logoutUser()}>Выйти</button>
        </>
    );
}

export default HomePage
