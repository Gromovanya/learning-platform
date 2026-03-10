import { useState, useRef, useEffect } from 'react';

const passwordRules = [
    "Минимум 12 символов",
    "Не должен совпадать с логином",
    "Не должен состоять только из цифр",
    "Наличие специальных символов",
];

function DropdownHintPassword() {
    const [isHintOpen, setIsHintOpen] = useState(false);
    const hintRef = useRef<HTMLDivElement>(null);

    // Закрытие по клику вне подсказки
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (hintRef.current && !hintRef.current.contains(event.target as Node)) {
                setIsHintOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative flex items-center justify-center" ref={hintRef}> 
            
            {/* Кнопка-триггер */}
            <button
                type="button"
                onClick={() => setIsHintOpen(!isHintOpen)}
                className={`relative flex items-center justify-center w-6 h-6 rounded-full transition-all duration-200 z-10
                    ${isHintOpen 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-white/10 text-indigo-400 hover:bg-white/20 hover:text-indigo-300'}`}
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" // Берет цвет из классов текста кнопки выше
                    strokeWidth="2.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5 block flex-shrink-0" // Явно задаем размер через Tailwind
                >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 16v-4" />
                    <path d="M12 8h.01" />
                </svg>
            </button>

            {/* Всплывающий попап */}
            {isHintOpen && (
                <div 
                    className="absolute bottom-full right-0 mb-3 p-4 
                               bg-[#1e2533] border border-white/10 backdrop-blur-xl
                               rounded-2xl shadow-2xl w-64 z-[100]
                               animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200"
                >
                    <p className="font-bold text-white text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
                        Безопасность
                    </p>
                    
                    <ul className="space-y-2.5">
                        {passwordRules.map((rule, index) => (
                            <li key={index} className="flex items-start gap-2.5 text-slate-300 text-sm leading-tight">
                                <svg className="text-indigo-500 mt-0.5 shrink-0" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                {rule}
                            </li>
                        ))}
                    </ul>

                    {/* Хвостик (треугольник) */}
                    <div className="absolute -bottom-1.5 right-2 w-3 h-3 bg-[#1e2533] border-r border-b border-white/10 rotate-45"></div>
                </div>
            )}
        </div>
    );
}

export default DropdownHintPassword;