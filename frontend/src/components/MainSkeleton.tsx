import Sidebar from "./Sidebar";

// Маленький вспомогательный компонент для пульсации
const SkeletonBase = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-white/[0.05] rounded-xl ${className}`} />
);

function MainPageSkeleton() {
  return (
    <div className="flex h-screen w-screen  overflow-hidden">
      
      {/* 1. Скелет Sidebar */}
      <Sidebar/>

      {/* 2. Основной контент */}
      <div className="flex-1 p-8 bg-[#0f172a] overflow-y-auto">
        
        {/* Скелет Секции приветствия */}
        <section className="mb-12">
          <SkeletonBase className="h-[200px] w-full rounded-[2rem]" />
        </section>

        {/* Скелет Заголовка списка */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <SkeletonBase className="h-8 w-48" />
            <SkeletonBase className="h-4 w-64" />
          </div>
          <SkeletonBase className="h-12 w-44 rounded-2xl" />
        </div>

        {/* Сетка карточек-скелетов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[1.5rem] flex flex-col h-[250px]">
              <div className="flex justify-between mb-6">
                <div className="flex items-center gap-2">
                  <SkeletonBase className="w-9 h-9 rounded-xl" />
                  <SkeletonBase className="h-3 w-20" />
                </div>
                <SkeletonBase className="h-5 w-16 rounded-lg" />
              </div>
              <SkeletonBase className="h-7 w-3/4 mb-4" />
              <SkeletonBase className="h-4 w-full mb-2" />
              <SkeletonBase className="h-4 w-2/3 mb-6" />
              <div className="mt-auto pt-4 border-t border-white/5 flex justify-between">
                <SkeletonBase className="w-6 h-6 rounded-full" />
                <SkeletonBase className="h-4 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPageSkeleton