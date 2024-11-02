import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import MainLayout from "./layout/MainLayout";
import LoginLayout from "./layout/LoginLayout";
import RegisterPage from "./pages/RegisterPage";
import StoreInfoPage from "./pages/StoreInfoPage";
import StoreSearchPage from "./pages/StoreSearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/storeinfo", element: <StoreInfoPage /> },
      { path: "/storesearch", element: <StoreSearchPage /> },
    ],
  },
  {
    path: "/login",
    element: <LoginLayout />,
    children: [{ path: "", element: <LoginPage /> }],
  },
  {
    path: "/register",
    element: <RegisterPage />,
    children: [{ path: "", element: <LoginPage /> }],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
