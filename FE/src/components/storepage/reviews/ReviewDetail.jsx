import React from "react";
import dummyReviewData from "./dummyReviewData.json"; // JSON 파일로부터 데이터 가져오기
import { useLocation } from "react-router-dom";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function ReviewDetail() {
  const location = useLocation();
  const { data } = location.state || {};
  return (
    <div className="flex flex-col justify-start items-start mt-10 w-full">
      <div className="w-full mb-4">
        <p className="text-2xl font-semibold mb-2">{data.title}</p>
        <div className="flex justify-between">
          <div className="flex space-x-2 items-center text-gray-600">
            <p>작성자: {data.author}</p>
            <p>|</p>
            <p>{data.createdAt}</p>
            <p>|</p>
            {/* 평점을 작성자와 생성일시 옆에 표시 */}
            <p className = "font-bold">평점: {data.score} / 5</p>
          </div>
        </div>
      </div>
      <hr className="my-1 border-0 dark:bg-gray-200 w-full h-0.5" />
      <div className="p-4">
        <p>{data.comment}</p>
      </div>
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
  );
}
