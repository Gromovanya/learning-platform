import { useCallback, useEffect } from "react";
import { useSessionStore } from "../store/sessionStore";
import { sessionService } from "../services/sessionSerivce";

export function useSession({ inView }: { inView: boolean }) {
    const { query, isLoading, isFetchingNext, nextCursor, setSessions, addSessions, setFetching } = useSessionStore()

    const getInitialSessions = useCallback(async (signal: AbortSignal) => {
        const data = await sessionService.getListSessions(query, undefined, signal)
        setSessions(data)
    }, [setSessions, query])

    const loadMoreSessions = useCallback(async () => {
        if (isFetchingNext || !nextCursor || isLoading) return;

        setFetching(true)
        const data = await sessionService.getListSessions(query, nextCursor)
        addSessions(data)

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setFetching(false);
            });
        });
    }, [addSessions, isFetchingNext, query, isLoading, setFetching, nextCursor])

    useEffect(() => {
        const controller = new AbortController();
        getInitialSessions(controller.signal)
        return () => controller.abort();
    }, [getInitialSessions])

    useEffect(() => {
        if (inView) {
            loadMoreSessions()
        }
    }, [inView, loadMoreSessions])
}