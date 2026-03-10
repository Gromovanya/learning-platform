import { useEffect } from "react";
import { useNotificationStore } from "../store/notificationStore";

export function useNetworkStatus() {
    const { addNotification } = useNotificationStore()

    useEffect(() => {
        const handleOffline = () => addNotification('Соединение потеряно', 'error');
        const handleOnline = () => addNotification('Вы снова в сети', 'success');

        window.addEventListener('offline', handleOffline)
        window.addEventListener('online', handleOnline)

        return () => {
            window.removeEventListener('offline', handleOffline)
            window.removeEventListener('online', handleOnline)
        }
    }, [addNotification])
}