import { Outlet } from "react-router-dom";
// 네비게이션
import NavigationBar from "../components/NavigationBar";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavigationBar />
      </header>

      <main className="flex-grow flex justify-center items-start mx-20 mt-10 overflow-auto">
        <Outlet />
      </main>

      <footer className="w-full bg-white border-t border-gray-300 mt-auto">
        <div className="flex justify-center items-center p-4">
          &copy; 2024 FIXER. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
