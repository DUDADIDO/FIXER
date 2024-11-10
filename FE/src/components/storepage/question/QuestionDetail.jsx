import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import api from "@/api";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function QuestionDetail({ isAdmin }) {
  const { companyId, questionId } = useParams();
  const [isOwner, setIsOwner] = useState(false);
  const location = useLocation();
  const { data } = location.state || {};
  const [answerInfo, setAnswerInfo] = useState(null);

  useEffect(() => {
    api
      .get(`/api/company/question/${questionId}/answers`)
      .then((response) => {
        setAnswerInfo(response.data[0]);
        setIsOwner(true); // 소유자 여부는 실제 조건에 맞게 수정
      })
      .catch((error) => {
        console.error("Error fetching answer info:", error);
      });
  }, [questionId]);

  return (
    <div className="flex flex-col justify-start items-start mt-10 w-[80%] p-6 bg-white rounded-lg shadow-md">
      {/* 질문 섹션 */}
      <section className="w-full mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">질문</h2>
        <div className="border-b pb-4 mb-4">
          <h3 className="text-2xl font-semibold text-gray-800">{data.title}</h3>
          <div className="flex space-x-4 text-gray-600 mt-2">
            <span className="text-lg">
              <span className="font-semibold text-gray-700">작성자:</span> {data.author}
            </span>
            <span>|</span>
            <span className="text-lg">
              <span className="font-semibold text-gray-700">작성일시:</span> {data.createdAt}
            </span>
          </div>
          <p className="mt-4 text-lg text-gray-700">{data.content}</p>

          {/* 첨부 파일 */}
          {data.filePath && (
            <div className="mt-4">
              <p className="font-semibold text-gray-800">첨부된 파일:</p>
              <a
                href={`${apiBaseUrl}${data.filePath}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                첨부 파일 열기
              </a>
            </div>
          )}
        </div>
      </section>

      {/* 답변 섹션 */}
      <section className="w-full mt-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">답변</h2>
        {answerInfo ? (
          <div className="border-b pb-4 mb-4">
            <div className="flex space-x-4 text-gray-600">
              <span className="text-lg font-semibold">작성자: 관리자</span>
              <span>|</span>
              <span className="text-lg">{answerInfo.createdAt}</span>
            </div>
            <p className="mt-4 text-lg text-gray-700">{answerInfo.content}</p>
          </div>
        ) : (
          <p className="text-lg text-gray-500 mb-4">답변이 작성되지 않았습니다.</p>
        )}
      </section>

      {/* 답변하기 버튼 */}
      {isOwner && !answerInfo && (
        <div className="mt-6">
          <Link
            to={{
              pathname: `/storeinfo/${companyId}/answer/${questionId}`,
            }}
            state={{ data, questionId }}
            className="px-6 py-3 bg-blue-500 text-white text-lg rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            답변하기
          </Link>
        </div>
      )}
    </div>
  );
}
