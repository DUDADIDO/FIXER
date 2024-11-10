import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import CommunitySectionWithPagination from "./CommunitySectionWithPagination";
import CommunityReviewData from "@/components/communitypage/CommunityReviewDummy.json";

import api from "../../api.jsx";

export default function UserInfoReviewContent() {
  const location = useLocation();
  const [userNum, setUserNum] = useState();
  const [myReview, setMyReview] = useState();

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
          const res = await api.get(`/api/users/userinfo/${userNum}/reviews`);
          console.log(res.data);
          setMyReview(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchData();
  }, [userNum]);
  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-md">
      <CommunitySectionWithPagination title="내가 쓴 리뷰" data={myReview} />
    </div>
  );
}
