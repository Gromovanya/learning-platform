import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/Main/Home'
import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/Register';
import { csrfTokenApi } from './api/csrf';
import { useEffect } from 'react';
import { hasCookie } from './utils/cookie';

function App() {
  useEffect(() => {
    if (!hasCookie('csrftoken')) {
      csrfTokenApi();
    };
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/auth/login" element={<LoginPage/>}/>
        <Route path="/auth/register" element={<RegisterPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App
