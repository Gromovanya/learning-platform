/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginatedSessionList } from '../models/PaginatedSessionList';
import type { PatchedSession } from '../models/PatchedSession';
import type { Session } from '../models/Session';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ApiService {
    /**
     * @param cursor The pagination cursor value.
     * @returns PaginatedSessionList
     * @throws ApiError
     */
    public static apiEducSessionsList(
        cursor?: string,
    ): CancelablePromise<PaginatedSessionList> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/educ/sessions/',
            query: {
                'cursor': cursor,
            },
        });
    }
    /**
     * @param requestBody
     * @returns Session
     * @throws ApiError
     */
    public static apiEducSessionsCreate(
        requestBody: Session,
    ): CancelablePromise<Session> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/educ/sessions/',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this session.
     * @returns Session
     * @throws ApiError
     */
    public static apiEducSessionsRetrieve(
        id: number,
    ): CancelablePromise<Session> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/educ/sessions/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id A unique integer value identifying this session.
     * @param requestBody
     * @returns Session
     * @throws ApiError
     */
    public static apiEducSessionsUpdate(
        id: number,
        requestBody: Session,
    ): CancelablePromise<Session> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/educ/sessions/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this session.
     * @param requestBody
     * @returns Session
     * @throws ApiError
     */
    public static apiEducSessionsPartialUpdate(
        id: number,
        requestBody?: PatchedSession,
    ): CancelablePromise<Session> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/educ/sessions/{id}/',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id A unique integer value identifying this session.
     * @returns void
     * @throws ApiError
     */
    public static apiEducSessionsDestroy(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/educ/sessions/{id}/',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any No response body
     * @throws ApiError
     */
    public static apiError500Retrieve(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/error/500',
        });
    }
    /**
     * OpenApi3 schema for this API. Format can be selected via content negotiation.
     *
     * - YAML: application/vnd.oai.openapi
     * - JSON: application/vnd.oai.openapi+json
     * @param format
     * @param lang
     * @returns any
     * @throws ApiError
     */
    public static apiSchemaRetrieve(
        format?: 'json' | 'yaml',
        lang?: 'af' | 'ar' | 'ar-dz' | 'ast' | 'az' | 'be' | 'bg' | 'bn' | 'br' | 'bs' | 'ca' | 'ckb' | 'cs' | 'cy' | 'da' | 'de' | 'dsb' | 'el' | 'en' | 'en-au' | 'en-gb' | 'eo' | 'es' | 'es-ar' | 'es-co' | 'es-mx' | 'es-ni' | 'es-ve' | 'et' | 'eu' | 'fa' | 'fi' | 'fr' | 'fy' | 'ga' | 'gd' | 'gl' | 'he' | 'hi' | 'hr' | 'hsb' | 'hu' | 'hy' | 'ia' | 'id' | 'ig' | 'io' | 'is' | 'it' | 'ja' | 'ka' | 'kab' | 'kk' | 'km' | 'kn' | 'ko' | 'ky' | 'lb' | 'lt' | 'lv' | 'mk' | 'ml' | 'mn' | 'mr' | 'ms' | 'my' | 'nb' | 'ne' | 'nl' | 'nn' | 'os' | 'pa' | 'pl' | 'pt' | 'pt-br' | 'ro' | 'ru' | 'sk' | 'sl' | 'sq' | 'sr' | 'sr-latn' | 'sv' | 'sw' | 'ta' | 'te' | 'tg' | 'th' | 'tk' | 'tr' | 'tt' | 'udm' | 'ug' | 'uk' | 'ur' | 'uz' | 'vi' | 'zh-hans' | 'zh-hant',
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/schema/',
            query: {
                'format': format,
                'lang': lang,
            },
        });
    }
}
