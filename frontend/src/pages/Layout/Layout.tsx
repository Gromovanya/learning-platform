import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className="app-container">
        
        <main className="content">
            {/* Сюда "прилетят" компоненты HomePage, ProfilePage и т.д. */}
            <Outlet />
        </main>

        </div>
  );
}

export default Layout