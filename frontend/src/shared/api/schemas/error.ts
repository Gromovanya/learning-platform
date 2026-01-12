import 'axios';

declare module 'axios' {
    export interface AxiosError {
        isSilent?: boolean;
    }
}