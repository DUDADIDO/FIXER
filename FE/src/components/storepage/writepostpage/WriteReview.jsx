import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function WriteReview() {
  const location = useLocation();
  const storeId = location.state?.storeId || ""; // 전달된 상점 ID를 가져옴
  const storeName = location.state?.storeName || ""; // 전달된 상점 이름을 가져옴
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [rating, setRating] = useState(1);
  console.log("Received storeId:", storeId);
  console.log("Received storeName:", storeName);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ content, file, rating, storeName, storeId });
    // 서버에 데이터 제출하는 로직 추가
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow-md">
        {console.log(storeId, storeName)}
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
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full"
          />
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
