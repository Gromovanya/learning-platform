import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Session/Main";
import ProfilePage from "../pages/Auth/Profile";
import LoginPage from "../pages/Auth/Login";
import RegisterPage from "../pages/Auth/Register";
import { URL_HOME, URL_LOGIN, URL_PROFILE, URL_REGISTER, URL_SESSION } from "../constants/constsUrlPath";
import { ProtectedRoute, PublicRoute } from "../components/Routers";
import { Layout } from "../pages/Layout/Layout";
import SessionWrapper from "../pages/Session/SessionWrapper";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: URL_HOME, element: <HomePage /> },
            { path: `${URL_SESSION}:sessionId`, element: <SessionWrapper /> },
            {
                element: <ProtectedRoute />,
                children: [
                    { path: URL_PROFILE, element: <ProfilePage /> },
                ]
            },
        ],
    },
    {
        element: <PublicRoute />,
        children: [
            { path: URL_LOGIN, element: <LoginPage /> },
            { path: URL_REGISTER, element: <RegisterPage /> }
        ]
    }
])