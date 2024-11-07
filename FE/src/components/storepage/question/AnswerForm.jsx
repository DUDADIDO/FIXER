import React, { useState } from "react";
import { useLocation } from "react-router-dom";

export default function AnswerForm() {
  const location = useLocation();
  const { questionTitle, questionContent, questionAuthor, createdAt, file, questionId } = location.state || {};

  const [answerContent, setAnswerContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ questionId, answerContent });
    // 답변을 서버로 전송하는 로직 추가
  };

  return (
    <div className="flex flex-col justify-start items-start mt-10 w-full">
      {/* 질문 섹션 */}
      <section className="w-full mb-8">
        <h2 className="text-2xl font-bold mb-4">답변 작성</h2>
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-semibold">{questionTitle}</h3>
          <div className="flex space-x-2 text-gray-600 mb-2">
            <span>작성자: {questionAuthor}</span>
            <span>|</span>
            <span>작성일시: {createdAt}</span>
          </div>
          <p className="mt-2">{questionContent}</p>
          {file && (
            <div className="mt-2">
              <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                첨부 파일: {file.name}
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
              value={answerContent}
              onChange={(e) => setAnswerContent(e.target.value)}
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
