import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function NavigationBar() {
  const [authToken, setAuthToken] = useState("");
  const [userNum, setUserNum] = useState();
  let navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = window.localStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
    }

    const userId = window.localStorage.getItem("userNum");
    if (userId) {
      setUserNum(userId);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("userName");
    window.localStorage.removeItem("userNum");
    setAuthToken("");
    alert("페이지에서 로그아웃되었습니다.");
    navigate("/");
  };

  const linkStyles = (path) => {
    return location.pathname === path
      ? "text-blue-600 border-b-2 border-blue-600"
      : "text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-600";
  };

  return (
    <div className="border-b-2 h-[8vh] min-h-[75px] flex justify-between items-center px-5">
      <Link to="/">로고</Link>
      <div className="flex justify-evenly items-center gap-20">
        <Link to="/storesearch" className={linkStyles("/storesearch")}>
          전문가 검색
        </Link>
        <Link to="/crawer" className={linkStyles("/crawer")}>
          특가
        </Link>
        <Link to="/storeregister" className={linkStyles("/storeregister")}>
          전문가 신청
        </Link>
        {/* <Link to="/servicecenter" className={linkStyles("/servicecenter")}>
          고객센터
        </Link> */}
        <Link to="/manageregister" className={linkStyles("/manageregister")}>
          전문가 신청 목록
        </Link>
        <Link
          to="/manageregister/register"
          className={linkStyles("/manageregister/register")}
        >
          전문가 등록
        </Link>
      </div>
      {authToken ? (
        <div className="flex flex-col">
          <Link
            to={`/userinfo`}
            className="text-gray-700 hover:text-blue-600"
          >
            마이페이지
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-700 hover:text-blue-600"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <Link to="/login" className={linkStyles("/login")}>
          로그인
        </Link>
      )}
    </div>
  );
}
