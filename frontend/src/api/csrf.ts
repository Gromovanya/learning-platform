import { api } from ".";


export async function csrfTokenApi() {
    await api.get('/csrf/');
}