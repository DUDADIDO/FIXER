import { Outlet } from "react-router-dom";

export default function LoginLayout() {
  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex justify-center h-full mx-20 bg-cover">
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
