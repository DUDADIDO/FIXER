import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "@/api";

export default function AnswerForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, questionId } = location.state || {};
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("content", content);
    formData.append("user_num", localStorage.getItem("userNum"));

    try {
      const response = await api.post(`/api/company/question/${questionId}/writeanswer`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("답변 작성이 완료되었습니다.");
        navigate(`/storeinfo/${data.companyId}`);
      } else {
        alert("답변 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error("답변 작성 중 오류 발생:", error);
      alert("답변 작성 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col justify-start items-start mt-10 w-[80%] p-6 bg-white rounded-lg shadow-md">
      {/* 질문 섹션 */}
      <section className="w-full mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">답변 작성</h2>
        <div className="border-b pb-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">{data?.title}</h3>
          <div className="flex space-x-4 text-gray-500 mb-4">
            <span>작성자: {data?.author}</span>
            <span>|</span>
            <span>작성일시: {data?.createdAt}</span>
          </div>
          <p className="text-lg text-gray-700 mb-4">{data?.content}</p>
          {data?.file && (
            <div className="mt-2">
              <a href={data.file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                첨부 파일: {data.file.name}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* 답변 작성 섹션 */}
      <section className="w-full">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-700 mb-3">답변 내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 text-gray-700"
              placeholder="답변을 작성하세요"
              rows="6"
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            답변 제출
          </button>
        </form>
      </section>
    </div>
  );
}
