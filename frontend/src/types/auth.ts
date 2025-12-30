import type { TokenObtainPair } from "../api/generated";
import 'axios';

export type LoginRequest =  Omit<TokenObtainPair, 'access' | 'refresh'>;
declare module 'axios' {
    export interface AxiosError {
        isSilent?: boolean;
    }
}