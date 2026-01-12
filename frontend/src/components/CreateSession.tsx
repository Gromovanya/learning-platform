import { SESSION_DESCRIPTION_FIELD, SESSION_IS_PRIVATE_FIELD, SESSION_TITLE_FIELD } from "../constants/constsFormKeys";
import { useForm } from "../hooks/form";
import { sessionService } from "../services/sessionSerivce";
import { useSessionStore } from "../store/sessionStore";

interface CreateSessionState {
    onClose: () => void
}

function CreateSessionForm({ onClose }: CreateSessionState) {
    const { values, errors, handleChange, setFrontError } = useForm({
        [SESSION_TITLE_FIELD]: '', [SESSION_DESCRIPTION_FIELD]: '', [SESSION_IS_PRIVATE_FIELD]: false
    }, {[SESSION_TITLE_FIELD]: []} );
    const { addSession } = useSessionStore()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!values[SESSION_TITLE_FIELD]) {
            setFrontError(SESSION_TITLE_FIELD, 'Тема должна быть указана!')
            return;
        }
        const data = await sessionService.createSession({...values, [SESSION_DESCRIPTION_FIELD]: values[SESSION_DESCRIPTION_FIELD] || 'Тут нет описания'})
        addSession(data)
        onClose()
    }    

return (
        <div className="w-full bg-slate-900/40 border border-white/10 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-10 shadow-3xl">
            <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-2">Новая сессия</h2>
                <p className="text-gray-400 text-sm">Создайте пространство для совместной учебы</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Тема */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider ml-1">Тема обсуждения</label>
                    <input 
                        name={SESSION_TITLE_FIELD}
                        onChange={handleChange}
                        type="text" 
                        placeholder="Напр: Подготовка к экзамену по JS"
                        className={`w-full bg-white/5 border rounded-2xl p-4 text-white outline-none transition-all placeholder:text-gray-500 shadow-[0_0_0_1000px_#2b2f36_inset]
                            ${errors[SESSION_TITLE_FIELD].length > 0 ? 'border-red-500 ring-2 ring-red-500/10' : 'border-white/10 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'}`}
                    />
                    {errors[SESSION_TITLE_FIELD]?.length > 0 && (
                        <div className="mt-1.5 ml-1 flex flex-col gap-1">
                            {errors[SESSION_TITLE_FIELD].map((err, i) => (
                                <p key={i} className="text-red-500 text-xs font-medium animate-in fade-in slide-in-from-top-1">
                                    • {err}
                                </p>
                            ))}
                        </div>
                    )}
                </div>

                {/* Описание */}
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-indigo-300 uppercase tracking-wider ml-1">Описание</label>
                    <textarea 
                        name={SESSION_DESCRIPTION_FIELD}
                        onChange={handleChange}
                        rows={3}
                        placeholder="О чем планируете говорить?"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-gray-500 resize-none shadow-[0_0_0_1000px_#2b2f36_inset]"
                    />
                </div>

                {/* Приватность */}
                <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl group hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex flex-col">
                        <span className="text-white font-semibold text-sm">Приватная сессия</span>
                        <span className="text-[10px] text-gray-500">Только по прямой ссылке</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input onChange={handleChange} name={SESSION_IS_PRIVATE_FIELD} type="checkbox" className="sr-only peer" />
                        <div className="w-10 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                    </label>
                </div>

                {/* Кнопки */}
                <div className="flex gap-3 pt-2">
                    <button
                        onClick={onClose}
                        type="button" 
                        className="flex-1 px-6 py-3.5 rounded-xl font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm"
                    >
                        Отмена
                    </button>
                    <button 
                        type="submit" 
                        className="flex-[2] bg-indigo-600 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-indigo-500 active:scale-95 transition-all shadow-lg shadow-indigo-500/20"
                    >
                        Запустить сессию
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateSessionForm