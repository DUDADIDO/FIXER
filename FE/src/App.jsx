import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import MainLayout from "./layout/MainLayout";
import LoginLayout from "./layout/LoginLayout";
import RegisterPage from "./pages/RegisterPage";
import StoreInfoPage from "./pages/StoreInfoPage";
import StoreSearchPage from "./pages/StoreSearchPage";
import UserInfoPage from "./pages/UserInfoPage";
import WriteReview from "./components/storepage/reviews/WriteReview";
import StoreRegisterPage from "./pages/StoreRegisterPage";
import WriteNotice from "./components/storepage/notice/WriteNotice";
import WriteQnA from "./components/storepage/question/WriteQnA";
import QuestionDetail from "./components/storepage/question/QuestionDetail";
import ReviewDetail from "./components/storepage/reviews/ReviewDetail";
import NoticeDetail from "./components/storepage/notice/NoticeDetail";
import AnswerForm from "./components/storepage/question/AnswerForm";
import CrawerPage from "./pages/CrawerPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/storeinfo/:companyId", element: <StoreInfoPage /> },
      { path: "/storesearch", element: <StoreSearchPage /> },
      { path: "/userinfo", element: <UserInfoPage /> },
      { path: "/storeinfo/:companyId/writereview", element: <WriteReview /> },
      { path: "/storeinfo/:companyId/writenotice", element: <WriteNotice /> },
      { path: "/storeinfo/:companyId/writeqna", element: <WriteQnA /> },
      { path: "/storeregister", element: <StoreRegisterPage /> },
      { path: "/storeinfo/:companyId/qnadetail/:questionId", element: <QuestionDetail /> },
      { path: "/storeinfo/:companyId/reviewdetail/:reviewId", element: <ReviewDetail /> },
      { path: "/storeinfo/:companyId/noticedtail/:noticeId", element: <NoticeDetail /> },
      { path: "/qnaanswer", element: <AnswerForm /> },
      { path: "/crawer", element: <CrawerPage /> },
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
