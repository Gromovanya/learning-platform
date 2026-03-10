// src/pages/Auth/Login.tsx
import { useEffect, useState } from 'react';
import '../../app/index.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from '../../hooks/form';
import { USERNAME_FIELD, PASSWORD_FIELD, COMMON_FIELD } from '../../constants/constsFormKeys';
import { URL_HOME, URL_REGISTER } from '../../constants/constsUrlPath';
import { authService } from '../../services/authSerivce';
import { useNotificationStore } from '../../store/notificationStore';


function LoginPage() {
    const navigate = useNavigate()
    const { values, errors, handleChange, setFrontError } = useForm({[USERNAME_FIELD]: '', [PASSWORD_FIELD]: ''}, {[COMMON_FIELD]: []} );
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation()
    const origin = location.state?.from.pathname || URL_HOME;
    const { addNotification } = useNotificationStore()

    useEffect(() => {
        const message = location.state?.notification

        if (message) {
            addNotification(message, 'info')
            window.history.replaceState({}, document.title);
        }
    }, [addNotification, location.state?.notification])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!values.username || !values.password) {
            setFrontError(COMMON_FIELD, 'Поля формы не заполнены!');
            return;
        }
        setIsLoading(true)
        try {
            await authService.loginUser(values);
            navigate(origin, {replace: true})
        } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                setFrontError(COMMON_FIELD, 'Неправильно указан логин или пароль');
                // console.warn("Ошибка аутентификации: ", error.response.data);
            } else {
                setFrontError(COMMON_FIELD, 'Something went wrong. Try again.');
                // console.warn("Ошибка: ", error);
            };
        } finally {
            setIsLoading(false)
        };
    };

    return (
        <div className="h-dvh w-screen flex items-center justify-center bg-[#0b101a] relative overflow-hidden px-4">
            
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="bg-white/[0.03] backdrop-blur-xl shadow-2xl rounded-[2.5rem] p-8 sm:p-12 max-w-md w-full border border-white/10 relative z-10">
                <header className="text-center mb-10">
                    <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Войти</h2>
                    <p className="text-slate-400 text-sm">Рады видеть тебя снова! ✨</p>
                </header>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {/* Поле Имя */}
                    <div className="flex flex-col gap-2">
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
                                ${errors[COMMON_FIELD]?.length > 0 
                                    ? 'border-red-500/50 bg-red-500/5 ring-4 ring-red-500/10' 
                                    : 'border-white/10 focus:border-indigo-500/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-indigo-500/10'
                                }`}
                            value={values[USERNAME_FIELD]}
                            onChange={handleChange}
                            autoComplete="username"
                        />
                    </div>

                    {/* Поле Пароль */}
                    <div className="flex flex-col gap-2">
                        <label htmlFor={PASSWORD_FIELD} className="text-slate-300 ml-1 text-sm font-medium">
                            Пароль
                        </label>
                        <input
                            name={PASSWORD_FIELD}
                            id={PASSWORD_FIELD}
                            type="password"
                            placeholder="••••••••••••"
                            className={`w-full p-4 bg-white/5 border rounded-2xl outline-none transition-all duration-300
                                text-white placeholder:text-slate-600
                                ${errors[COMMON_FIELD]?.length > 0 
                                    ? 'border-red-500/50 bg-red-500/5 ring-4 ring-red-500/10' 
                                    : 'border-white/10 focus:border-indigo-500/50 focus:bg-white/[0.08] focus:ring-4 focus:ring-indigo-500/10'
                                }`}
                            value={values[PASSWORD_FIELD]}
                            onChange={handleChange}
                            autoComplete="current-password"
                        />
                    </div>

                    {/* Ошибка */}
                    {errors[COMMON_FIELD]?.length > 0 && (
                        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl animate-in fade-in slide-in-from-top-2">
                            {errors[COMMON_FIELD].map((err, i) => (
                                <p key={i} className="text-red-400 text-sm text-center font-medium">{err}</p>
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
                        {isLoading ? (
                             <span className="flex items-center justify-center gap-2">
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Загрузка...
                             </span>
                        ) : "Войти в систему"}
                    </button>
                </form>

                <div className="relative my-10">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/5"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-[#161b26] px-4 text-slate-500 font-semibold tracking-widest">Или</span>
                    </div>
                </div>

                <p className="text-center text-slate-400 text-sm">
                    Нет аккаунта? 
                    <Link to={URL_REGISTER} className="text-indigo-400 font-bold hover:text-indigo-300 transition-all ml-2 underline-offset-4 hover:underline">
                        Создать сейчас
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;

