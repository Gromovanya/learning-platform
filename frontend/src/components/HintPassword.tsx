import { useState } from 'react';
// Импорт CSS-файла не нужен, если Tailwind глобально подключен
// import '../../index.css'; 

const passwordRules = [
    "Минимум 12 символов",
    "Не должен совпадать с логином",
    "Не должен состоять только из цифр",
    "Обязательно наличие специальных символов",
];

function DropdownHintPassword() {
    const [isHintOpen, setIsHintOpen] = useState(false);

    const toggleHint = () => setIsHintOpen(!isHintOpen);

    return (
        // Контейнер: relative для позиционирования попапа
        <div className="relative inline-block"> 
            
            {/* Кнопка-триггер: Делаем ее маленькой и круглой */}
            <button
                type="button"
                onClick={toggleHint}
                aria-expanded={isHintOpen}
                // Tailwind классы для кнопки
                className="text-gray-500 hover:text-gray-700 focus:outline-none 
                           focus:ring-2 focus:ring-blue-500 rounded-full w-6 h-6 
                           flex items-center justify-center text-sm font-bold"
            >
                ❓
            </button>

            {/* Всплывающий попап */}
            {isHintOpen && (
                <div 
                    // Tailwind классы для попапа
                    className="absolute z-50 left-full top-1/2 transform -translate-y-1/2 
                               ml-2 p-3 bg-white border border-gray-300 rounded-lg shadow-xl 
                               w-64 max-w-xs text-sm"
                >
                    <p className="hint-header font-semibold text-gray-800 mb-2">
                        Требования к паролю:
                    </p>
                    <ul className="hint-list space-y-1 text-gray-600">
                        {passwordRules.map((rule, index) => (
                            // Используем 'dot' стиль для списка
                            <li key={index} className="flex items-start">
                                <span className="mr-2 mt-1 w-1 h-1 bg-blue-500 rounded-full flex-shrink-0"></span>
                                {rule}
                            </li>
                        ))}
                    </ul>
                    {/* Хвостик (треугольник) для красоты */}
                    <div className="absolute left-0 top-1/2 transform -translate-x-full -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-gray-300"></div>
                    <div className="absolute left-0 top-1/2 transform -translate-x-[calc(100%-1px)] -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-white"></div>
                </div>
            )}
        </div>
    );
};

export default DropdownHintPassword;