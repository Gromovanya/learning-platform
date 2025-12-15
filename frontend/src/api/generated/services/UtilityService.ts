/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CSRFCookieResponse } from '../models/CSRFCookieResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UtilityService {
    /**
     * Принудительно устанавливает куку с CSRF-токеном. Должен быть вызван фронтендом при загрузке.
     * @returns CSRFCookieResponse
     * @throws ApiError
     */
    public static getCsrfTokenCookie(): CancelablePromise<CSRFCookieResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/csrf/',
            errors: {
                500: `No response body`,
            },
        });
    }
}
