import { create } from "zustand";
import { SessionSchema, SessionsListSchema, type Session, type SessionsList } from "../shared/api/schemas";
import { getCursorQuery } from "../utils/apiUtils";
import type { QuerySessionState } from "../shared/api/types/sessionQuery";

interface SessionState {
    sessions: Session[]
    nextCursor: string | null
    query: QuerySessionState
    isLoading: boolean
    isFetchingNext: boolean

    setFetching: (init: boolean) => void
    setLoading: (init: boolean) => void

    setSessions: (dataSessions: SessionsList) => void,
    addSessions: (dataSessions: SessionsList) => void
    addSession: (dataSession: Session) => void,
    setQueryParam: (key: string, param: string | undefined) => void
}

export const useSessionStore = create<SessionState>((set) => ({
    sessions: [],
    nextCursor: null,
    query: {
        search: undefined,
        is_private: undefined,
    },
    isLoading: true,
    isFetchingNext: false,
    
    setFetching: (init) => {set({isFetchingNext: init})},
    setLoading: (init) => {set({isLoading: init})},

    setSessions: (dataSessions) => {
        const parsedSessions = SessionsListSchema.parse(dataSessions);
        set({
            sessions: parsedSessions.results,
            nextCursor: getCursorQuery(parsedSessions.next),
            isLoading: false,
            isFetchingNext: false,
        })
    },
    addSessions: (dataSessions) => {
        const parsedSessions = SessionsListSchema.parse(dataSessions);
        set(state => {
            const filterSessions = parsedSessions.results.filter(
                newS => !state.sessions.some(oldS => oldS.id === newS.id)
            )
            return {
                sessions: [...state.sessions, ...filterSessions],
                nextCursor: getCursorQuery(parsedSessions.next),
            }
        })
    },
    addSession: (dataSession) => {
        const parsedSession = SessionSchema.parse(dataSession);
        set(state => {
            return {
                sessions: [...state.sessions, parsedSession]
            }
        })
    },
    setQueryParam: (key, param) => set((state) => ({
        query: {...state.query, [key]: param},
        nextCursor: null
    })),
}))