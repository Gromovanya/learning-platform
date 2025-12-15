/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthResponse } from '../models/AuthResponse';
import type { Register } from '../models/Register';
import type { TokenObtainPair } from '../models/TokenObtainPair';
import type { TokenRefresh } from '../models/TokenRefresh';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthService {
    /**
     * Логинит пользователя.
     * @param requestBody
     * @returns AuthResponse
     * @throws ApiError
     */
    public static userLogin(
        requestBody: TokenObtainPair,
    ): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/login/',
            body: requestBody,
            mediaType: 'application/json',
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
            url: '/api/logout/',
        });
    }
    /**
     * Получает refresh токен, если у того срок действия не кончился, вернёт access токен
     * @param requestBody
     * @returns AuthResponse
     * @throws ApiError
     */
    public static newAccessToken(
        requestBody: TokenRefresh,
    ): CancelablePromise<AuthResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/refresh/',
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
            url: '/api/register/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                500: `No response body`,
            },
        });
    }
}
