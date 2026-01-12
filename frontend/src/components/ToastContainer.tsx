import { motion, AnimatePresence } from 'framer-motion';
import { useNotificationStore } from '../store/notificationStore';

// Компоненты-иконки для чистоты кода
const Icons = {
  success: (
    <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  error: (
    <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  info: (
    <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
};

function ToastContainer() {
  const { popNotifications, removeNotification } = useNotificationStore();

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      <AnimatePresence mode="popLayout">
        {popNotifications.map((n) => (
          <motion.div
            key={n.id}
            layout
            onClick={() => removeNotification(n.id)}
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="pointer-events-auto group relative flex w-full items-start gap-4 overflow-hidden rounded-xl bg-white p-4 shadow-2xl ring-1 ring-black/5"
          >
            {/* Цветная полоска слева для акцента */}
            <div className={`absolute left-0 top-0 h-full w-1.5 ${
              n.notificationType === 'error' ? 'bg-red-500' : n.notificationType === 'success' ? 'bg-green-500' : 'bg-blue-500'
            }`} />

            {/* Иконка */}
            <div className="flex-shrink-0">
              {Icons[n.notificationType]}
            </div>

            {/* Текст */}
            <div className="flex-1 pt-0.5">
              <p className="text-sm font-semibold text-gray-900">
                {n.notificationType === 'error' ? 'Ошибка' : n.notificationType === 'success' ? 'Успешно' : 'Инфо'}
              </p>
              <p className="mt-1 text-sm text-gray-500 leading-relaxed">
                {n.message} {n.count > 1 && (
                    <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                        x{n.count}
                    </span>
                )}
              </p>
            </div>

            {/* Кнопка закрытия */}
            <button className="flex-shrink-0 rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer