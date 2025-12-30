import { create } from "zustand";

type AuthState = {
    accessToken: string | null;
    isAuthenticated: boolean;
    isInitialized: boolean;
    id: number | null;
    username: string;
    firstName: string;
    lastName: string;
    setInitialized: (init: boolean) => void;
    setAccessToken: (token: string | null) => void;
    logout: () => void;
    saveDataUser: (newId: number, newUsername: string, newFirstName?: string, newLastName?: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    isAuthenticated: false,
    isInitialized: false,

    id: null,
    username: 'Anonymous',
    firstName: '',
    lastName: '',

    setAccessToken: (token) => set({
        accessToken: token,
        isAuthenticated: !!token,
        isInitialized: true
    }),
    setInitialized: (init) => set({ isInitialized: init }),
    logout: () => {
        set({
            accessToken: null,
            isAuthenticated: false,
        })
    },
    saveDataUser: (newId, newUsername, newFirstName = '', newLastName = '') => set({
        id: newId,
        username: newUsername,
        firstName: newFirstName,
        lastName: newLastName,
    })
}))