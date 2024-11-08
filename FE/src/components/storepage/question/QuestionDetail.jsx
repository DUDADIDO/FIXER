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
        setAnswerInfo(response.data[0]); // 배열의 첫 번째 답변을 가져옴
        console.log(response.data[0]);
        setIsOwner(true); // 소유자 여부는 실제 조건에 맞게 수정
      })
      .catch((error) => {
        console.error("Error fetching answer info:", error);
      });
  }, [questionId]);

  return (
    <div className="flex flex-col justify-start items-start mt-10 w-full">
      {/* 질문 섹션 */}
      <section className="w-full mb-8">
        <h2 className="text-2xl font-bold mb-4">질문</h2>
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-semibold">{data.title}</h3>
          <div className="flex space-x-2 text-gray-600 mb-2">
            <span>작성자: {data.author}</span>
            <span>|</span>
            <span>작성일시: {data.createdAt}</span>
          </div>
          <p className="mt-2">{data.content}</p>
          {data.filePath && (
        <div className="p-4">
          <p className="font-semibold">첨부된 파일:</p>
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
      <section className="mt-6">
        <h2 className="text-2xl font-bold mb-4">답변</h2>
        {answerInfo ? (
          <div className="border-b pb-4 mb-4">
            <div className="flex space-x-2 text-gray-600 mb-2">
              <span>작성자: 관리자</span>
              <span>|</span>
              <span>작성일시: {answerInfo.createdAt}</span>
            </div>
            <p className="mt-2">{answerInfo.content}</p>
          </div>
        ) : (
          <p className="text-gray-500 mb-4">답변이 작성되지 않았습니다.</p>
        )}
      </section>

      {/* 답변하기 버튼: 관리자만 볼 수 있음 */}
      {isOwner && !answerInfo && (
        <div className="mt-6">
          <Link
            to={{
              pathname: `/storeinfo/${companyId}/answer/${questionId}`,
            }}
            state={{ data, questionId }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            답변하기
          </Link>
        </div>
      )}
    </div>
  );
}
