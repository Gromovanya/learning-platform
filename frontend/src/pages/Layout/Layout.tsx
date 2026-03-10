import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import ToastContainer from "../../components/ToastContainer";

export const Layout = () => {
    return (
        <div className="h-dvh w-screen bg-[var(--app-bg,#0b101a)] flex flex-col overflow-hidden text-slate-200">
            <Header />

            <main className="flex-1 flex overflow-hidden">
                <Outlet />
            </main>
            <ToastContainer />
        </div>
    );
};