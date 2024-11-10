import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import CommunitySectionWithPagination from "./CommunitySectionWithPagination";
import CommunityQnAData from "./CommunityQnADummy.json";

import api from "../../api.jsx";

function UserInfoQnAContent() {
  const location = useLocation();
  const [userNum, setUserNum] = useState();
  const [myQuestion, setMyQuestion] = useState();

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
          const res = await api.get(`/api/users/userinfo/${userNum}/questions`);
          console.log(res.data);
          setMyQuestion(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchData();
  }, [userNum]);

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <CommunitySectionWithPagination title="내가 쓴 QnA" data={myQuestion} />
    </div>
  );
}

export default UserInfoQnAContent;
