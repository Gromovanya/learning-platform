import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useEffect, useRef, useState } from "react";
import { authService } from "../services/authSerivce";
import { URL_LOGIN, URL_PROFILE, URL_REGISTER } from "../constants/constsUrlPath";
import { getAvatarColor } from "../utils/color";

function Header() {
    const navigate = useNavigate()
    const { isAuthenticated, user } = useAuthStore();
    const [ isMenuOpen, setIsMenuOpen ] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)
    const displayName = user?.nickname || user?.username;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.addEventListener("mousedown", handleClickOutside);
    }, [])

    return (
        <header className="h-20 border-b border-white/[0.05] bg-[#0f172a]/70 backdrop-blur-xl sticky top-0 z-50 px-8 flex items-center justify-between">
            {/* Логотип */}
            <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center font-black text-white shadow-xl shadow-indigo-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    L
                </div>
                <div className="flex flex-col">
                    <span className="text-white font-black text-xl tracking-tighter leading-none">LearnSync</span>
                    <span className="text-[10px] text-indigo-400/60 font-bold uppercase tracking-[0.2em]">Beta</span>
                </div>
            </Link>

            <div className="flex items-center gap-6">
                {isAuthenticated ? (
                    <div className="relative" ref={menuRef}>
                        {/* Кнопка профиля */}
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex items-center gap-3 bg-white/[0.03] p-1.5 pr-5 rounded-2xl border border-white/10 hover:bg-white/[0.08] hover:border-white/20 transition-all active:scale-95 group"
                        >   
                            <div className="relative">
                                {user?.avatar ? (
                                    <img 
                                        src={user?.avatar} 
                                        alt="Avatar" 
                                        className="w-9 h-9 rounded-xl border border-indigo-500/50 object-cover shadow-inner"
                                    />
                                ) : (
                                    <div className={`w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-xs font-black text-white shadow-lg ${getAvatarColor(displayName)}`}>
                                        {displayName?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                {/* Индикатор онлайна (раз у нас веб-сокеты) */}
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#0f172a] rounded-full"></div>
                            </div>
                            <div className="text-left hidden sm:block">
                                <p className="text-white text-sm font-bold leading-none mb-0.5">{displayName}</p>
                                <p className="text-[10px] text-gray-500 font-medium">Студент</p>
                            </div>
                            <svg className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Выпадающее меню */}
                        {isMenuOpen && (
                            <div className="absolute right-0 mt-4 w-64 bg-[#1e293b] border border-white/10 rounded-[2rem] shadow-2xl py-3 backdrop-blur-2xl animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 overflow-hidden">
                                <div className="px-5 py-3 border-b border-white/5 mb-2 bg-white/[0.02]">
                                    <p className="text-[10px] text-indigo-400 uppercase font-black tracking-widest mb-1">Личный кабинет</p>
                                    <p className="text-white text-sm font-bold truncate">{displayName}</p>
                                </div>
                                
                                <div className="px-2 space-y-1">
                                    <button onClick={() => navigate(URL_PROFILE)} className="w-full text-left px-4 py-3 text-gray-400 hover:bg-indigo-600 hover:text-white rounded-xl transition-all text-sm flex items-center gap-3 group">
                                        <span className="text-lg group-hover:scale-110 transition-transform">👤</span> 
                                        <span className="font-semibold">Профиль</span>
                                    </button>
                                    <button className="w-full text-left px-4 py-3 text-gray-400 hover:bg-indigo-600 hover:text-white rounded-xl transition-all text-sm flex items-center gap-3 group">
                                        <span className="text-lg group-hover:scale-110 transition-transform">🔔</span> 
                                        <span className="font-semibold">Уведомления</span>
                                    </button>
                                    <button className="w-full text-left px-4 py-3 text-gray-400 hover:bg-indigo-600 hover:text-white rounded-xl transition-all text-sm flex items-center gap-3 group">
                                        <span className="text-lg group-hover:scale-110 transition-transform">⚙️</span> 
                                        <span className="font-semibold">Настройки</span>
                                    </button>
                                </div>

                                <div className="mt-2 pt-2 border-t border-white/5 px-2">
                                    <button 
                                        onClick={() => {
                                            authService.logoutUser();
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-sm font-bold flex items-center gap-3"
                                    >
                                        <span>🚪</span> Выйти из системы
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link 
                            to={URL_LOGIN} 
                            className="text-gray-400 hover:text-white px-5 py-2.5 text-sm font-bold transition-all rounded-xl hover:bg-white/5"
                        >
                            Войти
                        </Link>
                        <Link 
                            to={URL_REGISTER} 
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
                        >
                            Регистрация
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header