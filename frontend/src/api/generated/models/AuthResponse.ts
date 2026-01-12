/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from './User';
/**
 * Описывает структуру JSON-ответа. Хранит access токен, для доступа пользователя
 */
export type AuthResponse = {
    /**
     * JWT access токен
     */
    access: string;
    readonly user: User;
};

