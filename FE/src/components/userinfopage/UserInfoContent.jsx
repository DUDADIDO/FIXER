import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import api from "../../api.jsx";

function UserInfoContent() {
  const [data, setData] = useState("");
  const [userNum, setUserNum] = useState();

  useEffect(() => {
    const userId = window.localStorage.getItem("userNum");
    if (userId) {
      setUserNum(userId);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (userNum) {
        try {
          const res = await api.get(`/api/users/userinfo/${userNum}`);
          setData(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchData();
  }, [userNum]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full ml-0">
      <h2 className="text-xl font-bold mb-4">기본 정보</h2>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-gray-700">이메일</p>
          <p className="text-gray-600">{data.userEmail}</p>
        </div>
        <button className="px-4 py-2 bg-gray-100 rounded-lg text-gray-600 font-medium">
          변경
        </button>
      </div>
      <hr className="my-2" />
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-gray-700">아이디</p>
          <p className="text-gray-600">{data.userId}</p>
        </div>
        <button className="px-4 py-2 bg-gray-100 rounded-lg text-gray-600 font-medium">
          변경
        </button>
      </div>
      <hr className="my-2" />
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-gray-700">이름</p>
          <p className="text-gray-600">{data.userName}</p>
        </div>
        <button className="px-4 py-2 bg-gray-100 rounded-lg text-gray-600 font-medium">
          변경
        </button>
      </div>
      <hr className="my-2" />
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-semibold text-gray-700">비밀번호</p>
        </div>
        <button className="px-4 py-2 bg-gray-100 rounded-lg text-gray-600 font-medium">
          변경
        </button>
      </div>
    </div>
  );
}

export default UserInfoContent;
