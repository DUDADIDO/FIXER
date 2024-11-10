import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api.jsx" // axios 인스턴스 가져오기

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
        // 요청이 성공한 경우 처리
        const { token, user_num, user_name, user_type, my_store } = response.data;
        // console.log("Login successful:", token, user_num, user_name);
        
        // 토큰을 로컬 스토리지에 저장
        if (token) {
          localStorage.setItem("authToken", token);
          localStorage.setItem("userNum", user_num);
          localStorage.setItem("userName", user_name);
          localStorage.setItem("userType", user_type);
          localStorage.setItem("myStore", my_store);
        }

        // 다른 사용자 정보를 필요에 따라 로컬 스토리지에 저장하거나 상태로 관리 가능
        
        alert(`${localStorage.getItem("userName")}님 환영합니다.`);
        // 루트 페이지로 리다이렉트
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        // 서버가 2xx 외의 상태 코드를 반환한 경우
        console.error("Login failed:", error.response.status);
        alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
      } else {
        // 서버가 응답하지 않거나 요청이 전달되지 않은 경우
        console.error("An error occurred during login:", error.message);
        alert("로그인 도중 문제가 발생했습니다. 다시 시도해주세요.");
      }
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
