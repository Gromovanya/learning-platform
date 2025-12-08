import { api } from ".";
import { setAccessToken } from "./accessToken";

export async function loginApi(name: string, password: string) {
    const resp = await api.post('/login/', {'username': name, 'password': password});
    setAccessToken(resp.data.access)
}

export async function registerApi(name: string, password: string) {
    const resp = await api.post('/register/', {'username': name, 'password': password});
    setAccessToken(resp.data.access);
}

export async function logoutApi() {
    api.post('/logout/');
    setAccessToken(null);
}

export async function refreshApi() {
    const resp = await api.post('/refresh/');
    setAccessToken(resp.data.access);
}