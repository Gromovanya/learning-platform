import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useAuthStore } from "../../store/authStore";
import { getAvatarColor } from "../../utils/color";
import Modal from "../../components/Modal";
import CreateSessionForm from "../../components/CreateSession";
import { useInView } from 'react-intersection-observer';
import SessionsLoader from "../../components/SkeletonsSession";
import { useSession } from "../../hooks/sessions";
import MainPageSkeleton from "../../components/MainSkeleton";
import { useSessionStore } from "../../store/sessionStore";
import { useNavigate } from "react-router-dom";
import { URL_SESSION } from "../../constants/constsUrlPath";
import { getDetailPath } from "../../utils/pathUtils";


function MainPage() {
    const { isAuthenticated } = useAuthStore();
    const navigate = useNavigate()
    const { query, isLoading, sessions, isFetchingNext } = useSessionStore()
    const [ isCreateModalOpen, setIsCreateModalOpen ] = useState(false)

    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: '0px 0px 200px 0px'
    })

    useSession({ inView })

    const queryKey = JSON.stringify(query)

    if (isLoading) {
        return <MainPageSkeleton />
    }

    return (
        <>
            <Sidebar />

            <div key={queryKey} className=" flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#0f172a]">
                {/* Секция приветствия */}
                <section className="mb-12">
                    {isAuthenticated ? (
                        <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-md relative overflow-hidden group">
                            {/* Декоративное свечение на фоне */}
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-indigo-600/20 blur-[80px] group-hover:bg-indigo-600/30 transition-all" />
                            
                            <h1 className="text-3xl font-bold text-white mb-2">Добро пожаловать обратно! 👋</h1>
                            <p className="text-gray-400">Готовы продолжить обучение в совместных сессиях?</p>
                        </div>
                    ) : (
                        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-8 rounded-[2rem] shadow-2xl shadow-indigo-500/20 relative overflow-hidden">
                            <div className="relative z-10">
                                <h1 className="text-3xl font-extrabold text-white mb-4">Учитесь вместе в реальном времени</h1>
                                <p className="text-indigo-100 mb-6 max-w-lg">
                                    LearnSync — это платформа для совместного изучения карточек, обсуждений и подготовки к экзаменам.
                                </p>
                                <button className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all">
                                    Узнать больше
                                </button>
                            </div>
                        </div>
                    )}
                </section>

                {/* Заголовок списка и Кнопка создания */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Активные сессии</h2>
                        <p className="text-sm text-gray-500">Присоединяйтесь к обсуждению прямо сейчас</p>
                    </div>
                    
                    <button 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="group relative flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
                    >
                        <span className="text-xl group-hover:rotate-90 transition-transform duration-300">+</span>
                        Создать сессию
                    </button>
                </div>

                {/* Сетка сессий */}
                {sessions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sessions.map((session) => (
                            <div 
                                onClick={() => navigate(getDetailPath(URL_SESSION, session.id))}
                                key={session.id} 
                                className="bg-white/5 border border-white/10 p-6 rounded-[1.5rem] hover:bg-white/[0.08] hover:border-indigo-500/50 transition-all group cursor-pointer flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-sm font-bold text-white shadow-inner ${getAvatarColor(session.author.username)}`}>
                                            {session.author.username.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-xs text-gray-400 font-semibold group-hover:text-gray-300">{session.author.username}</span>
                                    </div>
                                    <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-lg font-bold ${session.is_private ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                        {session.is_private ? "🔒 Private" : "🔓 Public"}
                                    </span>
                                </div>
                                
                                <h3 className="text-white font-bold text-xl mb-2 group-hover:text-indigo-400 transition-colors line-clamp-1">
                                    {session.title}
                                </h3>
                                <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-grow">
                                    {session.description}
                                </p>
                                
                                <div className="flex items-center justify-between border-t border-white/5 pt-4">
                                    <div className="flex -space-x-2">
                                        {/* Тут можно зарендерить маленькие аватарки участников */}
                                        <div className="w-6 h-6 rounded-full bg-slate-700 border-2 border-[#1e293b] flex items-center justify-center text-[10px] text-white">
                                            +{session.participants_count}
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-indigo-400">Вступить →</span>
                                </div>
                            </div>
                        ))}
                        
                        <div ref={ref}></div>
                        
                    </div>
                    
                ) : (
                    /* Пустое состояние */
                    <div className="text-center py-20 bg-white/5 border border-dashed border-white/10 rounded-[2rem]">
                        <div className="text-4xl mb-4">⏳</div>
                        <h3 className="text-white font-bold text-xl">Сессий пока нет</h3>
                        <p className="text-gray-500 mt-2">Станьте первым, кто создаст пространство для учебы!</p>
                    </div>
                )}
                {isFetchingNext && <SessionsLoader />}
            </div>

            <Modal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                <CreateSessionForm 
                    onClose={() => setIsCreateModalOpen(false)}
                />
            </Modal>
        </>
    );
};

export default MainPage