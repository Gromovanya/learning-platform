/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Author } from './Author';
export type Session = {
    readonly id: number;
    title: string;
    description?: string | null;
    readonly author: Author;
    is_private?: boolean;
    readonly created_at: string;
    readonly participants_count: number;
    readonly is_member: boolean;
};

