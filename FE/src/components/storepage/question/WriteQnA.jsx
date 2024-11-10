import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import api from "@/api"; // "@/api.jsx"에서 default export로 되어 있어야 함.

export default function WriteQnA() {
  const location = useLocation();
  const storeId = location.state?.storeId || ""; // 전달된 상점 ID를 가져옴
  const storeName = location.state?.storeName || ""; // 전달된 상점 이름을 가져옴
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("user_num", localStorage.getItem("userNum")); // 사용자 ID를 localStorage에서 가져오기
    formData.append("file", file);

    try {
      const response = await api.post(`/api/company/storeinfo/${storeId}/writequestion`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("Q&A 작성이 완료되었습니다.");
      } else {
        alert("Q&A 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error("Q&A 작성 중 오류 발생:", error);
      alert("Q&A 작성 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="max-w-2xl w-[80%] mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Q&A 작성 - 상점 이름: {storeName}</h2>
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
          <label className="block text-gray-700 font-bold mb-2">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="제목을 입력하세요"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="내용을 입력하세요"
            rows="10"
            style={{ minHeight: "200px" }}
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
