export type ErrorMessagesRegister = Record<string, string[]>;

export type AuthStatus = 'unknown' | 'authenticated' | 'unauthenticated';
export type AuthContextType = {
    isAuthenticated: boolean;
    isStatusUnknown: boolean;
    authStatus: AuthStatus;
    checkAuth: () => Promise<void>;
    logout: () => void;
}