// src/pages/Auth/Register.tsx
import { useState } from 'react';
import '../../index.css';
import { registerApi } from '../../api/auth';
import { useNavigate, Link } from 'react-router-dom';
import DropdownHintPassword from '../../components/Button/HintPassword';
import axios from 'axios';
import type { ErrorMessagesRegister } from '../../types/validations';


function RegisterPage() {
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState<ErrorMessagesRegister>({'username': [], 'password': []});
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            console.log("Форма отправлена!", { username, password });
            await registerApi({'username': username, 'password': password});
            navigate('/');
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    if (error.response.status === 400) {
                        const data: ErrorMessagesRegister = error.response.data;
                        setErrorMessages({'username': data.username, 'password': data.password});
                    };
                };
            };
        };
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md w-full">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Зарегистрироваться</h2>

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
                        {errorMessages.username && (
                            <div className="text-sm text-red-600 mt-2 font-medium">
                                <ul className="ml-4 list-disc space-y-1">
                                    {errorMessages.username.map((err, index) =>
                                    <li key={index}>{err}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-gray-700 mb-2 font-medium">
                            Пароль
                        </label>
                        
                        <div className="relative flex items-center"> 
                            <input
                                id="password"
                                type="password"
                                placeholder="Введите пароль"
                                className="bg-gray-750 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full pr-10" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                            <div className="absolute right-0 mr-2">
                                <DropdownHintPassword />
                            </div>
                        </div>

                        {errorMessages.password && (
                            <ul className="text-sm text-red-600 mt-2 ml-4 list-disc space-y-1">
                                {errorMessages.password.map((err, index) =>
                                <li key={index} className='font-medium'>{err}</li>)}
                            </ul>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                    >
                        Зарегистрироваться
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Есть аккаунт? <Link to="/auth/login" className="text-blue-500 hover:underline">Войти</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
