/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthResponse } from '../models/AuthResponse';
import type { MyTokenRefresh } from '../models/MyTokenRefresh';
import type { Register } from '../models/Register';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Логинит пользователя.
     * @returns AuthResponse
     * @throws ApiError
     */
    public static userLogin(): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/login/',
        });
    }
    /**
     * Удаление сессии, очиска access и добавление refresh токена в blacklist
     * @returns any No response body
     * @throws ApiError
     */
    public static userLogout(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/logout/',
        });
    }
    /**
     * Обновляет access токен, используя refresh токен из HttpOnly куки.
     * @param requestBody
     * @returns AuthResponse
     * @throws ApiError
     */
    public static newAccessToken(
        requestBody: MyTokenRefresh,
    ): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/refresh/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Регистрирует пользователя.
     * @param requestBody
     * @returns AuthResponse
     * @throws ApiError
     */
    public static userRegister(
        requestBody: Register,
    ): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/register/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `No response body`,
            },
        });
    }
}
