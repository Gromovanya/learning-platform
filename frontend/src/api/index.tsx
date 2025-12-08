import axios, { AxiosError, type AxiosResponse, type AxiosRequestConfig } from "axios";
import { getAccessToken, setAccessToken } from "./accessToken";
import { refreshApi } from "./auth";
// import { useNavigate } from "react-router-dom";

// const navigate = useNavigate()
const UNAUTH_URLS = ['/login/', '/register/', '/refresh/'];
let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value: Promise<AxiosResponse>) => void;
    reject: (reason?: AxiosError) => void;
    config: AxiosRequestConfig;
}> = [];

const processQueue = (error: AxiosError | null = null, token: string | null = null) => {
    failedQueue.forEach(prom => {
        if (token) {
            prom.config.headers = {...(prom.config.headers as Record<string, string>), Authorization: `Bearer ${token}`}
            prom.resolve(api.request(prom.config))
        } else {
            if (axios.isAxiosError(error)) {
                prom.reject(error)
            }
        }
    })
    failedQueue = []
};

export const api = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
});

api.interceptors.response.use(
    resp => resp,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status !== 401 || UNAUTH_URLS.includes(originalRequest.url)) {
            return Promise.reject(error);
        };

        if (isRefreshing) {
            return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject, config: originalRequest})
            });
        };
        isRefreshing = true;
        
        const retryOriginalRequest = new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject, config: originalRequest})
        });

        try {
            await refreshApi();
            processQueue(null, getAccessToken());
            return retryOriginalRequest;
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                processQueue(error, null);
                setAccessToken(null)
                // navigate('/auth/login/')
            }
            return Promise.reject(error)
        };
    }
)