import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 space-y-10 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;