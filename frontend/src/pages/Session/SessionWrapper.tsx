import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { sessionService } from '../../services/sessionSerivce';
import Initialized from '../../components/Initialized';
import { authService } from '../../services/authSerivce';
import SessionPage from './Session';
import type { Session } from '../../shared/api/schemas';
import axios from 'axios';

function SessionWrapper() {
    const { sessionId } = useParams();
    const [data, setData] = useState<{session: Session, ticket: string} | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                const [sessionRes, ticketRes] = await Promise.all([
                    sessionService.getDetailSession(sessionId!, controller.signal),
                    authService.getTicket(controller.signal)
                ]);
                setData({session: sessionRes, ticket: ticketRes.ticket})
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log("Запросы отменены: компонент размонтирован");
                } else {
                    console.error("Ошибка:", err);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        return () => {
            controller.abort()
        }
    }, [sessionId]);

    if (isLoading) return <Initialized />;
    if (!data) return null
    return <SessionPage session={data.session} ticket={data.ticket}></SessionPage>
}

export default SessionWrapper