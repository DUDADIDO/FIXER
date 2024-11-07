import React, { useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/api.jsx"; // api 인스턴스 가져오기

export default function WriteNotice() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const { companyId } = useParams(); // URL에서 companyId 가져오기

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) {
      formData.append("file", file); // 파일이 있을 경우에만 추가
    }

    try {
      const response = await api.post(`/api/company/storeinfo/${companyId}/writenotice`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("공지사항이 성공적으로 등록되었습니다.");
      } else {
        alert("공지사항 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("공지사항 등록 중 오류 발생:", error);
      alert("공지사항 등록에 실패했습니다.");
    }
  };

  return (
    <div className="max-w-2xl w-full mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">공지사항 작성</h2>
      <form onSubmit={handleSubmit}>
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
