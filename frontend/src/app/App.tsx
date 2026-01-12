import { RouterProvider } from 'react-router-dom'
import { router } from './router';
import { useEffect } from 'react';
import { authService } from '../services/authSerivce';
import { useAuthStore } from '../store/authStore';
import { useNetworkStatus } from '../hooks/networkStatus';
import Initialized from '../components/Initialized';
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
    return <Initialized />
  }
  return <RouterProvider router={router} />
};

export default App
