import { api } from ".";
import type { CSRFCookieResponse } from "./generated";


export async function csrfTokenApi(): Promise<void> {
    const resp = await api.get<CSRFCookieResponse>('/csrf/');
    console.log(resp.data.detail);
}