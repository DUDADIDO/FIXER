import { Outlet } from "react-router-dom";
// 네비게이션
import NavigationBar from "../components/NavigationBar";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen h-screen w-full">
      <header className="">
        <NavigationBar />
      </header>

      <div className="flex justify-center items-center h-full mx-20 bg-cover">
        <Outlet />
      </div>

      <footer>
        <div className="flex justify-center items-center p-4">
          &copy; 2024 FIXER. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
