import React from "react";
import { Link } from "react-router-dom";
import dummyQnAData from "./dummyQnAData.json";

export default function QnADetail({ isAdmin }) {
  const {
    questionTitle,
    questionContent,
    questionAuthor,
    createdAt,
    file,
    answerContent,
    answerAuthor,
    answerAt,
  } = dummyQnAData;
  isAdmin = true;
  return (
    <div className="flex flex-col justify-start items-start mt-10 w-full">
      {/* 질문 섹션 */}
      <section className=" w-full mb-8">
        <h2 className="text-2xl font-bold mb-4">질문</h2>
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

      {/* 답변 섹션 */}
      <section className="mt-6">
        <h2 className="text-2xl font-bold mb-4">답변</h2>
        {answerContent ? (
          <div className="border-b pb-4 mb-4">
            <div className="flex space-x-2 text-gray-600 mb-2">
              <span>작성자: {answerAuthor}</span>
              <span>|</span>
              <span>작성일시: {answerAt}</span>
            </div>
            <p className="mt-2">{answerContent}</p>
          </div>
        ) : (
          <p className="text-gray-500 mb-4">답변이 작성되지 않았습니다.</p>
        )}
      </section>

      {/* 답변하기 버튼: 관리자만 볼 수 있음 */}
      {isAdmin && !answerContent && (
        <div className="mt-6">
          <Link
            to={{
              pathname: "/qnaanswer",
            }}
            state={{ questionTitle, questionContent, questionAuthor, createdAt, file, questionId: dummyQnAData.id }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            답변하기
          </Link>
        </div>
      )}
    </div>
  );
}
