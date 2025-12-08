// src/pages/Auth/Login.tsx
import { useState } from 'react';
import '../../index.css';
import { loginApi } from '../../api/auth';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState('');
    const navigate = useNavigate()

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
        console.log("Форма отправлена!", { username, password });
            await loginApi(username, password);
            navigate('/');
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status === 401) {
                        setErrorMessages('Incorrect password or login!')
                        console.error("Ошибка аутентификации:", error.response.data);
                    }
                }
            }
        };
    }

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Войти в аккаунт</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="flex flex-col">
                        <label htmlFor="username" className="text-gray-700 mb-2 font-medium">
                            Имя
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Введите имя"
                            className="bg-gray-750 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={username}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="username"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-gray-700 mb-2 font-medium">
                            Пароль
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Введите пароль"
                            className="bg-gray-750 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                        {errorMessages && (
                            <div className="w-full mt-4 p-3 bg-red-100 border border-red-400 text-red-700 font-semibold rounded-lg shadow-md">
                                <p className="text-sm text-center">
                                    {errorMessages}
                                </p>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                    >
                        Войти
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Нет аккаунта? <Link to="/auth/register" className="text-blue-500 hover:underline">Зарегистрироваться</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
