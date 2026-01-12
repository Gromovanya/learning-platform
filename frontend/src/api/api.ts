import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { URLS_NOT_HEADER_ACCESS, URLS_ERROR_401_EXEPT } from "../constants/constsUrlPath";
import { getCookieValue } from "../utils/cookie";
import { authService } from "../services/authSerivce";
import { useAuthStore } from "../store/authStore";
import { useNotificationStore } from "../store/notificationStore";
import { BASE_API } from "../constants/constsApiPath";


export const api: AxiosInstance = axios.create({
    baseURL: BASE_API,
    withCredentials: true,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    const isExcept = URLS_NOT_HEADER_ACCESS.some(path => config.url?.includes(path));
    if (token && !isExcept) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    const csrfToken = getCookieValue('csrftoken');
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }
    return config;
});

api.interceptors.response.use(
    resp => resp,
    async error => {

        if (axios.isCancel(error)) return Promise.reject(error);

        if (!error.response && navigator.onLine) {
            setTimeout(() => useNotificationStore.getState().addNotification("Сервер недоступен. Попробуйте позже."), 100);
            return Promise.reject(error);
        }

        const status = error.response.status;
        if (status >= 500) {
            useNotificationStore.getState().addNotification('Ошибка сервера. Мы уже чиним!')
        } else if (status === 403) {
            useNotificationStore.getState().addNotification('У вас нет прав для этого действия.')
        }

        const originalRequest = error.config;
        
        if (status !== 401 || URLS_ERROR_401_EXEPT.includes(originalRequest.url) || originalRequest._retry) {
            return Promise.reject(error);
        };

        const currentToken = useAuthStore.getState().accessToken
        const requestToken = originalRequest.headers.Authorization?.replace('Bearer ', '');
        if (requestToken !== currentToken && currentToken) {
            api(error.config);
        }

        originalRequest._retry = true;
        try {
            await authService.refreshUser();
            return api(originalRequest);
        } catch (refreshError: unknown) {
            if (axios.isAxiosError(refreshError)) {
                useAuthStore.getState().logout()
            }
            return Promise.reject(refreshError)
        }
    }
)