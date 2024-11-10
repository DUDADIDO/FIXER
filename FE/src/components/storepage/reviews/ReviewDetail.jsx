import React from "react";
import { useLocation } from "react-router-dom";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function ReviewDetail() {
  const location = useLocation();
  const { data } = location.state || {};

  return (
    <div className="flex flex-col justify-start items-start mt-10 w-[80%] p-6 bg-white rounded-lg shadow-md">
      {/* 고정된 제목 "리뷰" 추가 */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6">리뷰</h1>

      <div className="w-full mb-4">
        <p className="text-3xl font-bold text-gray-800 mb-4">{data.title}</p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-4 items-center text-gray-500">
            {/* 작성자와 작성 시간 부분 */}
            <p className="text-lg">
              <span className="font-semibold text-gray-700">작성자:</span> {data.author}
            </p>
            <p>|</p>
            <p className="text-lg">
              <span className="font-semibold text-gray-700">작성 시간:</span> {data.createdAt}
            </p>
            <p>|</p>
            <p className="text-lg font-bold">
              평점: {data.score} / 5
            </p>
          </div>
        </div>
      </div>

      <hr className="my-2 border-0 bg-gray-300 w-full h-0.5" />

      <div className="p-4 mt-4 text-lg text-gray-700">
        <p>{data.comment}</p>
      </div>

      {/* 첨부 파일이 있는 경우 */}
      {data.filePath && (
        <div className="p-4 mt-6">
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
  );
}
