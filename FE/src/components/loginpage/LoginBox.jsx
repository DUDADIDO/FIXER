import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api.jsx"; // axios 인스턴스 가져오기

export default function LoginBox() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  const handleLogin = async () => {
    try {
      const response = await api.post("/api/users/login", {
        user_id: id,
        user_pw: password,
      });

      if (response.status === 200) {
        const { token, user_num, user_name, user_type, my_store } = response.data;

        if (token) {
          localStorage.setItem("authToken", token);
          localStorage.setItem("userNum", user_num);
          localStorage.setItem("userName", user_name);
          localStorage.setItem("userType", user_type);
          localStorage.setItem("myStore", my_store);
        }

        alert(`${localStorage.getItem("userName")}님 환영합니다.`);
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        console.error("Login failed:", error.response.status);
        alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
      } else {
        console.error("An error occurred during login:", error.message);
        alert("로그인 도중 문제가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <main className="flex justify-center items-center bg-gray-100">
      <div className="relative w-full max-w-3xl">
        <div className="absolute w-full h-full top-0 bg-gradient-to-b from-appBlue2 to-appBlue1 -rotate-6 z-0 rounded-2xl"></div>
        <div className="relative z-10 shadow-lg rounded-2xl bg-white p-8">
          <div className="flex gap-[5vw] items-center min-w-[40vw] pl-[3vw]">
            <img src="/chunsik.png" alt="image" />
            <div className="flex flex-col gap-10">
              <div className="flex flex-col">
                <label htmlFor="id" className="text-gray-600">
                  아이디
                </label>
                <input
                  id="id"
                  type="text"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-appBlue1"
                  placeholder="아이디"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="text-gray-600">
                  비밀번호
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-appBlue1"
                  placeholder="비밀번호"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-evenly mt-10">
            <button
              onClick={handleLogin}
              className="bg-appBlue2 text-white font-bold py-2 px-6 rounded-lg hover:bg-appBlue1 transition duration-300"
            >
              로그인
            </button>
            <Link
              to="/register"
              className="bg-appBlue2 text-white font-bold py-2 px-6 rounded-lg hover:bg-appBlue1 transition duration-300"
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
