/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type User = {
    readonly id: number;
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     */
    readonly username: string;
    avatar?: string | null;
    nickname?: string | null;
    first_name?: string;
    last_name?: string;
    readonly settings: any;
};

