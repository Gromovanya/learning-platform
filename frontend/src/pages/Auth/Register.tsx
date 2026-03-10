// src/pages/Auth/Register.tsx
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DropdownHintPassword from '../../components/HintPassword';
import { USERNAME_FIELD, PASSWORD_FIELD, CONFIRM_PASSWORD_FIELD, COMMON_FIELD } from '../../constants/constsFormKeys';
import { useForm } from '../../hooks/form';
import axios from 'axios';
import '../../app/index.css';
import { URL_HOME, URL_LOGIN } from '../../constants/constsUrlPath';
import { authService } from '../../services/authSerivce';


interface RegisterErrors {
    [key: string]: string[]
}

function RegisterPage() {
    const navigate = useNavigate()
    const { values, errors, setServerErrors, handleChange, setFrontError } = useForm({
        [USERNAME_FIELD]: '', [PASSWORD_FIELD]: '', [CONFIRM_PASSWORD_FIELD]: ''
    }, {
        [USERNAME_FIELD]: [], [PASSWORD_FIELD]: [], [CONFIRM_PASSWORD_FIELD]: [], [COMMON_FIELD]: []
    } as RegisterErrors);
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation()
    const origin: string = location.state?.from.pathname || URL_HOME;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let hasFrontError = false
        if (!values.username || !values.password || !values.password2) {
            setFrontError(COMMON_FIELD, "Поля формы не заполнены!");
            hasFrontError = true
        }
        if (values[PASSWORD_FIELD] !== values[CONFIRM_PASSWORD_FIELD]) {
            setFrontError(CONFIRM_PASSWORD_FIELD, "Пароли не совпадают");
            hasFrontError = true
        }
        if (hasFrontError) return;
        setIsLoading(true)
        try {
            await authService.registerUser(values);
            return navigate(origin, {replace: true})
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 400) {
                    const data: Record<string, string[]> = error.response.data;
                    if (data && typeof data === 'object') {
                        setServerErrors(data);
                    }
                };
            } else {
                setFrontError(COMMON_FIELD, 'Что-то пошло не так. Попробуйте снова');
            };
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div className="h-dvh w-screen flex items-center justify-center bg-[#0b101a] relative overflow-hidden px-4">
            
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="bg-white/[0.03] backdrop-blur-xl shadow-2xl rounded-[2.5rem] p-8 sm:p-10 max-w-md w-full border border-white/10 relative max-h-[95vh] overflow-y-auto custom-scrollbar">
                <header className="text-center mb-8">
                    <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Создать аккаунт</h2>
                    <p className="text-slate-400 text-sm">Начни путь совместного обучения 🚀</p>
                </header>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    
                    {/* Имя пользователя */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor={USERNAME_FIELD} className="text-slate-300 ml-1 text-sm font-medium">
                            Имя пользователя
                        </label>
                        <input
                            name={USERNAME_FIELD}
                            id={USERNAME_FIELD}
                            type="text"
                            placeholder="ivan_ivanov"
                            className={`w-full p-4 bg-white/5 border rounded-2xl outline-none transition-all duration-300
                                text-white placeholder:text-slate-600
                                ${errors[USERNAME_FIELD]?.length > 0 
                                    ? 'border-red-500/50 bg-red-500/5 ring-4 ring-red-500/10' 
                                    : 'border-white/10 focus:border-indigo-500/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-indigo-500/10'
                                }`}
                            value={values[USERNAME_FIELD]}
                            onChange={handleChange}
                            autoComplete="username"
                        />
                        {errors[USERNAME_FIELD]?.map((err, i) => (
                            <p key={i} className="text-red-400 text-xs ml-2 animate-in fade-in slide-in-from-left-1">• {err}</p>
                        ))}
                    </div>

                    {/* Пароль */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor={PASSWORD_FIELD} className="text-slate-300 ml-1 text-sm font-medium">
                            Пароль
                        </label>
                        <div className='relative flex items-center'>
                            <input
                                name={PASSWORD_FIELD}
                                id={PASSWORD_FIELD}
                                type="password"
                                placeholder="Придумайте пароль"
                                className={`w-full p-4 bg-white/5 border rounded-2xl outline-none transition-all duration-300
                                    text-white placeholder:text-slate-600 pr-12
                                    ${errors[PASSWORD_FIELD]?.length > 0 
                                        ? 'border-red-500/50 bg-red-500/5 ring-4 ring-red-500/10' 
                                        : 'border-white/10 focus:border-indigo-500/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-indigo-500/10'
                                    }`}
                                value={values[PASSWORD_FIELD]}
                                onChange={handleChange}
                                autoComplete="current-password"
                            />
                            <div className="absolute right-3 opacity-70 hover:opacity-100 transition-opacity">
                                <DropdownHintPassword />
                            </div>
                        </div>
                        {errors[PASSWORD_FIELD]?.map((err, i) => (
                            <p key={i} className="text-red-400 text-xs ml-2 animate-in fade-in slide-in-from-left-1">• {err}</p>
                        ))}
                    </div>

                    {/* Подтверждение пароля */}
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor={CONFIRM_PASSWORD_FIELD} className="text-slate-300 ml-1 text-sm font-medium">
                            Подтвердите пароль
                        </label>
                        <input
                            name={CONFIRM_PASSWORD_FIELD}
                            id={CONFIRM_PASSWORD_FIELD}
                            type="password"
                            placeholder="Повторите пароль"
                            className={`w-full p-4 bg-white/5 border rounded-2xl outline-none transition-all duration-300
                                text-white placeholder:text-slate-600
                                ${errors[CONFIRM_PASSWORD_FIELD]?.length > 0 
                                    ? 'border-red-500/50 bg-red-500/5 ring-4 ring-red-500/10' 
                                    : 'border-white/10 focus:border-indigo-500/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-indigo-500/10'
                                }`}
                            value={values[CONFIRM_PASSWORD_FIELD]}
                            onChange={handleChange}
                            autoComplete="current-password"
                        />
                        {errors[CONFIRM_PASSWORD_FIELD]?.map((err, i) => (
                            <p key={i} className="text-red-400 text-xs ml-2 animate-in fade-in slide-in-from-left-1">• {err}</p>
                        ))}
                    </div>

                    {/* Общая ошибка */}
                    {errors[COMMON_FIELD]?.length > 0 && (
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl animate-in zoom-in-95">
                            {errors[COMMON_FIELD].map((err, i) => (
                                <p key={i} className="text-red-400 text-sm text-center font-semibold">{err}</p>
                            ))}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-2 w-full bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-2xl font-bold text-lg 
                                 active:scale-[0.98] transition-all shadow-xl shadow-indigo-500/20
                                 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? "Создание профиля..." : "Зарегистрироваться"}
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[#111622] px-4 text-slate-500 font-bold tracking-widest">Или</span>
                    </div>
                </div>

                <p className="text-center text-slate-400 text-sm">
                    Уже есть аккаунт? 
                    <Link to={URL_LOGIN} className="text-indigo-400 font-bold hover:text-indigo-300 transition-all ml-2 underline-offset-4 hover:underline">
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
