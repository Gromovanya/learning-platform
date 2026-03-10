import { api } from "../api/api"
import type { AuthResponse, Register } from "../api/generated";
import { API_GET_TICKET, API_LOGIN, API_LOGOUT, API_REFRESH, API_REGISTER } from "../constants/constsApiPath"
import axios, { type AxiosResponse } from "axios";
import { useAuthStore } from "../store/authStore";
import { useNotificationStore } from "../store/notificationStore";
import type { LoginRequest } from "../shared/api/schemas";

let refreshPromise: Promise<AxiosResponse<AuthResponse> | void> | null = null;

export const authService = {

    async refreshUser() {
        if (refreshPromise) return refreshPromise;

        refreshPromise = (async () => {
            try {
                const resp = await api.post<AuthResponse>(API_REFRESH);
                if (!refreshPromise) return;

                useAuthStore.getState().setAccessToken(resp.data.access);
                return resp

            } finally {
                refreshPromise = null
            }
        })();
        return refreshPromise
    },

    async loginUser(data: LoginRequest) {
        const resp = await api.post<AuthResponse>(API_LOGIN, data);
        const { access, user } = resp.data
        useAuthStore.getState().setAccessToken(access);
        useAuthStore.getState().setUser(user)
    },

    async registerUser(data: Register) {
        const resp = await api.post<AuthResponse>(API_REGISTER, data);
        const { access, user } = resp.data
        useAuthStore.getState().setAccessToken(access);
        useAuthStore.getState().setUser(user)

    },

    async logoutUser() {
        try {
            await api.post(API_LOGOUT);
        } catch {
            console.error("Server logout failed")
        } finally {
            useNotificationStore.getState().clearNotifications()
            useAuthStore.getState().logout()
            refreshPromise = null
        }
    },

    async init() {
        try {
            // console.log(refreshPromise)
            const resp = await this.refreshUser();
            if (resp && resp.data) {
                useAuthStore.getState().setUser(resp.data.user);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                console.warn("Session init: User is guest or session expired: ", error.response?.data);
                useAuthStore.getState().logout();
            } else if (axios.isAxiosError(error) && error.response?.status === 400) {
                console.warn(error.response?.data);
            }
        } finally {
            useAuthStore.getState().setInitialized(true);
        }
    },

    async getTicket(signal?: AbortSignal | undefined) {
        const resp = await api.post(API_GET_TICKET, {signal})
        return resp.data
    }
}