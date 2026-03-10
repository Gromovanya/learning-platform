import { useEffect } from "react";
import { COMMON_FIELD, SEARCH_SESSIONS } from "../constants/constsFormKeys";
import { useForm } from "../hooks/form";
import { useDebounce } from "../hooks/debounceSearch";
import { useSessionStore } from "../store/sessionStore";

const FILTER_USED_CLASS = 'bg-indigo-600/10 text-indigo-400 p-4 rounded-2xl text-sm font-bold border border-indigo-500/20 hover:bg-indigo-600/20'
const FILTER_USED_IMG_CLASS = 'opacity-50 group-hover:opacity-100 transition-opacity'
const FILTER_NO_USED_CLASS = 'text-gray-400 hover:bg-white/5 p-4 rounded-2xl text-sm font-semibold group"'

function Sidebar() {
    const { values, handleChange } = useForm({[SEARCH_SESSIONS]: ''}, {[COMMON_FIELD]: ''})
    const { setQueryParam, query } = useSessionStore()
    const debouncedSearch = useDebounce(values[SEARCH_SESSIONS], 500)

    useEffect(() => {
        setQueryParam('search', debouncedSearch || undefined)
    }, [debouncedSearch, setQueryParam])

    return (
    <aside className="w-72 border-r border-white/5 bg-[#0f172a]/80 backdrop-blur-xl p-6 flex flex-col gap-10 h-screen sticky top-0">
        {/* Поиск */}
        <div className="space-y-3">
            <label className="text-indigo-300/50 text-[10px] uppercase tracking-[0.2em] font-black ml-1">
                Поиск сессий
            </label>
            <div className="relative group">
                <input 
                    name={SEARCH_SESSIONS}
                    onChange={handleChange}
                    value={values[SEARCH_SESSIONS]}
                    type="text" 
                    placeholder="Тема, автор или тег..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-11 text-sm text-white outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-gray-500 shadow-[0_0_0_1000px_#1e293b_inset]"
                />
                <svg 
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>

        {/* Фильтры */}
        <nav className="flex flex-col gap-1.5">
            <label className="text-indigo-300/50 text-[10px] uppercase tracking-[0.2em] font-black mb-2 ml-1">
                Категории
            </label>
            
            <button onClick={() => setQueryParam('is_private', undefined)} className={`flex items-center gap-3 w-full transition-all ${!query.is_private ? FILTER_USED_CLASS : FILTER_NO_USED_CLASS}`}>
                <span className={`text-lg ${!query.is_private ? '' : FILTER_USED_IMG_CLASS}`}>🔥</span>
                Все сессии
            </button>

            <button onClick={() => setQueryParam('is_private', 'true')} className={`flex items-center gap-3 w-full transition-all ${query.is_private === 'true' ? FILTER_USED_CLASS : FILTER_NO_USED_CLASS}`}>
                <span className={`text-lg ${query.is_private === 'true' ? '' : FILTER_USED_IMG_CLASS}`}>🔒</span>
                Приватные
            </button>

            <button onClick={() => setQueryParam('is_private', 'false')} className={`flex items-center gap-3 w-full transition-all ${query.is_private === 'false' ? FILTER_USED_CLASS : FILTER_NO_USED_CLASS}`}>
                <span className={`text-lg ${query.is_private === 'false' ? '' : FILTER_USED_IMG_CLASS}`}>🌐</span>
                Публичные
            </button>
        </nav>
    </aside>
);
};

export default Sidebar