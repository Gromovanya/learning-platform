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
        <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-800 to-black px-4">
            <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-12 max-w-md w-full border border-white/10">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-2">Войти</h2>
                <p className="text-center text-gray-500 mb-10 text-sm">Добро пожаловать обратно!</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* Поле Имя */}
                    <div className="flex flex-col">
                        <label htmlFor={USERNAME_FIELD} className="text-gray-700 mb-1.5 ml-1 text-sm font-semibold">
                            Имя пользователя
                        </label>
                        <input
                            name={USERNAME_FIELD}
                            id={USERNAME_FIELD}
                            type="text"
                            placeholder="ivan_ivanov"
                            className={`w-full p-3.5 border rounded-xl outline-none transition-all duration-200
                                ${errors[COMMON_FIELD]?.length > 0 
                                    ? 'border-red-500 ring-2 ring-red-500/10' 
                                    : 'border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'} 
                                shadow-[0_0_0_1000px_#2b2f36_inset] placeholder:text-gray-400 text-gray-200`}
                            value={values[USERNAME_FIELD]}
                            onChange={handleChange}
                            autoComplete="username"
                        />
                    </div>

                    {/* Поле Пароль */}
                    <div className="flex flex-col">
                        <label htmlFor={PASSWORD_FIELD} className="text-gray-700 mb-1.5 ml-1 text-sm font-semibold">
                            Пароль
                        </label>
                        <input
                            name={PASSWORD_FIELD}
                            id={PASSWORD_FIELD}
                            type="password"
                            placeholder="••••••••••••"
                            className={`w-full p-3.5 border rounded-xl outline-none transition-all duration-200
                                ${errors[COMMON_FIELD]?.length > 0 
                                    ? 'border-red-500 ring-2 ring-red-500/10' 
                                    : 'border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'} 
                                shadow-[0_0_0_1000px_#2b2f36_inset] placeholder:text-gray-400 text-gray-200`}
                            value={values[PASSWORD_FIELD]}
                            onChange={handleChange}
                            autoComplete="current-password"
                        />
                    </div>

                    {/* Блок общей ошибки — теперь над кнопкой */}
                    {errors[COMMON_FIELD]?.length > 0 && (
                        <div className="bg-red-50 border border-red-200 p-3 rounded-xl animate-in zoom-in-95 duration-200">
                            {errors[COMMON_FIELD].map((err, i) => (
                                <p key={i} className="text-red-600 text-sm text-center font-semibold">
                                    {err}
                                </p>
                            ))}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-4 w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg 
                                hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-200/50
                                disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                    >
                        {isLoading ? "Загрузка..." : "Войти"}
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-gray-400 font-medium">Или</span></div>
                </div>

                <p className="text-center text-gray-600 text-sm">
                    Нет аккаунта? <Link to={URL_REGISTER} state={location.state} 
                    className="text-indigo-600 font-bold hover:text-indigo-500 transition-colors ml-1">Создать сейчас</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
