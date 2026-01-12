import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import ToastContainer from "../../components/ToastContainer";

export const Layout = () => {
    return (
        <div className="h-screen w-screen bg-gradient-to-br from-indigo-900 via-slate-800 to-black flex flex-col overflow-hidden text-slate-200">
            <Header />

            <main className="flex-1 flex overflow-hidden">
                <Outlet />
            </main>
            <ToastContainer />
        </div>
    );
};