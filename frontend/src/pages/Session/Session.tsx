import type { Session } from '../../shared/api/schemas';
import useWebSocket, { ReadyState } from 'react-use-websocket';

function SessionPage({ session, ticket }: { session: Session, ticket: string }) {
    
    const { readyState } = useWebSocket(`/ws/session/${session.id}/?ticket=${ticket}`)    

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Подключение...',
        [ReadyState.OPEN]: 'В сети',
        [ReadyState.CLOSING]: 'Закрытие...',
        [ReadyState.CLOSED]: 'Оффлайн',
        [ReadyState.UNINSTANTIATED]: 'Не инициализировано',
    }[readyState];

    if (!session || !ticket) return null

    return (
        <div className="h-screen w-screen bg-[#0f172a] text-white p-8">
            <header className="mb-8">
                <h1 className="text-4xl font-bold">{session.title}</h1>
                <p className="text-gray-400">{session.description}</p>
            </header>

            <div className={`status-badge ${readyState === ReadyState.OPEN ? 'online' : 'offline'}`}>
                Статус: {connectionStatus}
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* Левая часть: Карточки */}
                <div className="col-span-8 bg-white/5 rounded-3xl p-6">
                    <h2 className="text-xl mb-4">Обучающие карточки</h2>
                    {/* Сюда пойдут твои Flashcards */}
                </div>

                {/* Правая часть: Участники и Комментарии */}
                <div className="col-span-4 space-y-6">
                    <div className="bg-white/5 rounded-3xl p-6">
                        <h2 className="text-xl mb-4">Участники (Real-time)</h2>
                        {/* Список людей из WebSocket */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionPage