import { RouterProvider } from 'react-router-dom'
import { router } from './router';
import { useEffect } from 'react';
import { authService } from '../services/authSerivce';
import { useAuthStore } from '../store/authStore';
import ToastContainer from '../components/Toast/ToastContainer';
import { useNetworkStatus } from '../hooks/networkStatus';
// import { api } from '../api/api';

function App() {
  const { isInitialized } = useAuthStore();
  
  useNetworkStatus()
  useEffect(() => {
    authService.init()
    // api.get('/error/500');
    // api.get('/error/500');
  }, [])

  if (!isInitialized) {
    return <div className="loader">Загрузка сессии...</div>;
  }
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
};

export default App
