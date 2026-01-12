function Initialized() {
    return (
        <div className="h-screen w-screen bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-slate-900 to-black pointer-events-none" />
            
            <div className="relative flex flex-col items-center">
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center font-bold text-white text-3xl shadow-[0_0_40px_rgba(79,70,229,0.4)] animate-pulse mb-6">
                    L
                </div>
                
                {/* Текст загрузки с анимацией печатания или мерцания */}
                <h2 className="text-white font-medium text-lg tracking-widest animate-pulse">
                    LEARNSYNC
                </h2>
                
                <div className="mt-4 flex gap-1">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce" />
                </div>
            </div>
            
            {/* Теневая подпись снизу */}
            <p className="absolute bottom-10 text-slate-500 text-sm font-medium uppercase tracking-[0.2em]">
                Инициализация сессии...
            </p>
        </div>
    );
}

export default Initialized