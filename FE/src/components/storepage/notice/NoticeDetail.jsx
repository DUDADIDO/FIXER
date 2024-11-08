import React from "react";
import { useLocation } from "react-router-dom";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function NoticeDetail() {
  const location = useLocation();
  const { data } = location.state || {}; // data에 공지사항 정보와 fileDownloadUrl이 포함됨
  
  return (
    <div className="flex flex-col justify-start items-start mt-10 w-full">
      <div className="w-full mb-4">
        <p className="text-2xl font-semibold mb-2">{data.title}</p>
        <div className="flex justify-between">
          <div className="flex space-x-2 items-center">
            <p>{data.created_at}</p>
          </div>
        </div>
      </div>
      <hr className="my-1 border-0 dark:bg-gray-200 w-full h-0.5" />
      <div className="p-4">
        <p>{data.content}</p>
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
    </div>
  );
}
