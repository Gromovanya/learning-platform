export const getAvatarColor = (name: string | undefined) => {
    if (!name || name.length === 0) return 'bg-amber-500';
    const colors = [
        'bg-indigo-500', 'bg-emerald-500', 'bg-rose-500', 
        'bg-amber-500', 'bg-violet-500', 'bg-cyan-500', 'bg-fuchsia-500'
    ];
    
    // Простая хеш-функция: суммируем коды символов
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Выбираем индекс из массива цветов
    const index = Math.abs(hash) % colors.length;
    return colors[index];
};