import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import api from "@/api";
export default function AnswerForm() {
  const location = useLocation();
  const { data, questionId } = location.state || {}; // data와 questionId를 받음
  const [ content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("content", content);
    formData.append("user_num", localStorage.getItem("userNum")); // 사용자 ID를 localStorage에서 가져오기


    try {
      const response = await api.post(`/api/company/question/${questionId}/writeanswer`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("답변 작성이 완료되었습니다.");
      } else {
        alert("답변 작성에 실패했습니다.");
      }
    } catch (error) {
      console.error("답변 작성 중 오류 발생:", error);
      alert("답변 작성 중 문제가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col justify-start items-start mt-10 w-full">
      {/* 질문 섹션 */}
      <section className="w-full mb-8">
        <h2 className="text-2xl font-bold mb-4">답변 작성</h2>
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-semibold">{data?.title}</h3>
          <div className="flex space-x-2 text-gray-600 mb-2">
            <span>작성자: {data?.author}</span>
            <span>|</span>
            <span>작성일시: {data?.createdAt}</span>
          </div>
          <p className="mt-2">{data?.content}</p>
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
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">답변 내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded h-32"
              placeholder="답변을 작성하세요"
              required
            />
          </div>
          <button
            type="submit"
            className="w-40 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            답변 제출
          </button>
        </form>
      </section>
    </div>
  );
}
