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
        <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-slate-800 to-black px-4">
            <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-12 max-w-md w-full border border-white/10">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-2">Создать аккаунт</h2>
                <p className="text-center text-gray-500 mb-10 text-sm">Добро пожаловать!</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    
                    {/* Имя пользователя */}
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
                                ${errors[USERNAME_FIELD]?.length > 0 ? 'border-red-500' : 'border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'}
                                shadow-[0_0_0_1000px_#2b2f36_inset] placeholder:text-gray-400 text-gray-200`}
                            value={values[USERNAME_FIELD]}
                            onChange={handleChange}
                            autoComplete="username"
                        />
                        {/* Вывод списка ошибок для Имени */}
                        {errors[USERNAME_FIELD]?.length > 0 && (
                            <div className="mt-1.5 ml-1 flex flex-col gap-1">
                                {errors[USERNAME_FIELD].map((err, i) => (
                                    <p key={i} className="text-red-500 text-xs font-medium animate-in fade-in slide-in-from-top-1">
                                        • {err}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Пароль */}
                    <div className="flex flex-col">
                        <label htmlFor={PASSWORD_FIELD} className="text-gray-700 mb-1.5 ml-1 text-sm font-semibold">
                            Пароль
                        </label>
                        <div className='relative flex items-center'>
                            <input
                                name={PASSWORD_FIELD}
                                id={PASSWORD_FIELD}
                                type="password"
                                placeholder="Придумайте надёжный пароль"
                                className={`block w-full p-3.5 border rounded-xl outline-none transition-all duration-200
                                    ${errors[PASSWORD_FIELD]?.length > 0 
                                        ? 'border-red-500 ring-2 ring-red-500/20' 
                                        : 'border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-[0_0_0_1000px_#2b2f36_inset]'}
                                    placeholder:text-gray-400 text-gray-200 pr-11`}
                                value={values[PASSWORD_FIELD]}
                                onChange={handleChange}
                                autoComplete="current-password"
                            />
                            <div className="absolute right-2">
                                <DropdownHintPassword />
                            </div>
                        </div>
                        {/* Вывод списка ошибок для Пароля */}
                        {errors[PASSWORD_FIELD]?.length > 0 && (
                            <div className="mt-1.5 ml-1 flex flex-col gap-1">
                                {errors[PASSWORD_FIELD].map((err, i) => (
                                    <p key={i} className="text-red-500 text-xs font-medium animate-in fade-in slide-in-from-top-1">
                                        • {err}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Подтверждение пароля */}
                    <div className="flex flex-col">
                        <label htmlFor={CONFIRM_PASSWORD_FIELD} className="text-gray-700 mb-1.5 ml-1 text-sm font-semibold">
                            Подтвердите пароль
                        </label>
                        <input
                            name={CONFIRM_PASSWORD_FIELD}
                            id={CONFIRM_PASSWORD_FIELD}
                            type="password"
                            placeholder="Повторите пароль"
                            className={`w-full p-3.5 border rounded-xl outline-none transition-all duration-200
                                ${errors[CONFIRM_PASSWORD_FIELD]?.length > 0 ? 'border-red-500' : 'border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'}
                                shadow-[0_0_0_1000px_#2b2f36_inset] placeholder:text-gray-400 text-gray-200`}
                            value={values[CONFIRM_PASSWORD_FIELD]}
                            onChange={handleChange}
                            autoComplete="current-password"
                        />
                        {errors[CONFIRM_PASSWORD_FIELD]?.length > 0 && (
                            <div className="mt-1.5 ml-1 flex flex-col gap-1">
                                {errors[CONFIRM_PASSWORD_FIELD].map((err, i) => (
                                    <p key={i} className="text-red-500 text-xs font-medium animate-in fade-in slide-in-from-top-1">
                                        • {err}
                                    </p>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* --- ОБЩИЕ ОШИБКИ ФОРМЫ (например, COMMON_FIELD) --- */}
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
                        className="mt-2 w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg 
                                hover:bg-green-700 active:scale-[0.98] transition-all shadow-lg shadow-green-200/50
                                disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
                    >
                        {isLoading ? "Загрузка..." : "Зарегистрироваться"}
                    </button>
                </form>

                {/* Разделитель "Или" */}
                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-100"></span>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-gray-400 font-medium">Или</span>
                    </div>
                </div>

                <p className="text-center text-gray-600 text-sm">
                    Уже есть аккаунт? 
                    <Link to={URL_LOGIN} state={location.state} 
                        className="text-indigo-600 font-bold hover:text-indigo-500 transition-colors ml-1">
                        Войти
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
