function SessionCardSkeleton() {
  // Базовый класс для пульсирующих блоков
  const pulseBlock = "bg-white/[0.08] rounded-md animate-pulse";

  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-[1.5rem] h-full flex flex-col">
      {/* Верхняя часть: Аватар, Имя, Статус */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          {/* Аватар */}
          <div className={`w-9 h-9 rounded-xl ${pulseBlock} shrink-0`} />
          {/* Имя пользователя */}
          <div className={`h-4 w-24 ${pulseBlock}`} />
        </div>
        {/* Статус (Приватная/Публичная) */}
        <div className={`h-6 w-16 rounded-lg ${pulseBlock}`} />
      </div>
      
      {/* Заголовок */}
      <div className={`h-7 w-3/4 mb-4 ${pulseBlock}`} />
      
      {/* Описание (2 строки для имитации текста) */}
      <div className="space-y-2 mb-6 flex-grow">
        <div className={`h-4 w-full ${pulseBlock}`} />
        <div className={`h-4 w-2/3 ${pulseBlock}`} />
      </div>
      
      {/* Футер: Участники и кнопка Вступить */}
      <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-auto">
        {/* Кружок участников */}
        <div className={`w-6 h-6 rounded-full ${pulseBlock}`} />
        {/* Кнопка "Вступить" */}
        <div className={`h-4 w-20 ${pulseBlock}`} />
      </div>
    </div>
  );
};

interface SessionsLoaderProps {
    count?: number;
    className?: string;
}

// Основной компонент для использования в списках
function SessionsLoader({ count = 6, className = "" }: SessionsLoaderProps) {
    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
            {/* Создаем массив из 'count' элементов и рендерим скелеты */}
            {Array.from({ length: count }).map((_, index) => (
                <SessionCardSkeleton key={index} />
            ))}
        </div>
    );
};

export default SessionsLoader