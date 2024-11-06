import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import MainLayout from "./layout/MainLayout";
import LoginLayout from "./layout/LoginLayout";
import RegisterPage from "./pages/RegisterPage";
import StoreInfoPage from "./pages/StoreInfoPage";
import StoreSearchPage from "./pages/StoreSearchPage";
import UserInfoPage from "./pages/UserInfoPage";
import WriteReview from "./components/storepage/writepostpage/WriteReview";
import StoreRegisterPage from "./pages/StoreRegisterPage";
import WriteNotice from "./components/storepage/writepostpage/WriteNotice";
import WriteQnA from "./components/storepage/writepostpage/WriteQnA";
import QnADetail from "./components/storepage/detailpage/QnADetail";
import ReviewDetail from "./components/storepage/detailpage/ReviewDetail";
import NoticeDetail from "./components/storepage/detailpage/NoticeDetail";
import AnswerForm from "./components/storepage/detailpage/AnswerForm";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/storeinfo/:companyId", element: <StoreInfoPage /> },
      { path: "/storesearch", element: <StoreSearchPage /> },
      { path: "/userinfo", element: <UserInfoPage /> },
      { path: "/writereview", element: <WriteReview /> },
      { path: "/writenotice", element: <WriteNotice /> },
      { path: "/writeqna", element: <WriteQnA /> },
      { path: "/storeregister", element: <StoreRegisterPage /> },
      { path: "/qnadetail", element: <QnADetail /> },
      { path: "/reviewdetail", element: <ReviewDetail /> },
      { path: "/noticedetail", element: <NoticeDetail /> },
      { path: "/qnaanswer", element: <AnswerForm /> },
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
