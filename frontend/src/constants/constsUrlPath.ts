import { API_LOGIN, API_LOGOUT, API_REFRESH, API_REGISTER } from "./constsApiPath";

export const URLS_ERROR_401_EXEPT = [API_LOGIN, API_REFRESH, API_LOGOUT];
export const URLS_NOT_HEADER_ACCESS = [API_LOGIN, API_REGISTER, API_REFRESH];
export const URL_LOGIN = "/auth/login";
export const URL_REGISTER = "/auth/register";
export const URL_PROFILE = '/profile'
export const URL_HOME = "/";
export const UNKNOWN_PATH = '*'