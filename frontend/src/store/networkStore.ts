import { create } from "zustand";

type NetworkState = {
    isOnline: boolean;
    setOnline: (status: boolean) => void;
}

export const useNetworkStore = create<NetworkState>((set) => ({
    isOnline: window.navigator.onLine,
    setOnline: (status) => set({isOnline: status})
}))