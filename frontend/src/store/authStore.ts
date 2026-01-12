import { create } from "zustand";
import { UserSchema, type User } from "../shared/api/schemas";


interface AuthState {
    accessToken: string | null;
    isAuthenticated: boolean;
    isInitialized: boolean;
    user: User | null;

    setInitialized: (init: boolean) => void;
    setAccessToken: (token: string | null) => void;
    setUser: (user: unknown) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    isAuthenticated: false,
    isInitialized: false,

    user: null,

    setAccessToken: (token) => set({
        accessToken: token,
        isAuthenticated: !!token,
        isInitialized: false
    }),
    setInitialized: (init) => set({ isInitialized: init }),
    logout: () => {
        set({
            accessToken: null,
            isAuthenticated: false,
            user: null
        })
    },
    setUser: (userData) => { 
        const result = UserSchema.safeParse(userData)
        if (result.success) {
            set({
                user: result.data, 
                isAuthenticated: true,
                isInitialized: true
            })
        } else {
            console.error("Ошибка валидации данных пользователя:", result.error.format());
        }
    }
}))