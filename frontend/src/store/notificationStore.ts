import { create } from "zustand";
import { NOT_FIND_INDEX } from "../constants/constsCommon";


type Notification = {
    id: string;
    count: number;
    message: string;
    notificationType: 'error' | 'success' | 'info';
}

interface NotificationState {
    popNotifications: Notification[]
    queueNotifications: Notification[]
    addNotification: (message: string, notificationType?: 'error' | 'success' | 'info') => void
    removeNotification: (id: string) => void
    clearNotifications: () => void
}

const LIMIT_POP_NOTIFICATION = 3;
const LIMIT_QUEUE_NOTIFICATION = 10;
const TIME_DEL_NOTIFICATION = 4000;
const DEFAULT_COUNT_NOTIFICATION = 1;

const activatedTimers = new Map<string, ReturnType<typeof setTimeout>>();

export const useNotificationStore = create<NotificationState>((set, get) => ({
    popNotifications: [],
    queueNotifications: [],
    addNotification: (message, notificationType = 'error') => {
        const { popNotifications, queueNotifications } = get();

        const isInPop = popNotifications.findIndex(n => n.message === message)
        const isInQueue = queueNotifications.findIndex(n => n.message === message)
        
        if (isInPop !== NOT_FIND_INDEX || isInQueue !== NOT_FIND_INDEX) {
            set(state => {
                if (isInPop !== NOT_FIND_INDEX) {
                    const updatePop = state.popNotifications.map((n, idx) => {
                        if (idx === isInPop) {
                            const oldTimer = activatedTimers.get(n.id)
                            if (oldTimer) {
                                clearTimeout(oldTimer)
                            }
                            activatedTimers.set(n.id, setTimeout(() => get().removeNotification(n.id), TIME_DEL_NOTIFICATION))

                            return { ...n, count: n.count + 1 }
                        } else {
                            return n
                        }
                    })
                    return { popNotifications: updatePop }
                }
                const updateQueue = state.queueNotifications.map((n, idx) => idx === isInQueue ? { ...n, count: n.count + 1 } : n)
                return { queueNotifications: updateQueue }
            })
            return;
        }

        const id = crypto.randomUUID();
        const newNotification = { id, message, notificationType, count: DEFAULT_COUNT_NOTIFICATION }

        set(state => {
            if (state.popNotifications.length < LIMIT_POP_NOTIFICATION) {
                activatedTimers.set(id, setTimeout(() => get().removeNotification(id), TIME_DEL_NOTIFICATION))
                return { popNotifications: [...state.popNotifications, newNotification] }
            } else if (state.queueNotifications.length < LIMIT_QUEUE_NOTIFICATION) {
                return { queueNotifications: [...state.queueNotifications, newNotification] }
            }
            return state;
        })
    },
    removeNotification: (id) => {
        set(state => {
            const timer = activatedTimers.get(id)
            if (timer) {
                clearTimeout(timer)
                activatedTimers.delete(id)
            }
            const filteredPopNotification = state.popNotifications.filter(n => n.id !== id);

            if (state.queueNotifications.length > 0) {
                const [ firstNotification, ...remainingQueue ] = state.queueNotifications
                activatedTimers.set(firstNotification.id, setTimeout(() => get().removeNotification(firstNotification.id), TIME_DEL_NOTIFICATION))
                return {
                    popNotifications: [...filteredPopNotification, firstNotification],
                    queueNotifications: remainingQueue
                }
            }
            return {popNotifications: filteredPopNotification}
        })
    },
    clearNotifications: () => {
        set({
            popNotifications: [],
            queueNotifications: [],
        })
        activatedTimers.clear()
    }
}))