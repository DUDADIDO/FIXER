import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import api from "@/api"; // "@/api.jsx"에서 default export로 되어 있어야 함.

export default function WriteReview() {
  const location = useLocation();
  const storeId = location.state?.storeId || "";
  const storeName = location.state?.storeName || "";
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [rating, setRating] = useState(1);
  
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("comment", content);
    formData.append("score", rating);
    formData.append("user_num", localStorage.getItem("userNum")); // 사용자 ID를 localStorage에서 가져오기
    formData.append("file", file);

    try {
      console.log(localStorage.getItem("userNum"));
      const response = await api.post(`/api/company/storeinfo/${storeId}/writereview`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("리뷰 작성이 완료되었습니다.");
      } else {
        alert("리뷰 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error("리뷰 작성 중 오류 발생:", error);
      alert("리뷰 작성 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">리뷰 작성 - 상점 ID: {storeId}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">상점 이름</label>
          <input
            type="text"
            value={storeName}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="내용을 입력하세요"
            rows="5"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">파일 첨부</label>
          <input type="file" onChange={handleFileChange} className="w-full" />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">평점</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value))}
            min="1"
            max="5"
            step="0.1"
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          제출
        </button>
      </form>
    </div>
  );
}
