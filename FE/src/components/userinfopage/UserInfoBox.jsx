import { useState, useEffect } from "react";
import UserInfoContent from "./UserInfoContent";
import UserInfoQnAContent from "./UserInfoQnAContent";
import UserInfoReviewContent from "./UserInfoReviewContent";

import api from "../../api.jsx";

function UserInfoBox() {
  const [selectedTab, setSelectedTab] = useState("유저 정보");

  // useEffect(() => {
  //   api.get(`/api/`);
  // }, []);

  const renderContent = () => {
    switch (selectedTab) {
      case "유저 정보":
        return <UserInfoContent />;
      case "QnA 목록":
        return <UserInfoQnAContent />;
      case "리뷰 목록":
        return <UserInfoReviewContent />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex gap-4 mb-6 mr-96">
        <button
          onClick={() => setSelectedTab("유저 정보")}
          className={`px-4 py-2 rounded ${
            selectedTab === "유저 정보"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          유저 정보
        </button>
        <button
          onClick={() => setSelectedTab("QnA 목록")}
          className={`px-4 py-2 rounded ${
            selectedTab === "QnA 목록"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          QnA 목록
        </button>
        <button
          onClick={() => setSelectedTab("리뷰 목록")}
          className={`px-4 py-2 rounded ${
            selectedTab === "리뷰 목록"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
        >
          리뷰 목록
        </button>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
}

export default UserInfoBox;
