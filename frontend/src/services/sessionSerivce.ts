import { api } from "../api/api"
import type { Session } from "../api/generated"
import { API_SESSION } from "../constants/constsApiPath"
import type { SessionShort, SessionsList } from "../shared/api/schemas"
import type { QuerySessionState } from "../shared/api/types/sessionQuery"
import { getDetailPath } from "../utils/pathUtils"

export const sessionService = {
    async getListSessions(param: QuerySessionState, nextCursor?: string | undefined | null, signal?: AbortSignal | undefined): Promise<SessionsList> {
        const curParams = nextCursor ? {...param, cursor: nextCursor} : param
        
        const resp = await api.get<SessionsList>(API_SESSION, {params: curParams, signal})
        return resp.data
    },
    async getDetailSession(idSession: number): Promise<Session> {
        const resp = await api.get<Session>(getDetailPath(API_SESSION, idSession))
        return resp.data
    },
    async createSession(data: SessionShort): Promise<Session> {
        const resp = await api.post<Session>(API_SESSION, data)
        return resp.data
    },
    async updateSession(data: SessionShort, idSession: number): Promise<Session> {
        const resp = await api.put<Session>(getDetailPath(API_SESSION, idSession), data)
        return resp.data
    },
    async deleteSession(idSession: number): Promise<Session> {
        const resp = await api.delete(getDetailPath(API_SESSION, idSession))
        return resp.data
    },
}