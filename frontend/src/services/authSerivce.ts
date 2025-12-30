import { api } from "../api/api"
import type { AuthResponse, Register } from "../api/generated";
import { API_LOGIN, API_LOGOUT, API_REFRESH, API_REGISTER } from "../constants/constsApiPath"
import type { LoginRequest } from "../types/auth";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { useNotificationStore } from "../store/notificationStore";

let refreshPromise: Promise<void> | null = null;
const updateAccess = (token: string) => {
    if (token) {
        useAuthStore.getState().setAccessToken(token);
    }
}

export const authService = {

    async refreshUser() {
        if (refreshPromise) return refreshPromise;

        refreshPromise = (async () => {
            try {
                const resp = await api.post<AuthResponse>(API_REFRESH);
                const token = resp.data.access
                if (token) updateAccess(token)
            } finally {
                refreshPromise = null
            }
        })();
        return refreshPromise
    },

    async loginUser(data: LoginRequest) {
        const resp = await api.post<AuthResponse>(API_LOGIN, data);
        const token = resp.data.access
        if (token) updateAccess(token)
    },

    async registerUser(data: Register) {
        const resp = await api.post<AuthResponse>(API_REGISTER, data);
        const token = resp.data.access
        if (token) updateAccess(token)
    },

    async logoutUser() {
        try {
            await api.post(API_LOGOUT);
        } catch {
            console.error("Server logout failed")
        } finally {
            useNotificationStore.getState().clearNotifications()
            useAuthStore.getState().logout()
        }
    },

    async init() {
        try {
            // console.log(refreshPromise)
            await this.refreshUser();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.warn("Session init: User is guest or session expired: ", error.response?.data);
            }
           useAuthStore.getState().logout();
        } finally {
            useAuthStore.getState().setInitialized(true);
        }
    }
}