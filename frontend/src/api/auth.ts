import { api } from ".";
import { setAccessToken } from "./accessToken";
import type { AuthResponse, Register} from "./generated/index.ts";
import type { LoginRequest } from "../types/api.ts";

export async function loginApi(data: LoginRequest): Promise<void> {
    const resp = await api.post<AuthResponse>('/login/', data);
    setAccessToken(resp.data.access);
}

export async function registerApi(data: Register): Promise<void> {
    const resp = await api.post<AuthResponse>('/register/', data);
    setAccessToken(resp.data.access);
}

export async function logoutApi(): Promise<void> {
    api.post('/logout/');
    setAccessToken(null);
}

export async function refreshApi(): Promise<void> {
    const resp = await api.post<AuthResponse>('/refresh/');
    setAccessToken(resp.data.access);
}