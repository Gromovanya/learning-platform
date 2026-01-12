import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { URL_HOME, URL_LOGIN } from "../constants/constsUrlPath";

export function ProtectedRoute() {
    const { isAuthenticated } = useAuthStore()
    const location = useLocation()

    if (!isAuthenticated) {
        return <Navigate to={URL_LOGIN} state={{
            from: location,
            notification: "Для доступа к этой странице необходимо войти в систему"
        }} replace />
    }

    return <Outlet />
}

export function PublicRoute() {
    const { isAuthenticated } = useAuthStore()
    if (isAuthenticated) {
        return <Navigate to={URL_HOME} replace />
    }

    return <Outlet />
}